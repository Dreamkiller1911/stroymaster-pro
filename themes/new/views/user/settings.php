<?php
$this->breadcrumbs = array(
    'Профиль' => '/user/',
    'Настройки' => ''
);

$this->pageTitle = 'Настройки профиля - ' . Yii::app()->name;
?>

<div class="col-sm-10 col-sm-offset-1">
    <div class="row well">
        <div class="col-sm-12 text-center">
            <h3>Настройки</h3>
            <h4 class="text-success text-center"><?php echo Yii::app()->user->getFlash('success') ?></h4>
        </div>
    </div>

    <div class="row well form">
        <?php $form = $this->beginWidget('CActiveForm', array(
            'id' => 'UserSettings',
            'enableAjaxValidation' => true,
            'htmlOptions' => array(
                'class' => 'form-group',
                'role' => 'form',

            )
        )) ?>

        <div class="row">
            <div class="col-sm-6 text-right">
                <?php echo CHtml::activeLabelEx($model, 'first_name', array('class' => 'form')) ?>
            </div>

            <div class="col-sm-6">
                <?php echo CHtml::activeTextField($model, 'first_name', array('class' => 'form-control')) ?>
                <?php echo $form->error($model, 'first_name') ?>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 text-right">
                <?php echo CHtml::activeLabelEx($model, 'second_name') ?>
            </div>

            <div class="col-sm-6">
                <?php echo CHtml::activeTextField($model, 'second_name', array('class' => 'form-control')) ?>
                <?php echo $form->error($model, 'second_name') ?>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 text-right">
                <?php echo CHtml::activeLabelEx($model, 'email') ?>
            </div>

            <div class="col-sm-6">
                <?php echo CHtml::activeEmailField($model, 'email', array('class' => 'form-control')) ?>
                <?php echo $form->error($model, 'email') ?>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 text-right">
                <?php echo CHtml::activeLabelEx($model, 'phone') ?>
            </div>

            <div class="col-sm-6">
                <?php echo CHtml::activeTextField($model, 'phone', array(
                    'class' => 'form-control',
                    'value' => $model->getData('phone'),
                    'placeholder' => '8-990-099-00-00'
                )) ?>
                <?php echo $form->error($model, 'phone') ?>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6 text-right">
                <?php echo CHtml::activeLabel($model, 'password') ?>
            </div>

            <div class="col-sm-6">
                <?php echo CHtml::activePasswordField($model, 'password', array(
                    'class' => 'form-control',
                    'value' => $_POST['User']['password'] != null ? $_POST['User']['password'] : '',
                )) ?>
                <?php echo $form->error($model, 'password') ?>
            </div>

        </div>

        <div class="row">
            <div class="col-sm-6 text-right">
                <?php echo CHtml::activeLabelEx($model, 'confirm_password') ?>
            </div>

            <div class="col-sm-6">
                <?php echo CHtml::activePasswordField($model, 'confirm_password', array('class' => 'form-control')) ?>
                <?php echo $form->error($model, 'confirm_password') ?>
            </div>
        </div>

        <div class="row text-center">
            <?php echo CHtml::submitButton('Сохранить', array('class' => 'btn btn-default')) ?>
        </div>


        <?php $this->endWidget() ?>


        <div class="row">
            <div class="col-sm-6 text-right">
                <?php if (!$model->phone_valid): ?>
                    <a href="<?php echo $this->createUrl('/user/confirm', array('type' => 'phone')) ?>">
                        <button class="btn btn-default">Подтвердить телефон <span
                                class="glyphicon glyphicon-phone text-info"></span></button>
                    </a>
                <?php endif ?>
            </div>

            <div class="col-sm-6">
                <?php if (!$model->email_valid): ?>
                    <a href="<?php echo $this->createUrl('/user/confirm', array('type' => 'email')) ?>">
                        <button disabled class="btn btn-default">Подтвердить E-Mail <span class="text-info">@</span></button>
                    </a>
                <?php endif ?>
            </div>
        </div>
    </div>

</div>
