<?php
/* @var $this AdvertisingController */
/* @var $model Advertising */

$this->breadcrumbs=array(
	'Профиль'=>array('/user/'),
	'Создать рекламный блок' => ''
);

$this->menu=array(
	array('label'=>'List Advertising', 'url'=>array('index')),
	array('label'=>'Manage Advertising', 'url'=>array('admin')),
);
?>
<div class="col-xs-12">
<h3>Новый рекламный блок</h3>

<?php $this->renderPartial('_form', array('model'=>$model, 'img'=>$img)); ?>
</div>
