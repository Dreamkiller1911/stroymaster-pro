<?php $this->widget('zii.widgets.CMenu',array(
    'htmlOptions'=>array(
        'class'=>'nav navbar-nav',
        'id'=>'mainMenu',
    ),
    'activeCssClass'=>'active',
    'items'=>array(
//        array('label'=>'<span class="glyphicon glyphicon-home"> </span>   Главная', 'url'=>array('./'), 'encodeLabel'=>false, 'htmlOptions'=>array('class'=>'nav navbar-nav')),
        array('label'=>'<span class="glyphicon glyphicon-th"> </span> Заказы', 'url'=>array('/orders/index'), 'encodeLabel'=>false),
        array('label'=>'<span class="glyphicon glyphicon-plus"> </span> Заказать работы', 'url'=>array('/orders/create'), 'encodeLabel'=>false),
        array('label'=>'<span class="glyphicon glyphicon-envelope"> </span> Обратная связь', 'url'=>array('site/contact'), 'encodeLabel'=>false),
        array('label'=>'<span class="glyphicon glyphicon-cog"> </span> Регистрация', 'url'=>array('site/reg'), 'linkOptions'=>array('id'=>'reg'), 'encodeLabel'=>false, 'visible' => Yii::app()->user->isGuest),
        array('label'=>'<span class="glyphicon glyphicon-user"> </span> Войти', 'url'=>array('/site/login') ,'linkOptions'=>array('id'=>'in'),'encodeLabel'=>false, 'visible'=>Yii::app()->user->isGuest),
        array('label'=>'<span class="glyphicon glyphicon-off"> </span> Выход', 'url'=>array('site/logout'), 'encodeLabel'=>false, 'visible'=>!Yii::app()->user->isGuest)
    ),
)); ?>

<!--<ul class="nav nav-tabs" id="mainMenu">

    <li class="active"><a href="/"><span class="glyphicon glyphicon-home"></span> Главная</a></li>
    <li><a href="/orders/create"><span class="glyphicon glyphicon-plus"></span> Оставить заказ</a></li>
    <li><a href="/orders"><span class="glyphicon glyphicon-th-list"></span> Заказы</a></li>
    <li><a href="/site/contact"><span class="glyphicon glyphicon-envelope"></span> Обратная связь</a></li>
    <li>
        <div id="loginForm">
            <form class="form-inline">
                <input type="text" class="form-control btn-sm" name="login"
                       placeholder="Email или номер телефона">
                <input type="password" class="form-control" name="login" placeholder="Пароль">

            </form>
        </div>
    </li>

    <li id="in"><a href="#"><span class="glyphicon glyphicon-lock"></span> Войти</a></li>

</ul>-->