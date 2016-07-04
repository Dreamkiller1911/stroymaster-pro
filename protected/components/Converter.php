<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 12.04.2016
 * Time: 21:41
 */
class Converter extends CComponent
{
    public static function phoneTo()//Конвертирует номер с тире, просто в строку
    {

    }
    public static function toPhone($phone, $id_user = null)//@todo Конвертирует номер из строки, в номер с тире
    {
        if(mb_strlen($phone) == 11) {
            if(User::isVewPhone($id_user)) {
                $newPhone = preg_replace('/^(\d{1})(\d{3})(\d{3})(\d{2})/', '$1-$2-$3-$4-', $phone);
            }else {
                $replacment = 'Вам не доступен номер <span title="Необходиму оплатить опцию ~Доступа к базе данных заказчиков~ " class="glyphicon glyphicon-asterisk text-danger"></span>';
                $newPhone = preg_replace('/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/',$replacment, $phone);
            }
        }
        return $newPhone;

    }

}