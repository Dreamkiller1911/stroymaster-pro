<?php

class SiteController extends Controller
{
    public $layout = 'column1';

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
    public function actionMainMenuGenerate(){
        $data = $this->renderPartial('menu', array(), true);
        echo json_encode($data);
    }


    public function actionContact()
    {
        var_dump(22220);
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


    public function actionLogin()
    {
        if (!defined('CRYPT_BLOWFISH') || !CRYPT_BLOWFISH)
            throw new CHttpException(500, "This application requires that PHP was compiled with Blowfish support for crypt().");

        $model = new LoginForm;;

        if (isset($_POST['LoginForm'])) {
            $model->attributes = $_POST['LoginForm'];
            $model->phone = preg_replace('-', '', $model->phone);
            if ($model->validate() && $model->login())
                $this->redirect(Yii::app()->user->returnUrl);
        }

        if (isset($_POST['Login'])) {
            $model->attributes = $_POST['Login'];
            if ($model->validate()) {
                if($model->login()) {
                    $data['complete'] = '?????????? ????????????????????';
                    echo json_encode($data);
                    Yii::app()->end();
                }
            } else {
                echo  CActiveForm::validate($model);
                Yii::app()->end();
            }
        }
        if (isset($_POST['ajaxLogin'])) {

            $dataSend = array();
            $email = CHtml::encode(trim($_POST['ajaxLogin']['login']));
            if(!preg_match('/@|\./', $email)){
                $email = User::phoneCorrector($email);
            }
            $password = CHtml::encode(trim($_POST['ajaxLogin']['password']));

            $model->email = $email;
            $model->password = $password;

            if ($model->validate() && $model->login()) {
                $dataSend['complete'] = true;
            }else{
                $dataSend['complete'] = false;
                $dataSend['error'] = json_decode(CActiveForm::validate($model));
            }
            echo json_encode($dataSend);
            Yii::app()->end();
        }
        $this->render('login', array('model' => $model));
    }

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
        if(isset($_POST['ajaxLogout'])){
            Yii::app()->user->logout();
            var_dump('??????????');
            Yii::app()->end();
        };
        /*Yii::app()->user->logout();
        $this->redirect(Yii::app()->homeUrl);*/
    }
}
