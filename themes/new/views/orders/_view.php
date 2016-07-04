<?php
/* @var $this OrdersController */
/* @var $data Orders */

$this->widget('application.extensions.fancybox.EFancyBox', array(
				'target'=>'a[rel]',
		)
);
?>


<div class="row-fluid">
		<div class="col-xs-12 order-view <?php echo $data->status? '': 'complete'?>">

				<div class="row">
					<div class="col-xs-6 text-center">
					<span title="Имя и фамилия заказчика" class="glyphicon glyphicon-user curs-help">
						<?php echo CHtml::decode($data->User->first_name) . ' ' . CHtml::encode($data->User->second_name) ?>
					</span>
						</div>
					<div class="col-xs-6 text-center">
					<span title="Дата создания заказа" class="glyphicon glyphicon-calendar curs-help">
						<?php echo CHtml::decode(date('Y-m-d H-i',strtotime($data->date_create))); ?>
					</span>
					</div>
				</div>

				<div class="row order-text" >
					<div class="col-xs-12 text-left" style="white-space: pre-wrap"><?php echo CHtml::decode($data->text)?></div>
				</div>

				<div class="row items">
					<div class="col-xs-5 text-center" style="opacity: <?php echo $data->status ?>">
					<span title="Номер заказчика" class="glyphicon glyphicon-phone curs-help"></span>
						<?php echo CHtml::decode(Converter::toPhone($data->User->phone, $data->User->id)); ?>
					</div>

					<div class="col-xs-7 text-center ">
						<?php echo CHtml::decode($data->getDate('start'))?>
						<?php echo CHtml::decode($data->getDate('end'))?>
					</div>

				</div>
			<div class="complete" style="display: <?php echo $data->status == 1 ? 'none' : 'block' ?>"></div>

		</div>

</div>
