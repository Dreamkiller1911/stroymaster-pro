<?php

class SiteController extends Controller
{
    public $layout = 'column1';

    /**
     * Declares class-based actions.
     */
    public function init()
    {
        $cs = parent::init();
        return $cs;
    }
    public function actions()
    {
        return array(
            // captcha action renders the CAPTCHA image displayed on the contact page
            'captcha' => array(
                'class' => 'CCaptchaAction',
                'backColor' => 0xFFFFFF,
            ),
            // page action renders "static" pages stored under 'protected/views/site/pages'
            // They can be accessed via: index.php?r=site/page&view=FileName
            'page' => array(
                'class' => 'CViewAction',
            ),
            'reg' => array(
                'class' => 'CViewAction',
            )
        );
    }

    /**
     * This is the action to handle external exceptions.
     */
    public function actionError()
    {
        if ($error = Yii::app()->errorHandler->error) {
            if (Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }
    public function actionSettings()
    {
        $this->init()->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/canvas.js');
        $this->init()->registerScriptFile(Yii::app()->theme->baseUrl . '/js/app/story/Defaults.js');
        $this->init()->registerScript('settings',
            ';start.init(\'Settings\', \'load\');start.init(\'User\', \'getAll\')'
        );
        $model = new Comments();
        $this->render('settings', array('model'=>$model));
    }

    /**
     * Displays the contact page
     */
    public function actionContact()
    {
        $model = new ContactForm;
        if (isset($_POST['ContactForm'])) {
            $model->attributes = $_POST['ContactForm'];
            if ($model->validate()) {
                $headers = "From: {$model->email}\r\nReply-To: {$model->email}";
                mail(Yii::app()->params['adminEmail'], $model->subject, $model->body, $headers);
                Yii::app()->user->setFlash('contact', 'Thank you for contacting us. We will respond to you as soon as possible.');
                $this->refresh();
            }
        }
        $this->render('contact', array('model' => $model));
    }

    /**
     * Displays the login page
     */
    public function actionLogin()
    {
        if (!defined('CRYPT_BLOWFISH') || !CRYPT_BLOWFISH)
            throw new CHttpException(500, "This application requires that PHP was compiled with Blowfish support for crypt().");

        $model = new LoginForm;;
        // if it is ajax validation request
//		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
//		{
//			echo CActiveForm::validate($model);
//			Yii::app()->end();
//		}

        // collect user input data
        if (isset($_POST['LoginForm'])) {
            $model->attributes = $_POST['LoginForm'];
            $model->phone = preg_replace('-', '', $model->phone);
            // validate user input and redirect to the previous page if valid
            if ($model->validate() && $model->login())
                $this->redirect(Yii::app()->user->returnUrl);
        }

        if (isset($_POST['Login'])) {//Вход на сайт Ajax
            $model->attributes = $_POST['Login'];
            if ($model->validate()) {
                if($model->login()) {
                    $data['complete'] = 'Добро пожаловать';
                    echo json_encode($data);
                    Yii::app()->end();
                }
            } else {
                echo  CActiveForm::validate($model);
                Yii::app()->end();
            }
        }
        if (isset($_POST['LoginFormA'])) {
            $email = CHtml::encode(trim(str_replace('-', '', $_POST['LoginFormA']['email'])));
            $password = CHtml::encode(trim($_POST['LoginFormA']['password']));

            $model->email = $email;
            $model->password = $password;

            if ($model->validate() && $model->login()) {
                ;
                $data = array();
                $data['menu'] = $this->renderFile(Yii::getPathOfAlias('application') . '/views/layouts/menu.php', array(), true);
                $data['usermenu'] = $this->renderFile(Yii::getPathOfAlias('application') . '/views/layouts/usermenu.php', array(), true);
                $user = User::model()->findByPk(Yii::app()->user->id);
                $data['userName'] = $user->first_name . ' ' . $user->second_name;
                echo json_encode($data);
            }
            Yii::app()->end();
        }
        // display the login form
        $this->render('login', array('model' => $model));
    }

    /**
     * Logs out the current user and redirect to homepage.
     */
    public function actionReg()
    {
        if (!isset(Yii::app()->user->id)) {
            $model = new RegForm();

            if (isset($_POST['ajax']) && $_POST['ajax'] === 'reg-form') {
                echo CActiveForm::validate($model);
                Yii::app()->end();
            }
            if (isset($_POST)) {
                if (isset($_POST['RegForm'])) {
                    $model->attributes = $_POST['RegForm'];
                    if ($model->validate()) {
                        $user = new User();
                        $user->attributes = $model->getAttributes();
                        $user->save();
                    }
                }
            }

            if(isset($_POST['UserReg'])){
                $model->attributes = $_POST['UserReg'];
                if($model->validate()){
                    $data['complete'] = true;
                    $user = new User();
                    $user->attributes = $_POST['UserReg'];

                    if($user->validate()){
                        $user->save();
                    }else{
                        echo CActiveForm::validate($user);
                        Yii::app()->end();
                    }
                    echo json_encode($data);
                }else{
                    echo CActiveForm::validate($model);
                    Yii::app()->end();
                }
                Yii::app()->end();
            }
            $this->render('registr', array('model' => $model));
        } else {
            $this->redirect('/');
            Yii::app()->end();
        }
    }

    public function actionLogout()
    {
        Yii::app()->user->logout();
        $this->redirect(Yii::app()->homeUrl);
    }
}
