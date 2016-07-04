<?php
$this->breadcrumbs = array(
    'Настройки' => '/user/settings/',
    'Подтверждение телефона' => '',
)
?>
<div class="col-sm-8 col-sm-offset-2 well">
    <div class="row text-center "><h4>Подтверждение номера <span
                class="text-info"><?php echo $user->getData('phone') ?></span></h4></div>
    <div class="row text-center"><h4>&nbsp;<?php echo Yii::app()->user->getFlash('error') ?></h4></div>

    <div class="row text-center">
        <form method="post" role="form" class="form-inline">
            <div class="form-group">
                <input maxlength="4" name="code" class="form-control" type="text" placeholder="Код подтверждения">
            </div>
            <div class="form-group ">
                <button name="checkCode" type="submit" class="btn btn-success">Подтвердить</button>
            </div>
            <div class="form-group">
                <button type="submit" name="getCode" time="60" class="btn btn-info">Новый код</button>
            </div>
        </form>
    </div>
    <div class="row">&nbsp;</div>
</div>