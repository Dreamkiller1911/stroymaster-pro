<?php
/* @var $this OrdersController */
/* @var $model Orders */

$this->breadcrumbs = array(
    'Список заявок' => array('index'),
    'Добавить' => '',
);
$this->pageTitle = 'Новый заказ - ' . Yii::app()->name;
$this->init()->registerMetaTag('Оставить заказ на ремонт, заявка', 'keywords');
$this->init()->registerMetaTag('Вам нужна услуга мастеров, оставьте свою заявку и мастера сами свяжутся с Вами', 'description');

?>
<div id="formCreate"></div>
<div class="row">
    <div class="col-sm-10 col-sm-offset-1">
        <div class="col-sm-12 well"><h4> Оставьте заказ если Вам нужна какая-либо услуга. Мастера свяжутся с Вами.</h4>

            <p>Заказы так-же принмимаются по телефону <span class="text-info">8-920-453-62-78</span></p></div>
    </div>
</div>

<div class="row">
    <div class="col-sm-10 col-sm-offset-1">
        <div class="form well">
            <?php $form = $this->beginWidget('CActiveForm', array(
                'id' => 'orders-form',
                'enableAjaxValidation' => false,
                'htmlOptions' => array(
                    'class' => 'form-group',
                ),
            )); ?>

            <div class="row">
                <div class="col-sm-12">
                    <p class="note">Поля с <span class="required">*</span> обязательные.</p>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-5">
                    <?php echo $form->labelEx($model, 'name'); ?>
                    <?php echo $form->textField($model, 'name', array(
                        'maxlength' => 150,
                        'value' => $user->id != null ? $user->first_name . ' ' . $user->second_name : '',
                        'disabled' => $user->id != null ? true : false,
                        'class' => 'form-control'
                    )); ?>
                </div>
                <div class="col-sm-6 errorMessage confirmPhone"></div>
            </div>

            <div class="row">
                <div class="col-sm-5">
                    <?php echo $form->labelEx($model, 'phone'); ?>

                    <?php $this->widget('CMaskedTextField', array(
                        'model' => $model,
                        'attribute' => 'phone',
                        'mask' => '8-999-999-99-99',
                        'htmlOptions' => array(
                            'value' => $user->id != null ? $user->phone : '',
                            'disabled' => $user->id != null ? true : false,
                            'class' => 'form-control'
                        )
                    )) ?>
                    <?php echo $form->error($model, 'phone'); ?>
                </div>
                <div class="col-sm-6">
                    <label>&nbsp;</label>
                    <button class="btn btn-default" type="button" name="confirmPhone"
                            style="display: <?php echo $user->id != null ? 'none;' : 'inline;' ?>">Подтвердить
                    </button>
                </div>
            </div>

            <div class="row" id="codeForm" style="display: none; height: 0">
                <div class="col-sm-5">
                    <?php echo CHtml::label('Код подтверждения', 'code'); ?>
                    <?php echo CHtml::textField('codeRow', array(), array('class' => 'form-control')) ?>
                </div>
                <div class="col-sm-6">
                    <label>&nbsp;</label>
                    <button class=" btn btn-default" type="button" name="checkCode">Проверить</button>
                </div>
            </div>


            <div class="row">
                <div class="col-sm-8">
                    <?php echo CHtml::label('Опишите что вам нужно и Ваши требования', 'text', array(
                        'required' => true,
                    )); ?>
                    <?php echo $form->textArea($model, 'text', array('rows' => 6, 'class' => 'form-control')); ?>
                    <?php echo $form->error($model, 'text'); ?>
                    <?php echo $form->error($model, 'id_user') ?>
                </div>
            </div>

            <div class="row">
                <div class="row">
                    <div class="col-xs-6 text-center"><b>Сроки исполнения работы</b></div>
                </div>
                <div class="col-xs-3">
                    <?php echo $form->labelEx($model, 'date_start', array('class' => 'text-center')); ?>
                    <?php echo CHtml::activeDateField($model, 'date_start', array('class' => 'form-control')); ?>
                    <?php echo $form->error($model, 'date_start'); ?>
                </div>
                <div class="col-xs-3">
                    <?php echo $form->labelEx($model, 'date_complition', array('class' => 'text-center')); ?>
                    <?php echo CHtml::activeDateField($model, 'date_complition', array('class' => 'form-control')); ?>
                    <?php echo $form->error($model, 'date_complition'); ?>
                </div>
            </div>

            <div class="row buttons">
                <div class="col-sm-3">
                    <button class="btn btn-default" type="submit">Отправить</button>
                </div>
                <div class="col-sm-9"><span class="errorMessage add"></span></div>
            </div>

            <?php $this->endWidget(); ?>

        </div>
    </div>
</div>