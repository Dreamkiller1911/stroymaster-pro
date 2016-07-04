<?php

/**
 * This is the model class for table "{{img_services}}".
 *
 * The followings are the available columns in table '{{img_services}}':
 * @property string $id
 * @property integer $id_service
 * @property string $url
 * @property string $simple_url
 * @property string $description
 *
 * The followings are the available model relations:
 * @property Services $idService
 */
class ImgServices extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{img_services}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_service, url', 'required'),
			array('id_service', 'numerical', 'integerOnly'=>true),
			array('url', 'length', 'max'=>100),
			array('description', 'length', 'max'=>300),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, id_service, url, description', 'safe', 'on'=>'search'),
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
			'idService' => array(self::BELONGS_TO, 'Services', 'id_service'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'id_service' => 'Id Service',
			'url' => 'Url',
			'description' => 'Description',
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
		$criteria->compare('id_service',$this->id_service);
		$criteria->compare('url',$this->url,true);
		$criteria->compare('description',$this->description,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return ImgServices the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public static function updateOneImg($post, $file){

		if($file['error'] != 0){
			throw new Exception("Вы не выбрали файл");
		}
		if(exif_imagetype($file['tmp_name']) === false){
			throw new Exception("Вы пытаетесь загрузить не изображение");
		}
		if($file['size'] >= 5242880){
			throw new Exception("Файл слишком большого размера");
		}
		$assets = new MyAssetManager();
		$assets->setUserPathOrUrl('ImgServices');

		$img = ImgServices::model()->findByPk($post['id']);
		if(!$img){
			throw new Exception("Файл изображения не найден");
		}
		if(!unlink(Yii::getPathOfAlias('webroot') . $img->url) && !unlink(Yii::getPathOfAlias('webroot') . $img->simple_url)){
			throw new Exception("Не удалось найти файл");
		}
		$dataImg = FileCommander::copyFile(array('url' => $assets->userUrl, 'path' => $assets->userPath) , array('url'=>$file['tmp_name'], 'type'=>$file['type']));
		$img->url = $dataImg['url'];
		$img->simple_url = $dataImg['simple_url'];

		if($img->save()){
			return $img;
		}
	}
	public function updateMyImg($post = array(), $file = array())
	{

		if(count($post) > 0 AND count($file) > 0) {
			$assets = new MyAssetManager();
			$assets->setUserPathOrUrl(get_class($this));

			foreach ($post as $k => $v) {

				$img = ImgServices::model()->findByPk($k);//Доделать создание каталога если не существует
				$img->description = $v['description'];
				if($file['error'][$k] === 0){
					$newFile = $assets->userPath . uniqid() . $file['name'][$k];
					move_uploaded_file($file['tmp_name'][$k],$newFile);
					$img->url = $newFile;
					return $img->save();
				}

			}
		}
	}

	public static function addMyImg($file = array(), $id_service){
		$lFile = count($file['error']);
		$assets = new MyAssetManager();
		$assets->setUserPathOrUrl('ImgServices');
		$lastAddImg = array();
		if(!settype($id_service, 'int')) {
			throw new Exception("Проблема с загрузкой изображения, попробуйте позже");
		}

		if($lFile > User::getMyImgLimit(true)){
			throw new Exception('<h4>Вы пытаетесь загрузить изображений большей, чем вам доступно<br> Ваш лимит фотографий - ' . User::getMyImgLimit() . '<br>Доступно фотографий - ' . User::getMyImgLimit(true) . '</h4>');
		}
		if ( $lFile > 0){
			foreach($file['error'] as $k => $v){
				if($v == UPLOAD_ERR_OK){
					if(exif_imagetype($file['tmp_name'][$k]) === false){
						throw new Exception("<h4>Вы пытаетесь загрузить не изображение</h4>");
					}
					if($file['size'][$k] > 5242880){
						throw new Exception("<h4>Изображение <<" . $file['name'][$k] . ' >> слишком большого размера</h4>');
					};

					$dataImg = FileCommander::copyFile(
							array('url' => $assets->userUrl, 'path' => $assets->userPath),
							array('url'=>$file['tmp_name'][$k], 'type'=>$file['type'][$k]));
					$img = new ImgServices();
					$img->id_service = $id_service;
					$img->url = $dataImg['url'];
					$img->simple_url = $dataImg['simple_url'];
					if($img->save()){
						$lastAddImg[] = $img;
					}
				}else{
					throw new Exception("Вы не выбрали файл");
				}
			}
			return $lastAddImg;
		}else return false;
	}
}
