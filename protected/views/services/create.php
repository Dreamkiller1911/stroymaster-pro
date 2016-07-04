<?php
/* @var $this ServicesController */
/* @var $model Services */

$this->breadcrumbs=array(
	'Все услуги'=>array('index'),
	'Добавить свою',
);


?>

<h1>Добавление своего резюме на сайт</h1>

	<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
		'id'=>'services-form',
		'htmlOptions' => array(
			'enctype' => 'multipart/form-data',
		),
		'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Поля с <span class="required">*</span> обязательные.</p>

	<div class="row">
		<?php echo $form->labelEx($model,'note'); ?>
		<?php echo $form->textField($model,'note',array('size'=>60,'maxlength'=>300)); ?>
		<?php echo $form->error($model,'note'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'description'); ?>
		<?php $this->widget('application.extensions.TheCKEditor.TheCKEditorWidget', array(
			'model' => $model,
			'attribute' => 'description',
			'height'=>'150px',
			'width'=>'70%',
			'toolbarSet'=>"Basic",
			'ckeditor'=>Yii::app()->basePath.'/../ckeditor/ckeditor.php',
			'ckBasePath'=>Yii::app()->baseUrl.'/ckeditor/',
		))?>
		<?php echo $form->error($model,'description'); ?>
	</div>
	<p class="note">Добавьте себе до 5-ти фотографий</p>
	<div class="row">
		<?php $this->widget('application.widgets.imgUpload')?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Добавить' : 'Сохранить'); ?>
	</div>

<?php $this->endWidget(); ?>