<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 29.03.2016
 * Time: 19:31
 */
class imgUpload extends CWidget
{
    public function init()
    {
        $cs = Yii::app()->clientScript;
        $cs->registerCoreScript('jquery');
        $cs->registerScriptFile(Yii::app()->request->baseUrl . '/js/imgFilesUploader.js');



        $this->render('imgList');



    }

    public function run()
    {

    }

    protected function builderInputs()
    {

    }
}