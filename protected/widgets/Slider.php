<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 05.04.2016
 * Time: 20:54
 */
class Slider extends CWidget
{
    public function init()
    {
        $cs = Yii::app()->clientScript;
        $cs->registerScriptFile('/assets/new/js/slider.js');

        $data = $this->getData();
        $this->render('slider', array('data' => $data));
    }

    public function run()
    {

    }

    protected function getData()
    {
        $sql = "SELECT * FROM {{slider}}";
        $command = Yii::app()->db->createCommand($sql);
        $row = $command->queryAll();
        if($row){
            return $row;
        }
    }
}