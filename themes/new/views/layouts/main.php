<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $this->pageTitle ?></title>
    <link href="<?php echo Yii::app()->theme->baseUrl ?>/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo Yii::app()->theme->baseUrl ?>/css/main.css" rel="stylesheet">
    <link href="<?php echo Yii::app()->theme->baseUrl ?>/css/form.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div class="container"><!--Контейнер-->

    <!-- Блок меню начало-->
    <div class="row" style="height: 50px">
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="height: 30px;">
            <div class="container-fluid" id="homeBar">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a StartCtrl="MainMenu_homeLink" class="navbar-brand" href="/"><span class="glyphicon glyphicon-home"></span> Stroymaster-pro</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                </div>
            </div>
        </nav>
    </div>
    <!-- Блок меню конец-->

    <!-- Блок с текстом сайта начало-->
    <div class="row">
        <div class=" col-sm-12 col-sm-offset-0 hidden-xs " id="logoTitle">
            <div class="row-fluid">
                <h3 style="font-weight: 900">Заказ ремонтных и строительных услуг в г.Ефремов</h3>
            </div>
            <div class="row-fluid">
                <span>Единая база мастеров, заказчиков и стротиельных магазинов</span>
            </div>
        </div>
        <div class="hidden-sm hidden-md hidden-lg col-xs-6 col-xs-offset-6" id="logoTitleMobile">
            <p class="text-right">
            <h4>Заказ ремонтных и строительных услуг в г.Ефремов</h4>

            <p>
        </div>
    </div>
    <!-- Блок с текстом сайта конец-->

    <!-- Блок слайдер начало-->
    <div class="row">
        <div class="col-sm-2 hidden-xs" id="l_logo">
        </div>

        <div class="col-sm-8 col-xs-12">
            <?php $this->widget('Slider') ?>
        </div>
        <div class="col-sm-2 hidden-xs" id="imgMan">
        </div>
    </div>
    <!-- Блок слайдер конец-->

    <!-- Блок меню пользователя начало-->
    <?php if (!Yii::app()->user->isGuest): ?>
        <div class="row-fluid" id="userMenu">
            <div class="col-xs-1"></div>
            <div class="col-xs-10" id="nav">
                <?php require_once(__DIR__ . '/usermenu.php'); ?>
            </div>
            <div class="col-xs-1"></div>
        </div>
        <div class="row-fluid" id="newMenu"></div>
    <?php endif ?>
    <!-- Блок меню пользователя конец-->
</div>

<!-- Блок меню контент начло-->
<div class="container-fluid">
    <?php echo $content ?>
</div>
<!-- Блок меню контент конец-->
<br><br>

<div class="container-fluid">
    <div class="row footer small">
        <div class="col-sm-4 col-sm-offset-4 text-center">
            Авторские права &copy; <?php /*echo date('Y'); */ ?> Stroymaster-pro.<br/>
            <?php /*echo Yii::powered(); */ ?><br>
            Разработчик <br>
            Дизайн
        </div>
    </div>
</div>

<script src="<?php echo Yii::app()->theme->baseUrl ?>/js/main.js"></script>
<script src="<?php echo Yii::app()->theme->baseUrl ?>/bootstrap/js/bootstrap.js"></script>
</body>
</html>