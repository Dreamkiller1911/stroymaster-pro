<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 05.05.2016
 * Time: 0:04
 */
class Advertisings extends CWidget
{
    public function init()
    {
        $model = Advertising::model()->active()->findAll();

        $this->render('advertising', array('model'=>$model));
    }
}