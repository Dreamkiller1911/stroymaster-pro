<?php $this->widget('zii.widgets.CMenu',array(
    'items'=>array(
        array('label'=>'Главная', 'url'=>array('/')),
        array('label'=>'Заказы', 'url'=>array('/orders')),
        array('label'=>'Заказать работы', 'url'=>array('/Orders/create')),
        array('label'=>'Обратная связь', 'url'=>array('site/contact')),
        array('label'=>'Регистрация', 'url'=>array('site/reg'), 'visible' => Yii::app()->user->isGuest),
        array('label'=>'Войти', 'url'=>array('site/login'), 'visible'=>Yii::app()->user->isGuest),
        array('label'=>'Выход', 'url'=>array('site/logout'), 'visible'=>!Yii::app()->user->isGuest)
    ),
)); ?>