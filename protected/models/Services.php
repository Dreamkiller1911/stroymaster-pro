<?php

/**
 * This is the model class for table "{{services}}".
 *
 * The followings are the available columns in table '{{services}}':
 * @property integer $id
 * @property integer $id_user
 * @property string $note
 * @property string $description
 * @property integer $date_create
 * @property integer $last_update
 * @property integer $img_limit
 * @property string $img_time_end
 * @property integer $status
 * @property integer $views
 *
 * The followings are the available model relations:
 * @property ImgServices[] $imgServices
 * @property User $idUser
 */
class Services extends CActiveRecord
{
	const STATUS_ANACTIVE = 0;
	const STATUS_ACTIVE = 1;
	const STATUS_LOCKED = 2;
	const DATE_NULL = '0000-00-00';
	const SUFFIX = 'SRV_';

	public function tableName()
	{
		return '{{services}}';
	}
	public function rules()
	{
		return array(
			array('note, description', 'required'),
			array('note', 'length', 'max'=>300),
			array('id, id_user, note, description, date_create, last_update', 'safe', 'on'=>'search'),
		);
	}
	public function relations()
	{
		return array(
			'comments' => array(self::HAS_MANY, 'Comments', 'service_id'),
			'imgServices' => array(self::HAS_MANY, 'ImgServices', 'id_service'),
			'idUser' => array(self::BELONGS_TO, 'User', 'id_user'),
		);
	}
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'id_user' => 'Id пользователя',
			'note' => 'Название',
			'description' => 'Текст резюме',
			'date_create' => 'Дата создания',
			'last_update' => 'Последнее обновление',
		);
	}
	public function search()
	{
		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('id_user',$this->id_user);
		$criteria->compare('note',$this->note,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('date_create',$this->date_create);
		$criteria->compare('last_update',$this->last_update);

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
		if($this->isNewRecord) {
			$this->id_user = Yii::app()->user->id;
			$this->date_create = date('Y-m-d', time());
			$this->last_update = date('Y-m-d', time());
		}else {
			$this->last_update = date('Y-m-d', time());
		}
		return true;
	}
	public static function idOfUser()
	{
		$criteria = new CDbCriteria();
		$criteria->select = 'id';
		$criteria->condition = 'id_user=:id_user';
		$criteria->params = array(':id_user'=>Yii::app()->user->id);
		return Services::model()->find($criteria)->id;
	}
	public function getData($params)
	{
		switch($params){
			case 'last_update':
				if($this->last_update != self::DATE_NULL) {
					return Yii::app()->dateFormatter->format('d MMMM yyyy', strtotime($this->last_update));
				}
			break;
			case 'date_create':
				if($this->date_create != self::DATE_NULL) {
					return Yii::app()->dateFormatter->format('d MMMM yyyy', strtotime($this->date_create));
				}
			break;
			case 'end_time':
				if($this->end_time != self::DATE_NULL) {
					return Yii::app()->dateFormatter->format('d MMMM yyyy', strtotime($this->end_time));
				}
		}
	}
	public function getDateCreate()
	{
		if($this->date_create != self::DATE_NULL){
			return Yii::app()->dateFormatter->format('d MMMM yyyy', strtotime($this->date_create));
		}else {
			return false;
		}
	}
}
