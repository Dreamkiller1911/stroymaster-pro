<?php

class RegForm extends CFormModel
{
    public $first_name;
    public $second_name;
    public $class;
    public $phone;
    public $email;
    public $password;
    public $repeat_password;


    public function rules()
    {
        $rules =  array(
            array('first_name, second_name, class, email, phone' , 'required'),
            array('email', 'email'),
            array('email', 'checkEmail'),
            array('phone', 'match', 'pattern'=>'/^((8)(-?\d{3}-?)(\d{3}))(-?\d{2})(-?\d{2})$/',
                    'message'=>'Не корректный формат номера'),
            array('phone', 'length', 'min' => 11),
            array('phone', 'checkPhone'),
            array('repeat_password', 'compare', 'compareAttribute' => 'password')
        );

        if(Yii::app()->user->isGuest){
            array_push($rules, array('password, repeat_password', 'required'));
        }

        return $rules;
    }

    public function attributeLabels()
    {
        return array(
            'first_name' => 'Имя',
            'second_name' => 'Фамилия',
            'email' => 'Электронная почта',
            'phone' => 'Номер мобильного телефона',
            'class'=>'Кем вы являетесь на сайте',
            'password' => Yii::app()->user->isGuest? 'Пароль': 'Новый пароль',
            'repeat_password' => 'Повторите пароль',
            'verifyCode' => 'Проверка что вы не робот'
        );
    }
    public function checkEmail($attribute,$params)
    {

        $criteria = new CDbCriteria();
        $criteria->condition = "email=:email";
        $criteria->params = array(':email'=>$this->email);
        if(User::model()->find($criteria)){
            $this->addError('email','E-Mail адресс занят.');
        }
    }
    public function checkPhone($attribute,$params)
    {
        $tmp = str_replace(array('+','-'), '', $this->phone);
        $criteria = new CDbCriteria();
        $criteria->condition = "phone=:phone";
        $criteria->params = array(':phone'=>$tmp);
        if(User::model()->find($criteria)){
            $this->addError('phone','Номер уже занят.');
        }

    }


}