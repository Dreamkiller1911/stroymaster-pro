<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 17.04.2016
 * Time: 2:34
 */
class GalleryWorks extends CWidget
{
    public function init()
    {
        $cs = Yii::app()->clientScript;
        $cs->registerCssFile(Yii::app()->theme->baseUrl . '/css/GalleryWorks.css');
        $cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/Services.js');
        $cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/Comments.js');
        $cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/GalleryController.js');

        $data = $this->getDataImg();
        $this->render('galleryWorks', array('data'=>$data));


    }

    protected function getDataImg()
    {
        $imgData = ImgServices::model()->findAll();
        shuffle($imgData);

        return $imgData;
    }
}