<?php

/**
 * This is the model class for table "{{checkPhone}}".
 *
 * The followings are the available columns in table '{{checkPhone}}':
 * @property string $id
 * @property integer $init
 * @property string $phone
 * @property integer $code
 */
class CheckPhone extends CActiveRecord
{
	public function tableName()
	{
		return '{{checkPhone}}';
	}

	public function rules()
	{

		return array(
			array('phone, code', 'required'),
			array('init, code', 'numerical', 'integerOnly'=>true),
			array('phone', 'length', 'max'=>20),
			array('id, init, phone, code', 'safe', 'on'=>'search'),
		);
	}
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'init' => 'Init',
			'phone' => 'Phone',
			'code' => 'Code',
		);
	}

	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('init',$this->init);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('code',$this->code);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public static function isInit($phone)
	{
		$data = CheckPhone::model()->find('phone=:phone', array(':phone'=>$phone));
		if($data->init < 1){
			$data->init = 1;
			return $data->save();
		}else{
			return false;
		}
	}

}
