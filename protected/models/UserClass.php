<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 23.03.2016
 * Time: 15:21
 */
class UserClass extends CActiveRecord
{
    public function tableName()
    {
        return '{{user_class}}';
    }
    public function rules()
    {
        return array();
    }

}