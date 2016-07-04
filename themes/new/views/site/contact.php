<?php
$this->pageTitle = Yii::app()->name . ' - Письмо администрацие';
$this->breadcrumbs = array(
    'Обратная связь' => '',
);
?>
<div class="row">
    <div class="col-sm-10 col-sm-offset-1">
    <div class="col-sm-12 well">
        <h3>Форма обратной связи</h3>

        <?php if (Yii::app()->user->hasFlash('contact')): ?>

            <div class="flash-success">
                <?php echo Yii::app()->user->getFlash('contact'); ?>
            </div>
            </div>
            </div>
</div>

        <?php else: ?>

        <p>
            Если у вас есть деловое предложение или другие вопросы, пожалуйста, заполните следующую форму, чтобы
            связаться с
            нами. Спасибо.
        </p>
        </div>
    </div>
</div>

    <div class="form">

        <div class="col-sm-10 col-sm-offset-1 well"><?php $form = $this->beginWidget('CActiveForm'); ?>

        <p class="note">Поля с <span class="required">*</span> обязательные.</p>


        <div class="row form-group">
        <div class="col-sm-4">
            <?php echo $form->labelEx($model, 'name'); ?>
            <?php echo $form->textField($model, 'name', array('class'=>'form-control')); ?>
            <?php echo $form->error($model, 'name') ?>
            </div>
        </div>

        <div class="row form-group">
            <div class="col-sm-4">
            <?php echo $form->labelEx($model, 'email'); ?>
            <?php echo $form->textField($model, 'email', array('class'=>'form-control')); ?>
            <?php echo $form->error($model, 'email') ?>

        </div>

        <div class="row form-group">
            <div class="col-sm-4">
            <?php echo $form->labelEx($model, 'subject'); ?>
            <?php echo $form->textField($model, 'subject', array('size' => 60, 'maxlength' => 128, 'class'=>'form-control')); ?>
            <?php echo $form->error($model, 'subject') ?>
            </div>
        </div>

        <div class="row">
            <?php echo $form->labelEx($model, 'body'); ?>
            <?php echo $form->textArea($model, 'body', array('rows' => 6, 'cols' => 50)); ?>
            <?php echo $form->error($model, 'body') ?>
            </div>
        </div>

        <?php if (CCaptcha::checkRequirements()): ?>
            <div class="row">
                <?php echo $form->labelEx($model, 'verifyCode'); ?>
                <div>
                    <?php $this->widget('CCaptcha'); ?>
                    <?php echo $form->textField($model, 'verifyCode'); ?>
                </div>
                <div class="hint">Пожалуйста, введите буквы, изображенные на картинке выше.
                    <br/>Буквы не чувствительны к регистру.
                </div>
                <?php echo $form->error($model, 'verifyCode') ?>
            </div>
        <?php endif; ?>

        <div class="row submit">
            <?php echo CHtml::submitButton('Отправить'); ?>
        </div>

        <?php $this->endWidget(); ?>
</div>
    </div><!-- form -->

<?php endif; ?>
