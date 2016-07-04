<?php

class AdvertisingController extends Controller
{
	public $layout='column2';
	public $defaultAction = 'update';
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}
	public function accessRules()
	{
		/*return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('@'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);*/
	}
	public function actionView($id = null)
	{
		if(isset($_POST['ajax']) && $_POST['ajax'] === 'advt'){

			$this->renderFile(Yii::getPathOfAlias('application') . '/widgets/views/advertising.php', array('model' => array($this->loadModel($_POST['id']))));
			Yii::app()->end();
		}
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}
	public function actionSwitch()
	{
		$id = trim($_GET['id']);
		settype($id, 'int');
		$advt = Advertising::model()->findByPk($id);
		if($advt){
			if($advt->id_user === Yii::app()->user->id){
				if($advt->status === Advertising::STATUS_ANACTIVE){
					$advt->status = Advertising::STATUS_ACTIVE;
					$advt->save();
					Yii::app()->user->setFlash('success_' . $advt->id, 'Блок включен');
					$this->redirect('/advertising/update/#_'. $advt->getData('id'));
				}else {
					$advt->status = Advertising::STATUS_ANACTIVE;
					$advt->save();
					Yii::app()->user->setFlash('success_' . $advt->id, 'Блок отключен');
					$this->redirect('/advertising/update/#_'. $advt->getData('id'));
				}
			}else{
				throw new Exception("Не допустимое действие1");
			}
		}else{
			throw new Exception("Не допустимое действие2");
		}

	}
	public function actionCreate()
	{
		$model=new Advertising;
		$img = new ImgAdvt();

		if(isset($_POST['Advertising']))
		{
			$transaction = $model->dbConnection->beginTransaction();
			try {
				$model->attributes = $_POST['Advertising'];
				if ($model->save()) {
				}
				if (isset($_FILES['Advertising']) && $_FILES['Advertising']['error']['img'] === 0) {
					$model->clearErrors('img');
					if(ImgAdvt::addMyImg($_FILES['Advertising'], $model->id)){
						$transaction->commit();
						$this->redirect('/user');
						Yii::app()->end();
					}else{
						$transaction->rollback();
					}
				}else{
					$model->addError('img', 'Выберете файл изображение');
					$transaction->rollback();
				}
			} catch(Exception $e){
				$transaction->rollback();
				throw $e;
			}
		}
		$this->render('create',array(
			'model'=>$model,
			'img'=>$img
		));
	}
	public function actionUpdate($id = null)
	{
		if($id != null) {

			$model = $this->loadModel($id);

			if (isset($_POST['Advertising'])) {
				$transaction = $model->dbConnection->beginTransaction();
				try{
					$model->attributes = $_POST['Advertising'];
					if (!$model->save()) {
						$transaction->rollback();

					}else {
						if (isset($_FILES['Advertising']) && $_FILES['Advertising']['error']['img'] === UPLOAD_ERR_OK) {
							$img = ImgAdvt::model()->findByPk($model->Img[0]->id);
							if($img->updateOne($_FILES['Advertising'])){
								$transaction->commit();
								Yii::app()->user->setFlash('success_' . $model->id, 'Блок сохранен');
								$this->redirect(array('/advertising/update/#_'.$model->getData('id')));
								Yii::app()->end();
							}else{
								$transaction->rollback();
							}
						}else{
							$transaction->commit();
							Yii::app()->user->setFlash('success_' . $model->id, 'Блок сохранен');
							$this->redirect(array('/advertising/update/#_'.$model->getData('id')));
							Yii::app()->end();
						}
					}
				}catch (Exception $e){
					$transaction->rollback();
					throw $e;
				}

			}
		}else{
			$criteria = new CDbCriteria(array(
				'condition' => 'id_user=:id',
				'params' => array(
					':id'=>Yii::app()->user->id,
				)
			));
			$model = Advertising::model()->findAll($criteria);
			$img = new ImgAdvt();
		}

		$this->render('update',array(
			'model'=>$model,
			'img' => $img,
		));
	}
	public function actionDelete($id = null)
	{
		$id = $id != null ? $id: $_POST['Advertising']['id'];
		$advt = $this->loadModel($id);
		if(unlink(Yii::getPathOfAlias('webroot') . $advt->Img[0]->url) && unlink(Yii::getPathOfAlias('webroot') . $advt->Img[0]->simple_url)){

			ImgAdvt::model()->findByPk($advt->Img[0]->id)->delete();
			$advt->delete();
		}



		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if (!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Advertising');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}
	public function actionAdmin()
	{
		$model=new Advertising('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Advertising']))
			$model->attributes=$_GET['Advertising'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}
	public function loadModel($id)
	{
		$model=Advertising::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='advertising-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
