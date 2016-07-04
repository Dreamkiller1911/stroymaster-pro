<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 10.04.2016
 * Time: 0:39
 */
class RequestController extends Controller
{
    public $secondDate;
    protected $resumeType;
    protected $userDbType;
    protected $smsNotification;
    protected $imgType;
    protected $advtType;
    const MONTH = 2592000;

    public function init(){
        $this->resumeType = array(Request::TYPE_RESUME_ACTIVATE . '' , Request::TYPE_RESUME_EXTEND . '' );
        $this->userDbType = array(Request::TYPE_USER_DB_ACTIVATE . '' , Request::TYPE_USER_DB_EXTEND . '' );
        $this->smsNotification = array(Request::TYPE_SMS_ACTIVATE . '' , Request::TYPE_SMS_EXTEND . '' );
        $this->imgType = array(Request::TYPE_IMG_LIMIT_ACTIVATE . '' , Request::TYPE_IMG_LIMIT_EXTEND . '');
        $this->advtType = array(Request::TYPE_ADVT_ACTIVATE . '' , Request::TYPE_ADVT_EXTEND . '');
    }


    public function accessRules()
    {
        return array();
    }
    public function actionRegect()
    {
        $data = array();
        if($_POST['description'] == ''){
            $data['error'] = 'Нужно заполнить поле';
            $data['colse'] = false;
        }else{
            $model = Request::model()->findByPk($_POST['id']);
            if($model->negative == 1){
                $data['error'] = 'Уже обрабатываю запрос! Подождите!';
                $data['close'] = true;
            }else {
                $model->negative = 1;
                $model->description_n = $_POST['description'];
                $model->date_processing = time();
                if ($model->save()) {
                    $data['complete'] = 'Запрос помещен в архив';
                    $data['close'] = true;
                }
            }
        }
        echo json_encode($data);
    }
    public function actionGet()
    {
        $type = $_POST['type'];
        $model = array();
        if (in_array($this->resumeType, array('' => $type), true)) {
            $model = Request::model()->resume()->findAll();
        } else
            if (in_array($this->imgType, array('' => $type), true)) {
                $model = Request::model()->img_limit()->findAll();
            } else
                if (in_array($this->userDbType, array('' => $type), true)) {
                    $model = Request::model()->user_db()->findAll();
                }else
                    if(in_array($this->smsNotification, array('' => $type), true)){
                        $model = Request::model()->sms()->findAll();
                    }
                    else
                        if(in_array($this->advtType, array('' => $type), true)){
                            $model = Request::model()->advt()->findAll();
                        }
        $this->renderPartial('get', array('model' => $model));
    }

    public function actionGetForm()
    {
        $user = User::model()->findByPk(Yii::app()->user->id);
        $data = array();
        if ($user->phone_valid XOR $user->isMaster()) {
            $type_request = $_POST['type_request'];

            $this->secondDate = array(
                'baseId' => $_POST['baseId'],
                'RequestLabel' => Request::typeMSG(),
            );
            $file = 'forms';
            $data['content'] = $this->renderPartial($file, array('type' => $type_request, 'secondDate' => $this->secondDate), true);
            $data['cost_price'] = Request::getPrice($type_request);
        }else{
            $data['content'] = $this->renderPartial('errors', array('error'=>'Вы не подтвердили номер мобильного телефона.' .
                ' Для активации резюме и дальнейшего его показа на сайте, Вам нужно <a href="' . $this->createUrl("/user/confirm/",
                    array('type'=>'phone')) .
                '">подтвердить</a> номер телефона'), true);

        }

        echo json_encode($data);
    }
    public function actionAccept()//Принятие заявки от пользователя и внесение необходимых изменений
    {
        $request = Request::model()->findByPk($_POST['id']);
        $data = array('close'=>false);
        $data['type'] = $request->type;
        switch($request->type){//Определяем тип заявки
            case Request::TYPE_RESUME_ACTIVATE://Если тип заявки "Активация резюме" - 0
                $service = User::model()->findByPk($request->id_user)->Service;//Загружаем резюме
                if($service->status == 1){//Если статус резюме уже явлается активированным, тогда ошибка
                    $data['error'] = 'Резюме уже активированно!';
                }else{//В противном случае заполняем резюме данными
                    $service->status = 1;//Статус = Активно
                    $service->end_time = date('Y-m-d', time() + $request->time);//Устанавливаем на какое время будет активация
                    $request->positive = 1;//Меняем статус запроса на подтвержденный
                    $request->date_processing = time();//В запросе ставим сегодняшнюю дату
                    if($service->save() AND $request->save()){//Если все сохранено.... Отправляем json объект
                        $data['complete'] = 'Резюме активированно';
                        $data['close']= true;
                    }else{//В противном случае ошибка
                        $data['error'] = 'Активация не удалась';
                    }
                }
                break;
            case Request::TYPE_RESUME_EXTEND://Если тип заявки "Продление резюме" - 1
                $service = User::model()->findByPk($request->id_user)->Service;//Загружаем резюме
                if($service->status != 1){//Если резюме еще не активированно тогда ошибка
                    $data['error'] = 'Резюме еще не активированно!';
                }else {//Иначе ....
                    $service->end_time = date('Y-m-d', strtotime($service->end_time) + $request->time);//Добавляем время активации
                    $request->positive = 1;//Статус заявки меняем на принято
                    $request->date_processing = time();//Дата принятия сегодня...
                    if($service->save() AND $request->save()){//Пытаемся сохранить данные
                        $data['complete'] = 'Время активации добавленно';
                        $data['close']= true;
                    }else{//Если нет, выдаем ошибку
                        $data['error'] = 'Что то пошло не так';
                    }
                }
                break;
            case Request::TYPE_USER_DB_ACTIVATE://Если тип заявки "Активация доступа к базе заказчиков" - 2
                $user=User::model()->findByPk($request->id_user);
                if($user->phone_read != 0){//Если пользователь уже получил услугу - ОШИБКА
                    $data['error'] = 'Услуга уже активна';//Возвращаем ошибку
                }else{
                    $transaction = $user->dbConnection->beginTransaction();

                    try {
                        $user->phone_read = 1;//Статус доступа к базе данных в активно
                        $user->phone_read_date = date('Y-m-d', time() + $request->time);//Дата на котрую активируем
                        $request->positive = 1;//Статус заявки меняем на принято
                        $request->date_processing = time();//Дата принятия сегодня...
                        if ($user->save(false) === false) {//Пытаемся сохранить данные
                            $transaction->rollBack();
                            throw new Exception("Ошибка сохранения пользователя");

                        }
                        if($request->save() === false){
                            $transaction->rollback();
                            throw new Exception("Ошибка сохранения запроса");
                        }
                        $transaction->commit();
                        $data['complete'] = 'Услуга активированна';
                        $data['close'] = true;
                    } catch (Exception $e) {
                        $data['error'] = $e->getMessage();
                    }
                }
            break;
            case Request::TYPE_USER_DB_EXTEND://Если тип заявки "Продление доступа к базе данных заказчиков" - 3
                $user=User::model()->findByPk($request->id_user);
                $transaction = $user->dbConnection->beginTransaction();
                if($user->phone_read != 1){//Если у пользователя услуга не активированна - ОШИБКА
                    $data['error'] = 'Услуга еще не активированна';//Возвращаем ошибку
                }else{
                    try {
                        $user->phone_read_date = date('Y-m-d', strtotime($user->phone_read_date) + $request->time);//Продлеваем дату активации
                        $request->positive = 1;//Статус заявки меняем на принято
                        $request->date_processing = time();//Дата принятия сегодня...
                        if ($user->save(false) === false) {//Пытаемся сохранить данные
                            $transaction->rollback();
                            throw new Exception("Ошибка сохранения пользователя");
                        }
                        if($request->save() === false){
                            $transaction->rollback();
                            throw new Exception("Ошибка сохранения запроса");
                        }
                        $transaction->commit();
                        $data['complete'] = 'Услуга активированна';
                        $data['close'] = true;
                    } catch (Exception $e) {
                        $transaction->rollback();
                        $data['error'] = $e->getMessage();
                    }
                }
            break;
            case Request::TYPE_IMG_LIMIT_ACTIVATE:
                $service=User::model()->findByPk($request->id_user)->Service;
                if($service->img_limit != 5){//Если услуга уже подключенна
                    $data['error'] = 'Услуга уже активна';//Возвращаем ошибку
                }else{//Иначе
                    $service->img_limit = 10;//Увеличить лимит картинок до 10
                    $service->img_time_end = date('Y-m-d', time() + $request->time);//Дата на котрую активируем
                    $request->positive = 1;//Статус заявки меняем на принято
                    $request->date_processing = time();//Дата принятия сегодня...
                    if($service->save() AND $request->save()){//Пытаемся сохранить данные
                        $data['complete'] = 'Услуга активированна';
                        $data['close']= true;
                    }else{//Если нет, выдаем ошибку
                        $data['error'] = 'Что то пошло не так';
                    }
                }
            break;
            case Request::TYPE_IMG_LIMIT_EXTEND:
                $service=User::model()->findByPk($request->id_user)->Service;
                if($service->img_limit != 10){//Если услуга еще не подключена
                    $data['error'] = 'Услуга еще не подключена';//Возвращаем ошибку
                }else{//Иначе
                    $newDate = date('Y-m-d', strtotime($service->img_time_end) + $request->time);
                    $service->img_time_end = $newDate;//Дата на котрую активируем
                    $request->positive = 1;//Статус заявки меняем на принято
                    $request->date_processing = time();//Дата принятия сегодня...
                    if($service->save() AND $request->save()){//Пытаемся сохранить данные
                        $data['complete'] = 'Услуга активированна';
                        $data['close']= true;
                    }else{//Если нет, выдаем ошибку
                        $data['error'] = 'Что то пошло не так';
                    }
                }
                break;
            case Request::TYPE_ADVT_ACTIVATE:
                $advt = Advertising::model()->findByPk($request->id_advt);
                if($advt->status == Advertising::STATUS_ACTIVE){//Если статус рекламы уже явлается активированным, тогда ошибка
                    $data['error'] = 'Реклама уже активна!';
                }else{//В противном случае заполняем рекламу данными и активируем
                    $advt->status = 1;//Статус = Активно
                    $advt->date_end = date('Y-m-d H:i:s', time() + $request->time);//Устанавливаем на какое время будет активация
                    $request->positive = 1;//Меняем статус запроса на подтвержденный
                    $request->date_processing = time();//В запросе ставим сегодняшнюю дату
                    if($advt->save()){//Если все сохранено.... Отправляем json объект
                        $request->save();
                        $data['complete'] = 'Реклама активирована';
                        $data['close']= true;
                    }else{//В противном случае ошибка
                        $data['error'] = 'Активация не удалась';
                    }
                }
                break;
            case Request::TYPE_ADVT_EXTEND:
                $advt = Advertising::model()->findByPk($request->id_advt);
                if($advt->status == Advertising::STATUS_ANACTIVE){//Если реклама не активирована, тогда ошибка
                    $data['error'] = 'Реклама не активна!';
                }else{//В противном случае заполняем рекламу данными и продлеваем
                    $newDate = strtotime($advt->date_end) + $request->time;
                    $advt->date_end = date('Y-m-d H:i:s', $newDate);
                    $request->positive = 1;//Меняем статус запроса на подтвержденный
                    $request->date_processing = time();//В запросе ставим сегодняшнюю дату
                    if($advt->save()){//Если все сохранено.... Отправляем json объект
                        $request->save();
                        $data['complete'] = 'Реклама продлена';
                        $data['close']= true;
                    }else{//В противном случае ошибка
                        $data['error'] = 'Активация не удалась';
                    }
                }
                break;
            default:
                $data['error'] = 'Ошибка обработки запроса!';
                break;

        }
        echo json_encode($data);
    }
    public function actionAdd()
    {
        $type = $_POST['type'];
        $date = $_POST['date_m'];
        $id_user = $_POST['id_user'];
        $id_service = $_POST['id_service'];

        switch ($type) {
            case Request::TYPE_RESUME_ACTIVATE:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service' => $id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_RESUME_EXTEND:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service' => $id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_USER_DB_ACTIVATE:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service' => $id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_USER_DB_EXTEND:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service' => $id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_SMS_ACTIVATE:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service' => $id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_SMS_EXTEND:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service' => $id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_IMG_LIMIT_ACTIVATE:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service' => $id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_IMG_LIMIT_EXTEND:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_service'=>$id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_ADVT_ACTIVATE:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_advt'=>$id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }
                break;
            case Request::TYPE_ADVT_EXTEND:
                switch ($_POST['id']) {//Тип платежа
                    case 'pay_cash':
                        $model = $this->newRequest($type, $date, $id_user, array('id_advt'=>$id_service));
                        $data = $this->saveRequest($model, $id_user, $type);
                        break;
                }

        }
        echo json_encode($data);
    }

    protected function newRequest($type, $date, $idUser, $idData = array())
    {


        $model = new Request();
        $model->type = $type;
        $model->date_create = time();
        $model->summ = $date * Request::getPrice($type);
        $model->time = (RequestController::MONTH * $date);
        $model->id_user = $idUser;
        $model->id_service = $idData['id_service'];
        $model->id_advt = $idData['id_advt'];

        return $model;
    }

    protected function saveRequest($model, $id_user, $type)
    {
        if (Request::model()->count('id_user=:id_user AND type=:type AND negative != 1 AND positive != 1', array(':id_user' => $id_user, ':type' => $type)) < 1) {
            if ($model->save()) {
                $data = array(
                    'complete' => true,
                    'title' => 'Запрос принят',
                    'text' => 'В ближайшее время с вами свяжется администрация для подтверждения оплаты',
                );
            }
        } else {
            $data = array(
                'error' => true,
                'text' => 'Вами уже была ранее отправленна заявка.' .
                    'В данный момент она обрабатывается администратором.' .
                    ' Если вы уже оплатили опцию, и прошло уже более одного часа,' .
                    '<a class="text-danger" href="/site/contact/">напишите нам</a> указав UID вашего резюме'
            );
        }
        return $data;
    }


}