<?php $this->breadcrumbs = array(
    'Регистрация'
)
?>

<p>Вы можете выбрать кем будете являтся на сайте, используя кнопки ниже</p>

<div class="form form-shadow">
    <div class="col-xs-5">
    <?php $form=$this->beginWidget('CActiveForm', array(
        'id'=>'reg-form',
        'enableAjaxValidation'=>true,
    ))?>
<p>Поля помеченные <span class="required">*</span> обязательные </p>
    <div class="row">
        <?php echo CHtml::activeLabelEx($model, 'class')?>
        <?php echo CHtml::activeDropDownList($model, 'class', array('Мастер', 'Владелец магазина'))?>
        <?php echo $form->error($model, 'class')?>
    </div>
    <div class="row">
        <?php echo CHtml::activeLabelEx($model, 'first_name')?>
        <?php echo CHtml::activeTelField($model, 'first_name')?>
        <?php echo $form->error($model, 'first_name')?>
    </div>
    <div class="row">
        <?php echo CHtml::activeLabelEx($model, 'second_name')?>
        <?php echo CHtml::activeTelField($model, 'second_name')?>
        <?php echo $form->error($model, 'second_name')?>
    </div>
    <div class="row">
        <?php echo CHtml::activeLabelEx($model, 'phone');?>
        <?php $this->widget('CMaskedTextField',  array(
            'model'=>$model,
            'attribute'=>'phone',
            'mask' =>'8-999-999-99-99',
        ))?>
        <?php echo $form->error($model, 'phone')?>
    </div>
    <div class="row">
        <?php echo CHtml::activeLabelEx($model, 'email')?>
        <?php echo CHtml::activeTelField($model, 'email')?>
        <?php echo $form->error($model, 'email')?>
    </div>
    <div class="row">
        <?php echo CHtml::activeLabelEx($model, 'password')?>
        <?php echo CHtml::activePasswordField($model, 'password')?>
        <?php echo $form->error($model, 'password')?>
    </div>
    <div class="row">
        <?php echo CHtml::activeLabelEx($model, 'repeat_password')?>
        <?php echo CHtml::activePasswordField($model, 'repeat_password')?>
        <?php echo $form->error($model, 'repeat_password')?>
    </div>
    <div class="row">
        <?php echo CHtml::submitButton('Регистрация')?>
    </div>



    <?php $this->endWidget()?>
</div>
</div>
<br>
<p>Если Вы являетесь мастером Вы сможете разместить свое резюме на сайте. Кроме того Вы сможете вести историю
    своих работ и добавлять к ним фотографии,что позволит заказчику оценить Вас как мастера.</p>
<p>Если Вы являетесь владельцем строительного магазина, Вы сможете разместить свою рекламу вашего магазина на сайте.</p>
