<?php $this->widget('zii.widgets.CMenu',array(
    'htmlOptions'=>array(
        'class'=>'nav navbar-nav',
        'id'=>'mainMenu',
    ),
    'activeCssClass'=>'active',
    'items'=>array(
        /*array('label'=>'<span class="glyphicon glyphicon-home"> </span>   Главная', 'url'=>array('./'),
            'encodeLabel'=>false, 'itemOptions'=>array('viewFX'=>'item'), 'htmlOptions'=>array('class'=>'nav navbar-nav')),*/
        array('label'=>'<span class="glyphicon glyphicon-th"> </span> Заказы', 'url'=>array('/orders/index'),
            'encodeLabel'=>false, 'itemOptions'=>array('viewFX'=>'item')),
        array('label'=>'<span class="glyphicon glyphicon-plus"> </span> Заказать работы', 'url'=>array('/orders/create'),
            'encodeLabel'=>false, 'itemOptions'=>array('viewFX'=>'item')),
        array('label'=>'<span class="glyphicon glyphicon-envelope"> </span> Обратная связь', 'url'=>array('site/contact'),
            'encodeLabel'=>false, 'itemOptions'=>array('viewFX'=>'item')),
        /*array('label'=>'<span class="glyphicon glyphicon-cog"> </span> Регистрация', 'url'=>array('site/reg'),
            'linkOptions'=>array('id'=>'reg'), 'encodeLabel'=>false, 'itemOptions'=>array('viewFX'=>'item'), 'visible' => Yii::app()->user->isGuest),*/
        array('label'=>'<span class="glyphicon glyphicon-user"> </span> Войти', 'url'=>array('/site/login'),
            'linkOptions'=>array('id'=>'in'),'encodeLabel'=>false, 'itemOptions'=>array('viewFX'=>'item'), 'visible'=>Yii::app()->user->isGuest),
        array('label'=>'<span class="glyphicon glyphicon-off"> </span> Выход', 'url'=>array('site/logout'),
            'encodeLabel'=>false, 'itemOptions'=>array('viewFX'=>'item'), 'visible'=>!Yii::app()->user->isGuest)
    ),
)); ?>