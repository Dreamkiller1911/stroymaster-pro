<?php

/**
 * The followings are the available columns in table 'tbl_user':
 * @property integer $id
 * @property string $username
 * @property string $password
 * @property integer $phone
 * @property integer $phone_valid
 * @property string $email
 * @property integer $class
 * @property integer $email_valid
 * @property string $profile
 * @property integer $phone_read
 * @property string $phone_read_date
 */
class User extends CActiveRecord
{
	public $confirm_password;
	const MASTER = '0';
	const VENDOR = '1';
	const CLIENT = '2';
	const ADMIN = '3';
	const CLIENT_DATA_DISABLED = 0;
	const CLIENT_DATA_ACTIVE = 1;
	const CLIENT_SMS_DISABLED = 0;
	const CLIENT_SMS_ACTIVE = 1;
	const CLIENT_IMG_ACTIVATE = 10;
	const CLIENT_IMG_DISABLED = 5;

	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return '{{user}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */

	public function rules()
	{
		$rules =  array(
			array('first_name, second_name, class, phone, password', 'required'),
			array('phone', 'checkPhone'),
			array('email', 'email'),
			array('email', 'checkEmail'),
			array('password', 'match', 'pattern'=>'/[а-я]+/iu', 'not'=>true, 'message'=>'Русские бквы запрещены'),
			array('password, email', 'length', 'max'=>128),
			array('profile, phone_valid, phone_read, phone_read_date', 'safe'),
		);
		if(!$this->isNewRecord){

			array_push($rules, array('confirm_password', 'compare', 'compareAttribute'=>'password', 'message'=>'Пароль должен быть повторен в точности.'));

		}
		return $rules;
	}

	public function checkEmail($attribute,$params)
	{

		$criteria = new CDbCriteria();
		$criteria->condition = "email=:email AND email!=:myEmail";
		$criteria->params = array(':email'=>$this->email, ':myEmail'=>User::model()->findByPk(Yii::app()->user->id)->email);
		if(User::model()->find($criteria) && $this->email != ''){
			$this->addError('email','E-Mail адресс занят.');
		}
	}
	public function checkPhone($attribute,$params)
	{
		$tmp = str_replace(array('+','-'), '', $this->phone);
		$pattern = array('/\w/');
		$criteria = new CDbCriteria();
		$criteria->condition = "phone=:phone AND phone!=:myPhone";
		$criteria->params = array(':phone'=>$tmp, ':myPhone'=>User::model()->findByPk(Yii::app()->user->id)->phone);
		if(User::model()->find($criteria)){
			$this->addError('phone','Номер телефона ' . $this->getData('phone') . ' уже занят.');
		}
		if(preg_match('/\D/', $tmp) || strlen($tmp) != 11){
			$this->addError('phone','Не верный формат номера');
		}

	}

	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'posts' => array(self::HAS_MANY, 'Post', 'author_id'),
			'Service' => array(self::HAS_ONE, 'Services', 'id_user'),
			'Advt'=>array(self::HAS_MANY, 'Advertising', 'id_user'),
			'Orders' => array(self::HAS_MANY, 'Orders', 'id_user'),
			'Class' => array(self::BELONGS_TO, 'UserClass', 'class'),
		);
	}

	public function attributeLabels()
	{
		return array(
			'id' => 'Id',
			'first_name' => 'Имя',
			'second_name' => 'Фамилия',
			'password' => 'Пароль',
			'confirm_password' => 'Повторите пароль',
			'email' => 'Электронный адресс',
			'phone' => 'Номер телефона',
			'profile' => 'Profile',
		);
	}

	public function validatePassword($password)
	{
		return CPasswordHelper::verifyPassword($password,$this->password);
	}


	public function hashPassword($password)
	{
		return CPasswordHelper::hashPassword($password);
	}


	public function beforeSave()
	{
		if($this->isNewRecord){
			$this->date_registration = date('Y-m-d', time());
			$this->password = $this->hashPassword($this->password);
		}else{
			if($this->password != $this->model()->findByPk($this->id)->password){
				$this->password = $this->hashPassword($this->password);
			}
		}
		$this->phone = str_replace(array('+','-'), '', $this->phone);
		return true;
	}

	public function getData($attr)
	{
		switch($attr){
			case 'phone':
				return preg_replace('/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/', '${1}-${2}-${3}-${4}-${5}', $this->phone);
			break;
			case 'phone_read_date':
				return Yii::app()->dateFormatter->format('d MMMM yyyy', $this->phone_read_date);
			break;
			case 'phone_status':
				if($this->phone_valid){
					return '&nbsp;<span title="Номер подтвержден" class="tlp glyphicon glyphicon-check text-success curs-help"></span>';
				}else{
					return '&nbsp;<span title="Не подтвержден" class="tlp glyphicon glyphicon-ban-circle text-danger curs-help"></span>';
				}
			break;
			case 'email_status':
				if($this->email_valid){
					return '&nbsp;<span title="Почтовый адрес подтвержден" class="tlp glyphicon glyphicon-check text-success curs-help"></span>';
				}else{
					return '&nbsp;<span title="Не подтвержден" class="tlp glyphicon glyphicon-ban-circle text-danger curs-help"></span>';
				}
			break;
			case 'email':
				if(strlen($this->email) > 18){
					$suffix = substr($this->email, strpos($this->email, '@'), strlen($this->email));
					$n = 18 - strlen($suffix) - 3;

					$prefix = substr($this->email, 0, $n);
					return $prefix . '...' . $suffix;
				}else{
					return $this->email;
				}
				break;
		}
	}
	public function safePassword()
	{
		$this->confirm_password = $this->password;
		return true;
	}
	public static function issetService()
	{
		$criteria = new CDbCriteria(array(
			'condition' => 'id_user=:id_user',
			'params'=>array(
				'id_user'=>Yii::app()->user->id,
			),
		));
		if(Services::model()->findAll($criteria)){
			return true;
		}else return false;

	}
	public static function isAdvt()
	{
		$criteria = new CDbCriteria(array(
				'condition' => 'id_user=:id_user',
				'params'=>array(
						'id_user'=>Yii::app()->user->id,
				),
		));
		if(Advertising::model()->findAll($criteria)){
			return true;
		}else return false;
	}

	public static function getMyImgLimit($balance = null)
	{
		$user = User::model()->findByPk(Yii::app()->user->id);
		$limitImg = $user->Service->img_limit;
		$currentImg = count($user->Service->imgServices);

		if($balance != null){
			return $limitImg - $currentImg;
		}else{
			return $limitImg;
		}

	}
	public static function isMaster()
	{
		$user = User::model()->findByPk(Yii::app()->user->id);
		$class = $user->class;
		if($class != User::MASTER){
			return true;
		}else return false;
	}
	public static function isClient()
	{
		$user = User::model()->findByPk(Yii::app()->user->id);
		$class = $user->class;
		if($class != User::CLIENT){
			return true;
		}else return false;
	}
	public static function getClass()
	{
		$user = User::model()->findByPk(Yii::app()->user->id);
		return $user->class;
	}

	public static function isVewPhone($id_user = null)
	{
		$criteria = '';
		if($id_user != null){
			if($id_user == Yii::app()->user->id){
				$criteria = true;
			}
		}
		$user = User::model()->findByPk(Yii::app()->user->id);
		$viewPhone = $user->phone_read;
		if($viewPhone == User::CLIENT_DATA_ACTIVE || $user->class == User::ADMIN || $criteria){
			return true;
		}else return false;

	}
}
