<?php
    /* @var $this OrdersController */
    /* @var $dataProvider CActiveDataProvider */

    $this->breadcrumbs = array(
        'Все заказы' => '',
    );
    $this->pageTitle = 'Заказы - ' . Yii::app()->name;
    $this->init()->registerMetaTag('заказ на ремонт, найти заказчика, список заказов на ремонт,' .
        ' все заказы в ефремове, ремонт квартир в ефремове', 'keywords');
    $this->init()->registerMEtaTag('Вы мастер и занимаетесь ремонтом квартир, офисов или строительством.' .
        'Тогда регистрируйтесь на сайти получайте доступ к базе заказов.', 'description');

    $this->menu = array(
        array('label' => 'Create Orders', 'url' => array('create')),
        array('label' => 'Manage Orders', 'url' => array('admin')),
    );
    ?>

    <div class="col-sm-12 text-center">
        <div class="row well">
            <h4>Список заказов от пользователей</h4>
        </div>

        <div class="row" id="orders">
            <?php $this->widget('zii.widgets.CListView', array(
                'dataProvider' => $dataProvider,
                'template' => '{items}',
                'itemView' => '_view',
                'enablePagination' => false,
                'enableHistory' => false,
            )); ?>
        </div>
    </div>