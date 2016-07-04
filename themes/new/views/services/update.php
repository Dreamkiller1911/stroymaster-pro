<?php
/* @var $this ServicesController */
/* @var $model Services */

$this->breadcrumbs = array(
		'Профиль' => '/user',
		'Редактирование резюме' => ''
);
$this->pageTitle = 'Обновление резюме - ' . Yii::app()->name;

$this->widget('application.extensions.fancybox.EFancyBox', array(
				'target'=>'a[rel="gallery"]',
				'mouseEnabled' => false,
				'config'=>array(),
		)
);

?>


<div class="row-fluid">
	<h2>Редактирование резюме</h2>
<?php $this->renderPartial('_crud', array('model' => $model))?>
</div>
