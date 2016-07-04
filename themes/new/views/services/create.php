<?php
/* @var $this ServicesController */
/* @var $model Services */

$this->breadcrumbs = array(
		'Профиль' => '/user',
		'Создание резюме' => ''
);


?>

<h1>Добавление своего резюме на сайт</h1>

<?php $this->renderPartial('_crud', array('model' => $model))?>