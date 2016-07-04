<?php

class OrdersController extends Controller
{

	public $layout='//layouts/column2';


	public function filters()
	{
		return array(
			//'accessControl - AjaxValidation', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}


	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('*'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('*'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	public function init()
	{
		$cs = parent::init();
		return $cs;
	}

	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}


	public function actionCreate()
	{
		$this->layout='//layouts/column1';
		$cs = $this->init();
		$cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/orders.js');
		$cs->registerScript('newOrders',
				'var order = new orders();'.
				'order.add(\'#orders-form\')',
				CClientScript::POS_READY
		);

		if(isset(Yii::app()->user->class) && Yii::app()->user->class != 2) {
			$this->render('errorCreate');
		}else {
			$model = new Orders;
			$user = User::model()->findByPk(Yii::app()->user->id);

			// Uncomment the following line if AJAX validation is needed
			$this->performAjaxValidation($model);

			if (isset($_POST['Orders'])) {
				try{
					if (Yii::app()->user->isGuest) {
						throw new Exception("Для размещения заявки вам необходимо ввести номер телефона и подтвердить его");
					} else {
						$model->attributes = $_POST['Orders'];
						if ($model->validate()) {
							if ($model->save()) {
								echo json_encode(array('complete' => true, 'message' => 'Ваша заявка добавленна на сайт. Спасибо!'));
								Yii::app()->end();
							}
						}
					}
				}catch (Exception $e){
					echo json_encode($e->getMessage());
				}
			}

			$this->render('create', array(
					'model' => $model,
					'user' => $user,
			));
		}
	}

	public function actionUpdate($ID = null)
	{
		$id = $ID != null? $ID : $_POST['id'];
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Orders']))
		{
			$model->attributes=$_POST['Orders'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));

		}
		if(isset($_POST['ajax']) AND $_POST['ajax'] == 'orderSave'){
			$data = array();
			$model->text = CHtml::encode($_POST['text']);
			$model->date_start = $_POST['date_start'];
			$model->date_complition = $_POST['date'];
			if($model->save()){
				$data['complete'] = 'Сохранено';
			}else{
				$data['error'] = 'Произошла ошибка при сохранении';
			}
			echo json_encode($data);
			Yii::app()->end();
		}

		echo '123';
//		$this->render('update',array(
//			'model'=>$model,
//		));
	}

	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	public function actionIndex()
	{
		$cs = $this->init();
		$cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/orders.js', CClientScript::POS_HEAD);
		$cs->registerScript('init',
				'var orders = new orders();' .
				'$(document).scroll(function(event){orders.load()});',
				CClientScript::POS_END
		);

		$criteria = new CDbCriteria(array(
			'order'=>'status DESC, date_create DESC',
			'with'=>'User',
			'select'=> 'text, status, date_create, date_start, date_complition ',
		));


		$dataProvider=new CActiveDataProvider('Orders', array(
				'criteria'=>$criteria,


		));
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}


	public function actionAdmin()
	{
		$model=new Orders('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Orders']))
			$model->attributes=$_GET['Orders'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}
	public function actionAjaxLoad()
	{
		$criteria = new CDbCriteria(array(
			'order'=>'status DESC, date_create DESC',
			'with'=>'User',

		));
		$criteria->with = 'User';
		$criteria->select = 'text, status, date_create, date_complition, date_start';
		$criteria->offset = $_POST['stack']+1;
		$criteria->limit = '5';

		$dataJson = array();
		$model = Orders::model()->findAll($criteria);
		foreach($model as $data){
			$dataJson['content'][] = $this->renderPartial('_view', array('data'=>$data), true);

		}
		$dataJson['count'] = count($model);
		echo json_encode($dataJson);


	}

	public function loadModel($id)
	{
		$model=Orders::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	protected function performAjaxValidation($model, $id = 'orders-form')
	{
		if(isset($_POST['ajax']) && $_POST['ajax']===$id)
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

}
