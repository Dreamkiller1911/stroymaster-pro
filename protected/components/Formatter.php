<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 19.05.2016
 * Time: 23:13
 */
class Formatter extends CFormatter
{

    public static function preformPhone($phone)
    {
        return preg_replace(
            array(
                '/-/',
                '/^\+7/',
                '/\+/'
            ),
            array(
                '',
                '8',
                ''
            ), $phone);
    }
}