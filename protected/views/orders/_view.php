<?php
/* @var $this OrdersController */
/* @var $data Orders */
?>

<div class="view">
	<b><?php echo CHtml::encode($data->getAttributeLabel('text')); ?>:</b>
	<?php echo CHtml::encode($data->text); ?>
	<br />



	<b><?php echo CHtml::encode($data->getAttributeLabel('date_complition')); ?>:</b>
	<?php echo CHtml::encode($data->date_complition); ?>
	<br />
	<b><?php echo CHtml::encode($data->getAttributeLabel('date_create')); ?>:</b>
	<?php echo CHtml::encode(date('Y d m',$data->date_create)); ?>
	<br />
	<b>Разместил</b>
	<?php echo CHtml::encode($data->User->first_name) . ' ' . CHtml::encode($data->User->second_name)?>
	<br>
	<b><?php echo CHtml::encode($data->User->getAttributeLabel('phone')); ?>:</b>
	<?php echo Yii::app()->user->isGuest ? '<i>Вы не зарегестрированны, номера будут недоступны Вам </i>': CHtml::encode($data->User->phone)?>

</div>