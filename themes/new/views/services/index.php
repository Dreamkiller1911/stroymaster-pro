<?php
/* @var $this ServicesController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs = array(
    'Резюме мастеров' => ''
);
$this->widget('application.extensions.fancybox.EFancyBox', array(
        'target' => 'a[rel]',
    )
);
$this->pageTitle = Yii::app()->name . ' - Главная';
$this->init()->registerMetaTag('ремонт ефремов, ремонт квартир в ефремове, мастер ремонта квартир', 'keywords');
$this->init()->registerMetaTag('Мы предлагаем вам список мастеров. Вы можете ознакомиться с анкетами и работами каждого мастера' .
    'и получить контактную информцию', 'description');


?>
<div id="myModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
     aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="row modal-content col-sm-12">
        </div>
        <div class="row">
            &nbsp;
        </div>
    </div>

</div>
<div class="col-sm-9 col-sm-offset-1 text-center">
    <h3 class="hidden-xs well">Мастера города Ефремов</h3>
</div>
<h4 class="hidden-sm hidden-md hidden-lg">Ниже представлен полный список мастеров города Ефремов</h4>

<div class="col-sm-12" rel="services">
    <?php/*    foreach ($model as $key) {
        $this->renderPartial('_view', array('service' => $key));
    }

    */?>
</div>


