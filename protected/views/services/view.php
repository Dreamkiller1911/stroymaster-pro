<?php
/* @var $this ServicesController */
/* @var $model Services */

$this->breadcrumbs=array(
	'Все услуги'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List Services', 'url'=>array('index')),
	array('label'=>'Create Services', 'url'=>array('create')),
	array('label'=>'Update Services', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Services', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Services', 'url'=>array('admin')),
);
?>

<h1>Вы смотрите резюме мастера - <?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'note',
		'description',
		'last_update',
	),
)); ?>
