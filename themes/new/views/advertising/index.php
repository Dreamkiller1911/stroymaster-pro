<?php
/* @var $this AdvertisingController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Advertisings',
);

$this->menu=array(
	array('label'=>'Create Advertising', 'url'=>array('create')),
	array('label'=>'Manage Advertising', 'url'=>array('admin')),
);
?>

<h1>Advertisings</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
