<?php
/* @var $this ServicesController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Резюмэ мастеров',
);
$this->pageTitle = Yii::app()->name . ' - Список мастеров г. Ефремов';

?>

<h2>Ниже представлен полный список мастеров города Ефремов.</h2>
<?php $cs =Yii::app()->clientScript;
$cs->registerCoreScript('jquery');
?>
<script>
	window.onbeforeunload = function(){alert(123)};
</script>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
