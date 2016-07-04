<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 09.04.2016
 * Time: 16:02
 */
class UserOptions extends CWidget
{
    public $model;
    public $file = 'options';
    private $options;
    protected $cs;
    public function init()
    {

        $this->cs = Yii::app()->clientScript;

        $this->cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/userOptions.js', CClientScript::POS_HEAD);

        $options = $this->generateOptions();
        $this->render($this->file, array('model'=>$this->model, 'opt'=>$this->options));
    }

    protected function generateOptions()
    {
        $this->options['Title'] = 'Заявки на оплату опций';

        $user = $this->model;//Класс пользователя

        switch($this->model->class){
            case User::MASTER:
                $this->options['Title'] = 'Опции';
                $this->regScript();
                switch($user->Service->status){
                    case Services::STATUS_ACTIVE:
                        $this->options['data']['status'] =array(
                            'text' => 'Продлить публикацию резюме',
                            'color' => 'green',
                            'glyphicon' => 'glyphicon-usd',
                            'title'=>'Вы можете продлить резюме заранее',
                            'click'=>"opt.getForm(" . Request::TYPE_RESUME_EXTEND . "," . Services::STATUS_ANACTIVE . ")",
                        );
                        break;
                    case Services::STATUS_ANACTIVE:
                        $this->options['data']['status'] =array(
                            'text' => 'Активировать резюме',
                            'color' => 'black',
                            'glyphicon' => 'glyphicon-usd',
                            'title'=>'Активируйте свое резюме что бы заказчики могли найти Вас на сайте',
                            'click'=>"opt.getForm(" . Request::TYPE_RESUME_ACTIVATE . "," . Services::STATUS_ACTIVE . ")",

                            );
                        break;
                    case Services::STATUS_LOCKED:
                        $this->options['data']['status'] = array(
                                'text' => 'Ваше резюме заблокированно',
                                'color' => 'red',
                                'glyphicon' => 'glyphicon-lock',
                                'title'=>'Администратор заблокировал ваше резюмэ, пишите в обратную связь или смотрите информацию в кабинете',
                                'active'=>'disabled',
                            );
                        break;
                }
                switch($user->phone_read){
                    case User::CLIENT_DATA_DISABLED:
                        $this->options['data']['client_data'] = array(
                            'text'=>'Доступ к базе заказов',
                            'glyphicon' => 'glyphicon-usd',
                            'title'=>'Вам будут доступны номера телефонов заказчиков',
                            'click'=>"opt.getForm(" . Request::TYPE_USER_DB_ACTIVATE . "," . User::CLIENT_DATA_ACTIVE . ")",
                        );
                        break;
                    case User::CLIENT_DATA_ACTIVE:
                        $this->options['data']['client_data'] = array(
                            'text'=>'Продлить доступ к базе заказов',
                            'glyphicon' => 'glyphicon-usd',
                            'title'=>'Продлите доспуп к базе ' . date('d.m.Y', $user->phone_read_date),
                            'color'=>'green',
                            'click'=>"opt.getForm(" . Request::TYPE_USER_DB_EXTEND . "," . Services::STATUS_ACTIVE . ")",
                        );
                        break;
                }
                switch($user->sms_notification){
                    case User::CLIENT_SMS_DISABLED:
                        $this->options['data']['SMS'] = array(
                            'text'=>'SMS оповещение о новых заказах',
                            'glyphicon' => 'glyphicon-usd',
                            'title'=>'Вам будет приходит SMS, когда на сайте появятся новые заказы',
                            'click'=>"opt.getForm(" . Request::TYPE_SMS_ACTIVATE . "," . Services::STATUS_ACTIVE . ")",
                        );
                        break;
                    case User::CLIENT_SMS_ACTIVE:
                        $this->options['data']['SMS'] = array(
                            'text'=>'Продлить SMS оповещение',
                            'glyphicon' => 'glyphicon-usd',
                            'color'=>'green',
                            'title'=>'Вы можете продлить услугу SMS оповещения',
                            'click'=>"opt.getForm(" . Request::TYPE_USER_DB_EXTEND . "," . Services::STATUS_ACTIVE . ")",
                        );
                        break;
                }
                switch($user->Service->img_limit){
                    case User::CLIENT_IMG_DISABLED:
                        $this->options['data']['IMG'] = array(
                            'text'=>'До 10-ти изображений',
                            'glyphicon' => 'glyphicon-usd',
                            'title'=>'Данная опция позволяет загружать в резюме до 10-ти фотографий',
                            'click'=>"opt.getForm(" . Request::TYPE_IMG_LIMIT_ACTIVATE . "," . Services::STATUS_ACTIVE . ")",
                        );
                        break;
                    case User::CLIENT_IMG_ACTIVATE://Если уже активированно (10)
                        $this->options['data']['IMG'] = array(
                            'text'=>'Продлить лимит по изображениям',
                            'glyphicon' => 'glyphicon-usd',
                            'color'=>'green',
                            'title'=>'Вы можете заранее продлить данную опцию, ',
                            'click'=>"opt.getForm(" . Request::TYPE_IMG_LIMIT_EXTEND . "," . Services::STATUS_ACTIVE . ")",
                        );
                        break;
                }

                break;
            case User::ADMIN:
                $this->regScript();
                $this->options['data']['status'] =array(
                    'text' => 'Заявки на оплату резюме',
                    'amount'=>Request::model()->resume()->count(),
                    'active'=>Request::model()->resume()->count() > 0 ? '' : 'disabled',
                    'click'=>"opt.getData(" . json_encode([Request::TYPE_RESUME_ACTIVATE, Request::TYPE_RESUME_EXTEND]) . ")",
                );
                $this->options['data']['client_data'] = array(
                    'text'=>'Заявки на оплату доступа к базе',
                    'amount'=>Request::model()->user_db()->count(),
                    'active'=>Request::model()->user_db()->count() > 0 ? '' : 'disabled',
                    'click'=>"opt.getData(" . json_encode([Request::TYPE_USER_DB_ACTIVATE, Request::TYPE_USER_DB_EXTEND]) . ")",
                );
                $this->options['data']['SMS'] = array(
                    'text'=>'Заявки на оплату SMS',
                    'amount'=>Request::model()->sms()->count(),
                    'active'=>Request::model()->sms()->count() > 0 ? '' : 'disabled',
                    'click'=>"opt.getData(" . json_encode([Request::TYPE_SMS_ACTIVATE, Request::TYPE_SMS_EXTEND]) . ")",
                );
                $this->options['data']['IMG'] = array(
                    'text'=>'Заявки на оплату изображений',
                    'amount'=>Request::model()->img_limit()->count(),
                    'active'=>Request::model()->img_limit()->count() > 0 ? '' : 'disabled',
                    'click'=>"opt.getData(" . json_encode([Request::TYPE_IMG_LIMIT_ACTIVATE, Request::TYPE_IMG_LIMIT_EXTEND]) . ")",
                );
                $this->options['data']['advt'] = array(
                    'text'=>'Заявки на оплату рекламы',
                    'amount'=>Request::model()->advt()->count(),
                    'active'=>Request::model()->advt()->count() > 0 ? '' : 'disabled',
                    'click'=>"opt.getData(" . json_encode([Request::TYPE_ADVT_ACTIVATE, Request::TYPE_ADVT_EXTEND]) . ")",
                );
                break;
            case User::VENDOR:
                    if(isset($_POST['ajax']) && $_POST['ajax'] === 'getOptions'){
                        $advtModel = Advertising::model()->findByPk($_POST['id_advt']);
                        switch($advtModel->status) {
                            case Advertising::STATUS_ANACTIVE;
                                if($advtModel->date_end === Advertising::DATE_NULL || $advtModel->date_end === null) {
                                    $this->options['Title'] = 'Опции';
                                    $this->options['data']['status'] = array(
                                        'text' => 'Активировать рекламный блок',
                                        'color' => 'black',
                                        'glyphicon' => 'glyphicon-usd',
                                        'title' => 'Активируйте рекламный блок, что бы пользователи сайта видели его',
                                        'advt' => $_POST['id_advt'],
                                        'type' => Request::TYPE_ADVT_ACTIVATE,
                                    );
                                }else{
                                    $this->options['Title'] = 'Опции';
                                    $this->options['data']['status'] = array(
                                        'text' => 'Вы отключили этот блок',
                                        'color' => 'red',
                                        'glyphicon' => 'glyphicon-lock',
                                        'title' => 'Вам необходимо включить рекламный блок в разделе управления рекламой',
                                        'active'=>'disabled',
                                        'advt' => $_POST['id_advt'],
                                        'type' => Request::TYPE_ADVT_ACTIVATE,
                                    );
                                }
                                break;
                            case Advertising::STATUS_ACTIVE:
                                $this->options['Title'] = 'Опции';
                                $this->options['data']['status'] = array(
                                    'text' => 'Продление рекламного блока',
                                    'color' => 'black',
                                    'glyphicon' => 'glyphicon-usd',
                                    'title' => 'Продлите время на сайте вашего рекламного блока',
                                    'advt' => $_POST['id_advt'],
                                    'type' => Request::TYPE_ADVT_EXTEND,
                                );
                                break;
                        }
                        break;
                }else {
                    $this->owner->init()->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/vendorOptions.js');
                    $this->owner->init()->registerScript('preview',
                        '$(\'#options span.preview\').vendorOptions(\'preview\');' .
                        '$(\'#options span.options\').vendorOptions(\'getOption\')'
                    );
                    $this->file = 'optionsVendor';
                    $this->options['Title'] = 'Опции рекламных блоков';
                }


        }
    }
    protected function regScript(){
        $this->cs->registerScript(User::ADMIN, '
                    var opt = new userOptions;
                ', CClientScript::POS_BEGIN);
        return true;
    }


}