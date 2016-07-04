<?php

/**
 * This is the model class for table "{{img_advt}}".
 *
 * The followings are the available columns in table '{{img_advt}}':
 * @property string $id
 * @property integer $advt_id
 * @property string $url
 * @property string $simple_url
 */
class ImgAdvt extends CActiveRecord
{
	public function tableName()
	{
		return '{{img_advt}}';
	}
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('advt_id, url', 'required'),
			array('advt_id', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, advt_id, url', 'safe', 'on'=>'search'),
		);
	}
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
				'Advt' => array(self::BELONGS_TO, 'Advt', 'advt_id'),
		);
	}
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'advt_id' => 'Номер рекламы',
			'url' => 'Файл изображения',
		);
	}
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('advt_id',$this->advt_id);
		$criteria->compare('url',$this->url,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public static function addMyImg($file = array(), $id_advt){

		$lFile = count($file['error']);
		if($id_advt === null){
			return false;
		}

		$assets = new MyAssetManager();

		$assets->setUserPathOrUrl('ImgAdvt');

		$lastAddImg = array();
		if(!settype($id_advt, 'int')) {
			throw new Exception("Проблема с загрузкой изображения, попробуйте позже");
		}

		if ( $lFile > 0){
			foreach($file['error'] as $k => $v){
				if($v == UPLOAD_ERR_OK){
					if(exif_imagetype($file['tmp_name'][$k]) === false){
						throw new Exception("<h4>Вы пытаетесь загрузить не изображение</h4>");
					}
					if($file['size'][$k] > 5242880*2){
						throw new Exception("<h4>Изображение <<" . $file['name'][$k] . ' >> слишком большого размера</h4>');
					};
					$dataImg = FileCommander::copyFile(
							array('url' => $assets->userUrl, 'path' => $assets->userPath),
							array('url'=>$file['tmp_name'][$k], 'type'=>$file['type'][$k]));
					$img = new ImgAdvt();
					$img->advt_id = $id_advt;
					$img->url = $dataImg['url'];
					$img->simple_url = $dataImg['simple_url'];
					if($img->save()){
						$lastAddImg[] = $img;
					}else return false;
				}else{
					throw new Exception("Вы не выбрали файл");
				}
			}
			return $lastAddImg;
		}else {
			return false;
		}
	}
	public function updateOne($file)
	{
		$lFile = count($file['error']);
		if($this->id === null && $this->id === ''){
			return false;
		}
		$assets = new MyAssetManager();
		$assets->setUserPathOrUrl('ImgAdvt');
		$lastAddImg = array();
		if(!settype($id_advt, 'int')) {
			throw new Exception("Проблема с загрузкой изображения, попробуйте позже");
		}
		if ( $lFile > 0){
			foreach($file['error'] as $k => $v){
				if($v == UPLOAD_ERR_OK){
					if(exif_imagetype($file['tmp_name'][$k]) === false){
						throw new Exception("<h4>Вы пытаетесь загрузить не изображение</h4>");
					}
					if($file['size'][$k] > 5242880*2){
						throw new Exception("<h4>Изображение <<" . $file['name'][$k] . ' >> слишком большого размера</h4>');
					};
					$dataImg = FileCommander::copyFile(
							array('url' => $assets->userUrl, 'path' => $assets->userPath),
							array('url'=>$file['tmp_name'][$k], 'type'=>$file['type'][$k]));
					if(file_exists(Yii::getPathOfAlias('webroot') . $this->url) && file_exists(Yii::getPathOfAlias('webroot') . $this->simple_url)) {
						if (!unlink(Yii::getPathOfAlias('webroot') . $this->url) || !unlink(Yii::getPathOfAlias('webroot') . $this->simple_url)) {
							return false;
						}
					}

					$this->url = $dataImg['url'];
					$this->simple_url = $dataImg['simple_url'];
					if($this->save()){
						$lastAddImg[] = $this;
					}else return false;
				}else{
					throw new Exception("Вы не выбрали файл");
				}
			}
			return $lastAddImg;
		}else {
			return false;
		}
	}
}
