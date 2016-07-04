<?php
/* @var $this AdvertisingController */
/* @var $model Advertising */

$this->breadcrumbs=array(
	'Advertisings'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Advertising', 'url'=>array('index')),
	array('label'=>'Create Advertising', 'url'=>array('create')),
	array('label'=>'View Advertising', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Advertising', 'url'=>array('admin')),
);
?>

<h1>Update Advertising <?php echo $model->id; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>