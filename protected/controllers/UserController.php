<?php

class UserController extends Controller
{
    public function init()
    {
        $cs = parent::init();
        return $cs;
    }
    public function actionGetAll(){
        $user = User::model()->findAll();
        echo '<pre>';
        var_dump($user);
        echo '</pre>';
    }

    public function actionIndex()
    {

        /*$cs = $this->init();
        $cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/Comments.js');
        $cs->registerScript('commentsInit',
            'var com = new Comments(\'#comment\');' .
            'com.init()'
        );*/

        $user = $this->loadUser();
        $model = new Comments();

        if (isset($_POST['ajax']) && $_POST['ajax'] === 'setComplete') {
            $data = array();
            $order = Orders::model()->findByPk($_POST['id']);
            if ($order) {
                $order->status = 0;
                $order->date_end = time();
                if ($order->save()) {
                    $item = $this->renderPartial('_listOrders', array('model' => array($order), 'ajax' => true), true);
                    $data['complete'] = true;
                    $data['item'] = $item;
                }
            } else {
                $data['error'] = 'Не найден заказ, мы уже занимаемся данной проблемой, спасбо';
            }
            echo json_encode($data);
            Yii::app()->end();
        }
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'getOptions') {
            $this->widget('UserOptions', array('model' => $user));
            Yii::app()->end();
        }
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'getDataWidgetOption') {
            $this->widget('UserOptions', array('model' => $user));
            Yii::app()->end();
        }

        if ($user->class != User::CLIENT) {
            $this->render('index', array('user' => $user, 'model' => $model));
        } else {
            /*$cs->registerScript('orders',
                'var orders = new orders();' .
                'orders.edit();' .
                'orders.save();' .
                'orders.statusComplete();', CClientScript::POS_END
            );*/
            $this->render('client', array('user' => $user));
        }
    }

    public function actionShowService()
    {
        $service = Services::model()->findByPk($_POST['id']);
        $model = new Comments();


        if ($service->idUser->id != Yii::app()->user->id) {
            $session = new CHttpSession();
            if (!$session->isStarted) {
                $session->open();
            }

            if ($session['viewsAppLimit'] === null) {
                $sql = 'UPDATE tbl_services SET views=views+1';
                $command = Yii::app()->db->createCommand($sql);
                $command->execute();
                $session['viewsAppLimit'] = true;
            }
        }

        $view = $this->renderPartial('preview', array('user' => $service->idUser, 'model' => $model), true);
        echo $view;
    }

    public function actionSettings()
    {
        $model = $this->loadUser();

        if(isset($_POST['ajax']) && $_POST['ajax']==='UserSettings'){
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
        if (isset($_POST['User'])) {
            $data = $_POST['User'];
            if ($data['password'] === '') {
                unset($data['password']);
                unset($data['confirm_password']);
                $data['confirm_password'] = $model->password;
            }

            $phone = $model->phone;
            $model->attributes = $data;
            $model->phone = Formatter::preformPhone($data['phone']);
            if ($model->validate()) {
                if ($phone != Formatter::preformPhone($data['phone'])) {
                    $model->phone_valid = 0;
                }
                $model->save();
                Yii::app()->user->setFlash('success', '<hr> Профиль сохранен');
                $this->redirect('/user/settings/');
                Yii::app()->end();
            }


        }
        $this->render('settings', array('model' => $model));
    }

    public function actionConfirm($type)
    {
        if (!Yii::app()->user->isGuest) {
            $user = User::model()->findByPk(Yii::app()->user->id);

            switch ($type) {
                case 'phone':
                    $criteria = new CDbCriteria();
                    $criteria->condition = 'phone=:phone';
                    $criteria->params = array(':phone' => $user->phone);
                    $timeOut = 60;

                    $tmpConfirm = CheckPhone::model()->find($criteria);
                    if ($tmpConfirm) {
                        if (isset($_POST['checkCode'])) {
                            $code = trim($_POST['code']);

                            if ($code === '') {
                                $timeOut = -1;
                                Yii::app()->user->setFlash('error', '<span class="text-danger">Введите код</span>');
                            } elseif (strlen($code) != 4) {
                                Yii::app()->user->setFlash('error', '<span class="text-danger">Не верный формат кода</span>');
                            } elseif ($code === $tmpConfirm->code) {
                                $this->deleteTempUser($user->phone);
                                $user->phone_valid = 1;
                                if ($user->save(false)) {
                                    Yii::app()->user->setFlash('success', 'Номер телефона успешно подтвержден');
                                    $this->redirect('/user/settings/');
                                }
                            } else {
                                $timeOut = -1;
                                Yii::app()->user->setFlash('error', '<span class="text-danger">Не верный код</span>');
                            }
                        }elseif(isset($_POST['getCode'])){
                            $code = $this->updateTmpCode($user->phone);
                            $text = 'Код подтверждения - ' . $code;
                            $this->sendCode($user->phone, $text);
                            Yii::app()->user->setFlash('error', '<span class="text-success">Код выслан на Ваш номер в СМС</span>');
                        }else{
                            Yii::app()->user->setFlash('error', '<h5><span class="text-warning">Ранее Вам уже высылали код по СМС, если Вы не получили его то можете запросить код снова</span></h5>');
                        }
                    } else if (!$user->phone_valid) {
                        $code = $this->createTmpUser($user->phone);
                        $text = 'Код подтверждения - ' . $code;
                        $this->sendCode($user->phone, $text);
                        Yii::app()->user->setFlash('error', '<span class="text-success">Код выслан на Ваш номер в СМС</span>');
                    }
                    $this->init()->registerScript('tm',
                        'var ms = new Messager();' .
                        'var btn = $(\'button[name="getCode"]\');' .
                        'ms.progressTime(btn, ' . $timeOut . ')', CClientScript::POS_LOAD
                        );
                    $this->render('check_phone', array('user' => $user));
                    break;
                default:
                    $this->redirect('/');
                    Yii::app()->end();

            }
        } else {
            $this->redirect('/');
            Yii::app()->end();
        }
    }
    public function actionLogin(){
        var_dump($_POST);
    }

    protected function loadUser()
    {
        $id = Yii::app()->user->id;
        if ($id === null) {
            $this->redirect('/');
        }
        return User::model()->findByPk($id);

    }

    /** Функция проверяет номер телефона и если все успешно отправляет код для проверки, так же создает временную запись в базе */
    public function actionCheckPhone()
    {
        try {
            /** Если нет POST с параметром OrdersCheckPhone , а так-же номер телефона отсутствует, переадресовываем на главную страницу */
            if (!isset($_POST['OrdersCheckPhone']) && $_POST['OrdersCheckPhone']['phone'] == "") {
                $this->redirect('/');
                Yii::app()->end();
            }

            $phone = User::phoneCorrector($_POST['OrdersCheckPhone']['phone']);//Обрабатываем номер телефона

            if (strlen($phone) != 11) {
                throw new Exception('Не верный формат номера');
            }
            $criteria = new CDbCriteria();
            $criteria->condition = 'phone=:phone';
            $criteria->params = array(':phone' => $phone);

            $user = User::model()->count($criteria);

            if ($user > 0) {
                $criteria->select = 'class';
                if (User::model()->find($criteria)->class != User::CLIENT) {
                    throw new Exception(
                        'Данный номер уже зарегестрирован<br>' .
                        'Пользователь не является заказчиком<br>' .
                        'Пожалуйста введите другой номер'
                    );
                } else {
                    $data = array('complete' => true, 'type' => 'userReady', 'login' => $phone, 'message' => 'Вы уже зарегестрированны, пожалуйста войдите');
                    echo json_encode($data);
                }
            } else {
                $code = rand(1000, 9999);
                if (CheckPhone::model()->count($criteria) > 0) {
                    if (CheckPhone::isInit($phone)) {//Есл запрос на код во торой раз, просим посмотреть код в телефоне
                        $data = array('complete' => true,
                            'type' => 'sendCode',
                            'timeLimit' => 10,
                            'message' => 'Ранее Вам уже отправляли код<br>Пожалуйста посмотрите в СМС<br>Если кода нет запросите его еще раз<br>Спасибо');
                        echo json_encode($data);
                    } else {//Если запрос уже в третий раз, высылаем новый код
                        if ($this->sendCode($phone, 'Код активации - ' . $code)) {
                            $model = CheckPhone::model()->findByAttributes('*', 'phone=:phone', array(':phone' => $phone));
                            $model->code = $code;
                            $model->save();
                            $data = array('complete' => true,
                                'type' => 'sendCode',
                                'timeLimit' => 60,
                                'message' => 'Код был выслан на номер ' . $phone);
                            echo json_encode($data);
                        } else {
                            throw new Exception('Сервис временно не доступен<br>Пожалуйста подождите или воспользуйтесь<br>регистрацией в главном меню');
                        }
                    }
                } else {
                    if ($this->sendCode($phone, 'Код активации - ' . $code)) {
                        $connection = Yii::app()->db;
                        $sql = "INSERT INTO `tbl_checkPhone` (phone, code) VALUES (:phone, :code)";
                        $command = $connection->createCommand($sql);
                        $command->bindParam(':phone', $phone, PDO::PARAM_INT);
                        $command->bindParam(':code', $code, PDO::PARAM_INT);
                        if ($command->query()) {
                            $data = array('complete' => true,
                                'type' => 'sendCode',
                                'timeLimit' => 60,
                                'message' => 'Код был выслан на номер ' . $phone);
                            echo json_encode($data);
                        }
                    } else {
                        throw new Exception('Сервис временно не доступен<br>Пожалуйста подождите или воспользуйтесь<br>регистрацией в главном меню');
                    }
                }
            }
        } catch (Exception $e) {
            echo json_encode($e->getMessage());
        }
    }

    /** Функция для проверки введенного кода от пользователя, в случае правильного ввода
     * будет произведена регистрация нового пользователя, удалена временная запись о пользователе в базе данных
     * вернутся данные о пользователе*/
    public function actionVereCode()
    {
        if (!isset($_POST['Orders'])) {
            $this->redirect('/');
            Yii::app()->end();
        }
        try {
            $phone = User::phoneCorrector($_POST['OrdersCheckPhone']['phone']);//Обрабатываем номер телефона
            $code = CHtml::encode(trim($_POST['Orders']['code']));
            $name = explode(' ', CHtml::encode(trim($_POST['Orders']['name'])));

            if (strlen($code) != 4 || $code === '') {
                throw new Exception('Не правильный формат кода');
            }

            $criteria = new CDbCriteria();
            $criteria->condition = 'phone=:phone';
            $criteria->params = array(':phone' => $phone);

            $tmpUSer = CheckPhone::model()->findByAttributes('*', $criteria);
            if (!$tmpUSer) {
                throw new Exception('Произошла ошибка регистрации пользователя');
            }
            if ($tmpUSer['code'] === $code) {
                $password = substr(trim(crypt($code, get_class($this))), 0, 6);

                $user = new User();
                $user->first_name = $name[0];
                $user->second_name = $name[1];
                $user->password = $password;
                $user->class = 2;
                $user->phone = $phone;
                if ($user->save()) {
                    $this->deleteTempUser($phone);
                    $this->sendCode($phone, 'Ваш пароль для входа - ' . $password);
                    $data = array('complete' => true, 'message' => 'Код верный, пароль был выслан вам в СМС', 'password' => $password);
                    echo json_encode($data);
                } else {
                    throw new Exception('Код подошел, но пользователь не был создан, обратитесь к администрации');
                }
            } else {
                throw new Exception('Не верный код');
            }
        } catch (Exception $e) {
            echo json_encode($e->getMessage());
        }
    }

    protected function deleteTempUser($phone)
    {
        $connection = Yii::app()->db;
        $sql = "DELETE FROM `tbl_checkPhone` WHERE phone=:phone";
        $command = $connection->createCommand($sql);
        $command->bindParam(':phone', $phone, PDO::PARAM_INT);
        return $command->execute();
    }

    protected function createTmpUser($phone)
    {
        $code = rand(1000, 9999);
        $connection = Yii::app()->db;
        $sql = "INSERT INTO `tbl_checkPhone` (phone, code) VALUES (:phone, :code)";
        $command = $connection->createCommand($sql);
        $command->bindParam(':phone', $phone, PDO::PARAM_INT);
        $command->bindParam(':code', $code, PDO::PARAM_INT);
        $command->query();
        return $code;
    }

    protected function updateTmpCode($phone)
    {
        $code = rand(1000, 9999);
        $connection = Yii::app()->db;
        $sql = "UPDATE `tbl_checkPhone` SET code=:code, init=init+1 WHERE phone=:phone";
        $command = $connection->createCommand($sql);
        $command->bindParam(':phone', $phone, PDO::PARAM_INT);
        $command->bindParam(':code', $code, PDO::PARAM_INT);
        $command->execute();
        return $code;
    }


    public function actionTest()
    {
        $cs = Yii::app()->clientScript;
        $cs->registerCoreScript('jquery');
        $cs->registerScriptFile('/assets/myTestScript/main.js');
        $cs->registerScriptFile('/assets/myTestScript/matrix.js');
        $cs->registerScriptFile('/assets/myTestScript/snake.js');
        $cs->registerCssFile('/assets/myCss/mains.css');
        $this->render('test');
    }

    public function actionGetCurrentUser()
    {
        if (isset($_POST)) {
            $data = array();
            $connect = Yii::app()->db;
            $qwr = "SELECT id, first_name, email FROM {{user}} WHERE id=:id";
            $command = $connect->createCommand($qwr);
            $command->bindParam('id', Yii::app()->user->id);
            $user = $command->queryRow();
            if ($user) {
                $data['id'] = $user['id'];
                $data['first_name'] = $user['first_name'];
                $data['email'] = $user['email'];
            } else {
                $data['error'] = true;
            }
            echo json_encode($data);
        }
    }

    public function sendCode($phone, $text)
    {
        /*$id = '24706';
        $key = '5CFCCD9140982066';
        $from = 'Stoy-pro';
        $result = file_get_contents('http://bytehand.com:3800/send?id=' . $id .
            '&key=' . $key .
            '&to=' . urlencode($phone) .
            '&from=' . urlencode($from) .
            '&text=' . urlencode($text));
        if($result === false){
           return false;
        }else return true;*/
        return true;
    }
}