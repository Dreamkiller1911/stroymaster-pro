<?php
/* @var $this AdvertisingController */
/* @var $model Advertising */



$this->menu=array(
	array('label'=>'List Advertising', 'url'=>array('index')),
	array('label'=>'Create Advertising', 'url'=>array('create')),
	array('label'=>'View Advertising', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Advertising', 'url'=>array('admin')),
);
?>

<?php if(gettype($model) === 'object'):?>
	<?php
	$this->breadcrumbs=array(
			'Профиль'=>array('/user/'),
			$model->getData('id') => ''
	);
	?>
<h3>Обновление реламного блока  <?php echo $model->getData('id'); ?></h3>


<?php $this->renderPartial('_form', array('model'=>$model, 'img'=>$img)); ?>

<?php else:?>
	<?php
	$this->breadcrumbs=array(
			'Профиль'=>array('/user/'),
			'Моя реклама' => ''
	);
	?>
	<?php foreach ($model as $data):?>
		<?php $this->renderPartial('_list', array('data'=>$data)); ?>
	<?php endforeach?>
<?php endif?>
