
<div class="row well form form-group" rel="form-comment">
    <?php $form = $this->beginWidget('CActiveForm', array(
        'enableAjaxValidation' => false,
        'id'=>'newComment',
        'clientOptions' => array(
            'validationUrl'=>'/comments/add/',
        )
    ))?>
    <div class="col-sm-8 col-sm-offset-2">

        <div class="row">
            <?php echo $form->textArea($model, 'text', array(
                'class'=>'form-control',
                'StartModel'=>'com_text',
                'placeholder'=>'Напишите тут свой комментарий',
                'rows'=>5,
            ))?>
            <div  class="errorMessage" id="<?php echo get_class($model) . '_text_em_'?>"></div>
        </div>

        <div class="row" style="display: <?php echo Yii::app()->user->isGuest ? 'block': 'none'?>;">
            <?php echo $form->TextField($model, 'first_name', array(
                'class' => 'form-control',
                'startModel'=>'com_first_name',
                'placeholder'=>'Введите свое имя',
            ))?>
            <div StartModel="com_error_first_name" class="errorMessage" id="<?php echo get_class($model) . '_first_name_em_'?>"></div>
        </div>
        <div class="row" style="display: <?php echo Yii::app()->user->isGuest ? 'block': 'none'?>;">
            <?php echo $form->emailField($model, 'email', array(
                'class' => 'form-control',
                'StartModel'=>'com_email',
                'placeholder'=>'Введите свой E-Mail',
            ))?>
            <div StartModel="com_error_email" class="errorMessage" id="<?php echo get_class($model) . '_email_em_'?>"></div>
        </div>
        <?php echo $form->hiddenField($model, 'service_id', array(
            'value' => $user->Service->id,
            'StartModel'=>'com_service_id',
        ))?>

        <div class="row">
            <button startCtrl="com_load" class="btn btn-default" id="sendComment" type="button"><?php echo Yii::app()->user->id === $user->id ? 'Ответить': 'Отправить'?><?php ?></button>
            <div class="label" rel="error"></div>
        </div>
    </div>
    <?php $this->endWidget()?>
</div>
