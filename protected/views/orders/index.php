<?php
/* @var $this OrdersController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Все заказы',
);

$this->menu=array(
	array('label'=>'Create Orders', 'url'=>array('create')),
	array('label'=>'Manage Orders', 'url'=>array('admin')),
);
?>

<h1>Список заказов на услуги ремонта</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
