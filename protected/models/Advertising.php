<?php

/**
 * This is the model class for table "{{advt}}".
 *
 * The followings are the available columns in table '{{advt}}':
 * @property string $id
 * @property integer $id_user
 * @property string $header
 * @property string $url
 * @property string $address
 * @property integer $phone
 * @property integer $alt_phone
 * @property integer $status
 * @property string $date_create
 * @property string $date_update
 * @property string $date_activate
 * @property string $date_end
 */
class Advertising extends CActiveRecord
{

	const STATUS_ACTIVE = '1';
	const STATUS_ANACTIVE = '0';
	const DATE_NULL = '0000-00-00 00:00:00';
	const SUFFIX = 'ADVT_';

	public function tableName()
	{
		return '{{advt}}';
	}

	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('header ', 'required'),
			array('id_user', 'numerical', 'integerOnly'=>true),
			array('address', 'length', 'max'=>300),
			array('phone, alt_phone', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, id_user, header, url, address, date_create, date_update, date_activate, date_end', 'safe', 'on'=>'search'),
		);
	}
	public function scopes()
	{
		return array(
				'active'=>array(
						'condition'=>'status=1',
				)
		);
	}
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
				'Img' => array(self::HAS_MANY, 'ImgAdvt', 'advt_id'),
		);
	}

	public function attributeLabels()
	{
		return array(
			'id' => 'UID',
			'id_user' => 'Номер пользователя',
			'header' => 'Название (шапка)',
			'address' => 'Адресс магазина',
			'phone' => 'Номер телефона',
			'alt_phone' => 'Дополнтиельный номер',
			'status' => 'Статус',
			'date_create' => 'Дата создания',
			'date_update' => 'Последнее обновление',
			'date_activate' => 'Дата активации',
			'date_end' => 'Дата окончания',
		);
	}

	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('id_user',$this->id_user);
		$criteria->compare('header',$this->header,true);
		$criteria->compare('url',$this->url,true);
		$criteria->compare('address',$this->address,true);
		$criteria->compare('date_create',$this->date_create,true);
		$criteria->compare('date_update',$this->date_update,true);
		$criteria->compare('date_activate',$this->date_activate,true);
		$criteria->compare('date_end',$this->date_end,true);

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
			$this->id_user = Yii::app()->user->id;
			$this->date_create = date('Y-m-d H:i:s', time());
		}else{
			$this->date_update = date('Y-m-d H:i:s', time());
		}
		$this->phone = str_replace('-', '', $this->phone);

		$this->alt_phone = str_replace('-', '', $this->alt_phone);

		return true;
	}
	public function getData($attr)
	{
		switch($attr){
			case 'id':
				if($this->id != null && $this->id != ''){
					return 'ADVT_' . $this->id;
				}else false;
				break;
			case 'date_create':
				if($this->date_create != $this::DATE_NULL){
					return Yii::app()->dateFormatter->format('d MMMM, yyyy', strtotime($this->date_create));
				}else return false;
			break;
			case 'date_update':
				return Yii::app()->dateFormatter->format('d MMMM, yyyy', strtotime($this->date_update));
			break;
			case 'date_end':
				if($this->date_end != $this::DATE_NULL){
					return Yii::app()->dateFormatter->format('d MMMM, yyyy', strtotime($this->date_end));
				}else{
					return '<span class="text-danger">Не оплачено</span>';
				}
			break;
			case 'phone':
				if ($this->phone != false) {
					return preg_replace('/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/', '${1}-${2}-${3}-${4}-${5}', $this->phone);
				}else{
					return false;
				}
			break;
			case 'alt_phone':
				if ($this->alt_phone != false) {
					return preg_replace('/(\d{1})(\d{2})(\d{2})/', '${1}-${2}-${3}', $this->alt_phone);
				}else{
					return false;
				}
			break;
			case 'address':
				if($this->address != ''){
					return $this->address;
				}else
					return false;
			break;

			default:
				return 'Не существуюший атрибут - ' . $attr;

		}
		return true;
	}
	public function dateEndProgress()
	{
		$criteria = new CDbCriteria();
		$criteria->condition = 'id_advt=:id_advt AND type=:type';
		$criteria->order = 'date_processing DESC';
		$criteria->params = array(':id_advt'=>$this->id, ':type'=>Request::TYPE_ADVT_ACTIVATE);

		$request = Request::model()->find($criteria);
		$dStart = $request->date_processing;
		$dEnd = strtotime($this->date_end);
		$rate = ($dEnd - $dStart) / 100;
		$percent = round(($dEnd - time()) / $rate, 2, PHP_ROUND_HALF_DOWN);
		$color = '#009933';
		if($percent > 50 && $percent < 75){
			$color = '#e0d872';
		}
		if($percent > 10 && $percent < 50){
			$color = '#f18103';
		}
		if($percent < 10){
			$color = 'red';
		}


		$progress = '<div class="curs-help" title="Закончится - ' . $this->getData("date_end") . '" style="width: ' . $percent . '%; background: ' . $color . '; height: 5px"></div>';
		return $progress;
	}
}
