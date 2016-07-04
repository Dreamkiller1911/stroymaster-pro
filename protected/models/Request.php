<?php

/**
 * This is the model class for table "{{request}}".
 *
 * The followings are the available columns in table '{{request}}':
 * @property string $id
 * @property string $name
 * @property integer $type
 * @property integer $time
 * @property integer $id_user
 * @property integer $id_service
 * @property integer $id_advt
 * @property integer $positive
 * @property integer $date_processing
 * The followings are the available model relations:
 * @property User $User
 * @property Services $Service
 */
class Request extends CActiveRecord
{
	const TYPE_RESUME_ACTIVATE = 1;
	const TYPE_RESUME_EXTEND = 2;
	const TYPE_USER_DB_ACTIVATE = 3;
	const TYPE_USER_DB_EXTEND = 4;
	const TYPE_SMS_ACTIVATE = 5;
	const TYPE_SMS_EXTEND = 6;
	const TYPE_IMG_LIMIT_ACTIVATE = 7;
	const TYPE_IMG_LIMIT_EXTEND = 8;
	const TYPE_ADVT_ACTIVATE = 9;
	const TYPE_ADVT_EXTEND = 10;

	public function tableName()
	{
		return '{{request}}';
	}
	public function scopes()
	{
		return array(
			'resume' => array(
				'condition'=>'(type=' . $this::TYPE_RESUME_ACTIVATE .
						' OR type=' . $this::TYPE_RESUME_EXTEND .
						') AND (negative != 1 AND positive != 1)',
			),
			'user_db' => array(
					'condition'=>'(type=' . $this::TYPE_USER_DB_ACTIVATE .
							' OR type=' . $this::TYPE_USER_DB_EXTEND .
							') AND (negative != 1 AND positive != 1)',
			),
			'sms' => array(
					'condition'=>'(type=' . $this::TYPE_SMS_ACTIVATE .
							' OR type=' . $this::TYPE_SMS_EXTEND .
							') AND (negative != 1 AND positive != 1)',
			),
			'img_limit' => array(
					'condition'=>'(type=' . $this::TYPE_IMG_LIMIT_ACTIVATE .
							' OR type=' . $this::TYPE_IMG_LIMIT_EXTEND .
							') AND (negative != 1 AND positive != 1)',
			),
			'advt' => array(
					'condition'=>'(type=' . $this::TYPE_ADVT_ACTIVATE .
							' OR type=' . $this::TYPE_ADVT_EXTEND .
							') AND (negative != 1 AND positive != 1)',
			),
		);
	}
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('type', 'required'),
			array('type, id_user, id_service', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>300),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, name, type, id_user, id_service', 'safe', 'on'=>'search'),
		);
	}
	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'User' => array(self::BELONGS_TO, 'User', 'id_user'),
			'Service' => array(self::BELONGS_TO, 'Services', 'id_service'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => 'Name',
			'type' => 'Type',
			'id_user' => 'Id User',
			'id_service' => 'Id Service',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('type',$this->type);
		$criteria->compare('id_user',$this->id_user);
		$criteria->compare('id_service',$this->id_service);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Request the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public static function typeMSG()
	{
		$data = array(
				Request::TYPE_RESUME_ACTIVATE => 'Активация резюме',
				Request::TYPE_RESUME_EXTEND => 'Продление резюме',
				Request::TYPE_USER_DB_ACTIVATE => 'Активация доступа к базе данных',
				Request::TYPE_USER_DB_EXTEND => 'Продление доступа к базе данных',
				Request::TYPE_SMS_ACTIVATE => 'Активация SMS оповещения о заказах',
				Request::TYPE_SMS_EXTEND=>'Продление SMS оповещений о заказах',
				Request::TYPE_IMG_LIMIT_ACTIVATE=>'Ограничение изображений',
				Request::TYPE_IMG_LIMIT_EXTEND=>'',
				Request::TYPE_ADVT_ACTIVATE=>'Активация рекламного блока',
				Request::TYPE_ADVT_EXTEND=>'Продление рекламного блока',
				);
		return $data;
	}
	public static function getPrice($type)
	{
		$cost = Lookup::model()->price()->findAll('code=:code AND type=:type', array(':code'=>$type, ':type'=>'request_code'));
		return $cost[0]->price;
	}
	public function getId()
	{
		if($this->id_service != null){
			return Services::SUFFIX . User::model()->findByPk($this->id_user)->Service->id;
		}
		if($this->id_advt != null){
			return Advertising::SUFFIX . $this->id_advt;
		}
	}

}
