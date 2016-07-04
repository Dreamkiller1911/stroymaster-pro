<?php
$this->pageTitle=Yii::app()->name . ' - Вход';
$this->breadcrumbs=array(
	'Форма входа',
);
?>

<h1>Вход</h1>

<p>Пожалуйста, заполните следующую форму с вашими учетными данными для входа:</p>

<div class="form">
<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'login-form',
	'enableAjaxValidation'=>true,
)); ?>

	<p class="note">Поля с <span class="required">*</span> являются обязательными.</p>

	<div class="row">
		<?php echo $form->labelEx($model,'email'); ?>
		<?php echo $form->textField($model,'email'); ?>
		<?php echo $form->error($model,'email'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'password'); ?>
		<?php echo $form->passwordField($model,'password'); ?>
		<?php echo $form->error($model,'password'); ?>

	</div>

	<div class="row rememberMe">
		<?php echo $form->checkBox($model,'rememberMe'); ?>
		<?php echo $form->label($model,'rememberMe'); ?>
		<?php echo $form->error($model,'rememberMe'); ?>
	</div>

	<div class="row submit">
		<?php echo CHtml::submitButton('Войти'); ?>
	</div>

<?php $this->endWidget(); ?>
</div><!-- form -->
