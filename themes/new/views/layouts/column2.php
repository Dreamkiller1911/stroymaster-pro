<?php $this->beginContent('/layouts/main'); ?>

	<div class="col-sm-3 BlockData hidden-xs">
		<?php $this->Widget('GalleryWorks')?>
	</div>

	<div id="content" class="col-sm-6 col-xs-12">
		<?php echo $content ?>
	</div>


	<div class="col-sm-3 BlockData hidden-xs">
		<?php  $this->widget('Advertisings')?>
	</div>
<?php $this->endContent(); ?>