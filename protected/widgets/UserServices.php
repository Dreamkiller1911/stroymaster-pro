<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 09.04.2016
 * Time: 2:42
 */
class UserServices extends CWidget
{
    public $userStatus;
    public $model;
    protected $fileView;

    public function init()
    {
        $data = $this->getModel();
//        var_dump($this->model);
        $this->render('services', array(
            'model' => $this->model,
            'data' => $data,
        ));
    }

    public function run()
    {

    }

    protected function getModel()
    {
        switch ($this->userStatus) {
            case User::MASTER:
                $data = $this->generateDataMaster();
//                $this->fileView = 'serviceMaster';
                break;
            case User::VENDOR:
                $data = $this->generateDataVendor();
                break;
            case User::ADMIN:
                $data = $this->generateDataAdmin();
                break;
            case User::CLIENT:
        }
        return $data;
    }

    protected function generateDataMaster()
    {
        $data = array(
            'title' => 'Информация о резюме',


        );
        switch ($this->model->Service->status) {
            case Services::STATUS_ANACTIVE :
                if(is_null($this->model->Service->id)){
                    $data = array('Статус резюме' => 'Не оформленно') + $data;
                }else {
                    $data = array('Статус резюме' => 'Не активно') + $data;
                }
                break;
            case Services::STATUS_ACTIVE:

                $data = array(
                        'Статус резюме' => 'Активно',
                        '<span title="Уникальный номер для оплаты опций вашего резюме">UID вашего резюме</span>'
                        => $this->model->Service->id != null ? 'SRV_' . $this->model->Service->id : 'Не присвоен',
                        'Активно до' => $this->model->Service->getData('end_time'),
                        'Размещено' => $this->model->Service->getData('date_create'),
                        'Последние обновление' => $this->model->Service->getData('last_update'),
                        'Просмотров' => $this->model->Service->views,
                        'Лимит по картинками' => $this->model->Service->img_limit) + $data;

                break;
            case Services::STATUS_LOCKED:
                $data = array('Статус резюме' => 'Заблокированно') + $data;
                break;
            case false:
                $data = array('Статус резюме' => 'Не оформленно') + $data;

        }

        return $data;
    }
    protected function generateDataVendor()
    {
        $data = array(
            'title' => 'Рекламмные блоки',
            /*'<span title="Уникальный номер для оплаты опций вашего резюме">UID вашего резюме</span>'
            => $this->model->Service->id != null ? 'SRV_' . $this->model->Service->id : 'Еще не присвоем',
            'Размещено' => date('d.m.Y', $this->model->Service->date_create),
            'Последние обновление' => date('d.m.Y', $this->model->Service->last_update),*/
        );
        /*switch ($this->model->Service->status) {
            case Services::STATUS_ANACTIVE :
                if(is_null($this->model->Service->id)){
                    $data = array('Статус резюме' => 'Не оформленно') + $data;
                }else {
                    $data = array('Статус резюме' => 'Не активно') + $data;
                }
                break;
            case Services::STATUS_ACTIVE:
                $data = array(
                        'Статус резюме' => 'Активно',

                        'Активно до' => date('d.m.Y', $this->model->Service->end_time)) + $data;
                break;
            case Services::STATUS_LOCKED:
                $data = array('Статус резюме' => 'Заблокированно') + $data;
                break;
            case false:
                $data = array('Статус резюме' => 'Не оформленно') + $data;

        }
        $data['Просмотров'] = '23';
        $data['Лимит по картинками'] = $this->model->Service->img_limit;*/
        return $data;
    }
    protected function generateDataAdmin()
    {
        $data = array(
            'Всего пользователей'=>count(User::model()->findAll()),
            ''
        );
        return $data;
    }
    protected function generateDataClient()
    {
        $data = array(
            'Всего пользователей'=>count(User::model()->findAll()),
            ''
        );
        return $data;
    }

}