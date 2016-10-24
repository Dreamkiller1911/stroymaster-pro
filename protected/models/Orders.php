<?php

/**
 * This is the model class for table "{{orders}}".
 *
 * The followings are the available columns in table '{{orders}}':
 * @property string $id
 * @property string $text
 * @property integer $date_create
 * @property integer $date_complete
 */
class Orders extends CActiveRecord
{

	public function tableName()
	{
		return '{{orders}}';
	}

	public function rules()
	{
		return array(
			array('text', 'required'),
			/*array('date_create', 'numerical', 'integerOnly'=>true),
			array('id, name, phone, phone2, text, date_create, date_complition', 'safe', 'on'=>'search'),*/
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
				'User' => array(self::BELONGS_TO, 'User', 'id_user'),
		);
	}

	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => 'Имя, Фамилия',
			'phone' => 'Телефон',
			'phone2' => 'Дополнительный номер',
			'text' => 'Описание',
			'date_create' => 'Размещено',
			'date_start' => 'Начало',
			'date_complete' => 'Окончание',
		);
	}

	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('phone',$this->phone);
		$criteria->compare('phone2',$this->phone2);
		$criteria->compare('text',$this->text,true);
		$criteria->compare('date_create',$this->date_create);
		$criteria->compare('date_complete',$this->date_complete);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Orders the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function beforeSave()
	{
		$this->id_user = Yii::app()->user->id;
		$this->date_create = date('Y-m-d H:i:s', time());
		return true;
	}
	public static function getActiveStatus()
	{
		$orders = Orders::model()->active()->findAll('id_user=:id_user', array(':id_user'=>Yii::app()->user->id));
		return count($orders);
	}

	public function getDate($type)
	{
		$del = '</span><span class="glyphicon glyphicon-option-vertical"></span>';
		$d_str = true;
		$d_end = true;
		if($this->date_start == '1970-01-01' || $this->date_start == '0000-00-00') $d_str = false;
		if($this->date_complete === '1970-01-01' || $this->date_complete === '0000-00-00') $d_end = false;
		if(!$d_str || !$d_end) $del = '';
		if($type === 'start'){
			if ($this->date_start == '1970-01-01' || $this->date_start == '0000-00-00') {
				return '';
			} else{
				$pattern = '<span class="glyphicon glyphicon-share"></span> '.
						'<span class="curs-help" title="Дата начала работ">'
						. $this->date_start . $del;
				return $pattern;
			}
		}else if($type === 'end') {
			if ($this->date_complete === '1970-01-01' || $this->date_complete === '0000-00-00') {
				return '';
			} else {
				$pattern = '<span class="curs-help" title="Дата окнчиния работ"> ' . $this->date_complete . ' </span>'.
						' <span  class="glyphicon glyphicon-check"></span>';
				return $pattern;
			}
		}
	}
}
