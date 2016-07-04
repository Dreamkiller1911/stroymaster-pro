<?php
/* @var $this ServicesController */
/* @var $model Services */

$this->breadcrumbs=array(
	'Все услуги'=>array('index'),
	'Мое резюме',
	'Изменить',
);

$this->widget('application.extensions.fancybox.EFancyBox', array(
				'target'=>'a[rel=gallery]',
				'config'=>array(),
		)
);

?>

<h1>Обновление услуги <?php echo $model->id; ?></h1>

<div class="form">

	<?php $form=$this->beginWidget('CActiveForm', array(
			'id'=>'services-form',
		// Please note: When you enable ajax validation, make sure the corresponding
		// controller action is handling ajax validation correctly.
		// There is a call to performAjaxValidation() commented in generated controller code.
		// See class documentation of CActiveForm for details on this.
			'enableAjaxValidation'=>false,
			'htmlOptions' => array(
				'enctype' => 'multipart/form-data',
			)
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
				'height'=>'200px',
				'width'=>'70%',
				'toolbarSet'=>"Basic",
				'ckeditor'=>Yii::app()->basePath.'/../ckeditor/ckeditor.php',
				'ckBasePath'=>Yii::app()->baseUrl.'/ckeditor/',
		))?>
		<?php echo $form->error($model,'description'); ?>
	</div>
	<div class="row">
		<hr>
		<input id="showMyImg" type="button" value="Скрыть">
		<div id="imgList">
		<?php $this->renderPartial('_imgList', array('model' => $model))?>
		</div>
	</div>

	<?php if(count($model->imgServices) <   5 ):?>

		<div id="recImg">
			<hr>
			<p>Вы можете добавить еще фотографий -  (<span id="numOst"><?php print_r(5 - count($model->imgServices))?></span>шт.) </p>
			<div class="row">
				<input onchange="myAddImg(this, <?php echo $model->id?>, this)" class="myImg" type="file" name="img" multiple>
			</div>
		</div>

		<?php else:?>
		<div id="recImg" style="display: none">
			<hr>
			<p>Вы можете добавить еще фотографий -  (<span id="numOst"><?php print_r(5 - count($model->imgServices))?></span>шт.) </p>
			<div class="row">
				<input onchange="myAddImg(this, <?php echo $model->id?>)" class="myImg" type="file" name="img" multiple>
			</div>
		</div>

	<?php endif;?>

	<?php $this->endWidget(); ?>

</div><!-- form -->