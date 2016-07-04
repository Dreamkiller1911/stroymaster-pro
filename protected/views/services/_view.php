<?php
/* @var $this ServicesController */
/* @var $data Services */

$this->widget('application.extensions.fancybox.EFancyBox', array(
				'target'=>'a[rel]',
				'config'=>array(),
		)
);
?>

<div class="view">
	<h3 class="note">
		<?php echo $data->note?>
	</h3>

	<div class="description">
		<?php echo $data->description?>
	</div>
	<?php foreach($data->imgServices as $key):?>
		<div class="img">

			<a title="<?php echo $key->description?>" rel="gallery<?php echo $data->id?>" href="<?php echo $key->url ?>">
				<img src="<?php echo $key->url ?>" height="50px">
			</a>

		</div>
	<?php endforeach?>
</div>