<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 23.03.2016
 * Time: 12:13
 */
class MyAssetManager extends CAssetManager
{

    public $userPath;
    public $userUrl;
    public function setUserPathOrUrl($dirName)
    {
        if (isset($dirName)) {
            $imgPath = $this->getPublishedPath($dirName);
            $imgUrl = $this->getPublishedUrl($dirName);
            if (file_exists($imgPath)) {
                $this->publish($dirName);
            }

                if (!file_exists($imgPath)) {
                    mkdir($imgPath);
                }
                $userPath = '/' . Yii::app()->user->id;

                if (!file_exists($imgPath . $userPath)) {
                    mkdir($imgPath . $userPath);
                }
                if(!file_exists($imgPath . $userPath . '/prev/')){
                    mkdir($imgPath . $userPath . '/prev/');
                }
                $this->userPath = $imgPath . $userPath . '/';
                $this->userUrl = $imgUrl . $userPath . '/';
                return true;

        }
    }


}