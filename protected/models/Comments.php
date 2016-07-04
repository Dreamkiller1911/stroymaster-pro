<?php

/**
 * This is the model class for table "{{comments}}".
 *
 * The followings are the available columns in table '{{comments}}':
 * @property integer $id
 * @property integer $user_id
 * @property string $first_name
 * @property string $email
 * @property integer $service_id
 * @property integer $date_create
 * @property integer $last_update
 * @property string $text

 *
 * The followings are the available model relations:
 * @property Services $service
 * @property User $user
 */
class Comments extends CActiveRecord
{
	public function tableName()
	{
		return '{{comments}}';
	}
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('text', 'required', 'message'=>'Введите комментарий'),
			array('service_id', 'required'),
			array('first_name, email', 'checkOnUser'),
			array('email', 'email', 'message'=>'Не корректный E-Mail адресс'),
			/*array('user_id, service_id, date_create, last_update', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.

			array('id, user_id, service_id, date_create, last_update, text', 'safe', 'on'=>'search'),*/
		);
	}
	public function checkOnUser($attribute,$params)
	{
		if (Yii::app()->user->isGuest) {
			if($this->$attribute === '' || $this->$attribute === null) {
				$this->addError($attribute, 'Введите ' . $this->getAttributeLabel($attribute) . '');
			}
		}else{
			$this->user_id = Yii::app()->user->id;
		}
		return true;
	}
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'service' => array(self::BELONGS_TO, 'Services', 'service_id'),
			'user' => array(self::BELONGS_TO, 'User', 'user_id'),
		);
	}
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'user_id' => 'User',
			'first_name' => 'Имя',
			'service_id' => 'Service',
			'date_create' => 'Date Create',
			'last_update' => 'Last Update',
			'text' => 'Текст комментария',
			'email'=>'E-Mail',
			'captcha' => 'captcha'
		);
	}
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('service_id',$this->service_id);
		$criteria->compare('date_create',$this->date_create);
		$criteria->compare('last_update',$this->last_update);
		$criteria->compare('text',$this->text,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function beforeSave()
	{
		if($this->isNewRecord){
			$this->date_create = date('Y-d-m H:i:s', time());
		}
		return true;
	}
	public function isOwner($id)
	{
		if($this->user_id === $id){
			return 'owner';
		}else return false;
	}
}
