<?php

class ServicesController extends Controller
{
    public $layout = '/layouts/column1';

    public function filters()
    {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    public function init()
    {
        $cs = parent::init();
        return $cs;
    }

    public function actions()
    {
        return array(
            'captcha' => array(
                'class' => 'CCaptchaAction',
                'backColor' => 0xFFFFFF,
            ),
        );
    }

    public function accessRules()
    {
        return array(/*
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
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),*/
        );
    }

    public function actionView()
    {
        $this->render('view', array(
            'model' => $this->loadModel($_POST['id']),
        ));
    }

    public function actionUpdate()
    {
        if (Yii::app()->user->isGuest) {
            /** Если пользователь не авторизован, он будет перенаправлен на главную страницу */
            $this->redirect('/');
            Yii::app()->end();
        }
        $l = $this->loadModel();
        $model = $l ? $l : new Services();

        $this->init()->registerCssFile(Yii::app()->theme->baseUrl . '/css/services.css');
        $this->init()->registerScript('crv_crud', 'start.init({
        \'Service\': \'crud\',
         \'ImgService\': [\'uploadAll\', \'delete\', \'testView\']})', CClientScript::POS_READY);

        if (isset($_POST['Services'])) {
            if (isset($_POST['ajax']) && $_POST['ajax'] === 'update') {
                $model->attributes = $_POST['Services'];

                if ($model->validate()) {
//                    $model->save();
                    echo json_encode(array('complete' => true, 'message' => '<h5>Данные сохранены</h5>'));
                    Yii::app()->end();
                } else {
                    echo CActiveForm::validate($model);
                    Yii::app()->end();
                }
            }
            $model->attributes = $_POST['Services'];
            if ($model->save()) {
                $this->redirect(Yii::app()->request->requestUri);
                Yii::app()->end();
            }
        } else {
            $this->render('update', array(
                'model' => $model,
            ));
        }

    }

    public function actionDelete($id)
    {
        $this->loadModel($id)->delete();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    public function actionIndex()
    {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'load') {
            $id = $this->getThreeService($_POST['id']);
            $model = Services::model()->findAll('id=' . implode(' XOR id=', $id['popId']));
            $data = array();
            foreach ($model as $service) {
                $data[] = $this->renderPartial('_view', array('service' => $service), true);
            }
            echo json_encode(array('nextId' => $id['oldArr'], 'data' => $data, 'complete' => true));
            Yii::app()->end();
        }
        $criteria = new CDbCriteria(array(
            'select' => 'id',
            'condition' => 'status=1',
        ));
        $dataId = Services::model()->findAll($criteria);
        $data = array();
        foreach ($dataId as $key) {
            array_push($data, $key->id);
        }
        $id = $this->getThreeService($data);
        $model = Services::model()->findAll('id=' . implode(' XOR id=', $id['popId']));
        $this->render('index', array(
            'model' => $model,
            'id' => $id
        ));
    }

    public function actionAdmin()
    {
        $model = new Services('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Services']))
            $model->attributes = $_GET['Services'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    public function loadModel()
    {
        $user = User::model()->with('Service')->findAllByPk(Yii::app()->user->id);

        $model = Services::model()->with('imgServices')->findByPk($user[0]->Service->id);

        if ($model === null)
            return false;
        return $model;
    }

    protected function performAjaxValidation($model)
    {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'services-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    public function actionDeleteImg()//Аякс запрос на удаление картинки из резюме
    {
        $arg = array();
        $delete = ImgServices::model()->deleteByPk($_POST['id']);
        if ($delete) {
            $arg[] = 'true';
        } else {
            $arg[] = 'false';
        }
        echo json_encode($arg);
    }

    public function actionGetOne()//Для аякс запроса на предосмотр резюме
    {
        $data = array();
        if (isset($_POST['id'])) {
            $service = Services::model()->findByPk($_POST['id']);


            $user = $service->idUser;
            $imges = $service->imgServices;
            $comments = $service->comments;

            foreach ($service as $key => $val) {
                $data[$key] = $val;
            }
            $data['last_update'] = date('d-m-Y', $data['last_update']);
            foreach ($imges as $key => $val) {
                $data['img'][$key]['url'] = $val->url;
                $data['img'][$key]['description'] = $val->description;
            }
            foreach ($comments as $key => $val) {
                $data['comments'][$key]['text'] = CHtml::encode($val->text);
                $data['comments'][$key]['date_create'] = date("d.m.Y h:i", $val->date_create);
                if ($val->user != null) {
                    $data['comments'][$key]['userName'] = $val->user->first_name;
                } else $data['comments'][$key]['userName'] = $val->first_name;

            }
            $data['userName'] = $user->second_name . ' ' . $user->first_name;
            $data['userPhone'] = $user->phone;
            $data['userEmail'] = $user->email;
        }
        echo json_encode($data);
    }

    public function actionSave()
    {
        if (isset($_POST['Services'])) {
            $p = $_POST['Services'];
            if ($p['note'] === '') {
                $data = array('error' => true, 'message' => 'Введите название!');
            } else if ($p['description'] === '') {
                $data = array('error' => true, 'message' => 'Заполните резюме!');
            } else {
                if ($p['id'] == '') {
                    $model = new Services();
                } else {
                    $model = $this->loadModel();
                }
                $model->attributes = $p;
                if ($model->save()) {
                    $data = array('success' => true, 'message' => 'Сохранено!');
                }
            }

            echo json_encode($data);
        } else {
            $this->redirect('.');
            Yii::app()->end();
        }

    }

    public function getThreeService($arr)
    {
        $c = count($arr);
        $tmpArr = array();
        for ($i = 0; $i < 3; $i++) {
            shuffle($arr);
            array_push($tmpArr, array_pop($arr));
        }

        return array('popId' => $tmpArr, 'oldArr' => $arr);
    }
}
