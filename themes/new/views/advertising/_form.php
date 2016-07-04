<?php
/* @var $this AdvertisingController */
/* @var $model Advertising */
/* @var $form CActiveForm */
?>

<div class="form form-group well">

    <?php $form = $this->beginWidget('CActiveForm', array(
        'id' => 'advertising-form',
        // Please note: When you enable ajax validation, make sure the corresponding
        // controller action is handling ajax validation correctly.
        // There is a call to performAjaxValidation() commented in generated controller code.
        // See class documentation of CActiveForm for details on this.
        'enableAjaxValidation' => false,
        'htmlOptions' => array(
            'enctype' => 'multipart/form-data',
        )
    )); ?>

    <div class="row">
        <div class="col-xs-12">
            <?php echo $form->labelEx($model, 'header'); ?>
            <?php echo $form->textArea($model, 'header', array('rows' => 3, 'class' => 'form-control', 'placeholder' => 'Строительный магазин "Мастерок" Все для ремонта')); ?>
            <?php echo $form->error($model, 'header'); ?>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-5 <?php echo $model->getError('img') != null ? 'error' : '' ?>">
            <?php echo CHtml::label('Файл изображения', get_class($model) . '[img]', array('required'=>true)); ?>
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-file"></span></span>
            <label class="btn btn-default">Выбрать файл
                <input type="file" name="<?php echo get_class($model) . '[img]'?>" class="hideFile">
<!--                --><?php //echo $form->fileField($model, 'url', array('rows' => 6, 'cols' => 50, 'class'=>'hideFile')); ?>
            </label>
            </div>
            <?php echo $form->error($model, 'img'); ?>

        </div>
        <div class="col-sm-6 col-sm-offset-1" rel="img">
            <img class="img-thumbnail" src="<?php echo $model->Img[0]->simple_url   ?>">
        </div>
    </div>
    <script>
        $(document).ready(function(){
            var inp = $('input[name="Advertising[img]"]');
            var img = $('div[rel="img"]');
            inp.change(function(e){
                var reader = new FileReader();
                reader.onload = function(e){
                    var tmp = new Image();
                    tmp.src = e.target.result;

                    if(tmp.height > tmp.width){
                        tmp.height = 210;
                    }else {
                        tmp.width = 210;
                    }

                    img.empty().append(tmp).find('img').addClass('img-thumbnail');
                };
                reader.readAsDataURL(this.files[0]);
            })
        });
    </script>

    <div class="row">
        <div class="col-xs-12">
            <?php echo $form->labelEx($model, 'address'); ?>
            <?php echo $form->textField($model, 'address', array('maxlength' => 300, 'class' => 'form-control', 'placeholder' => 'г. Ефремов, ул. Ленина, д.100')); ?>
            <?php echo $form->error($model, 'address'); ?>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-6">
            <?php echo $form->labelEx($model, 'phone'); ?>
            <?php $this->widget('CMaskedTextField', array(
                'model' => $model,
                'attribute' => 'phone',
                'mask' => '8-999-999-99-99',
                'htmlOptions' => array(
                    'class' => 'form-control',
                    'placeholder' => '8-999-999-00-00',
                ),
            )) ?>
            <?php echo $form->error($model, 'phone'); ?>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-6">
            <?php echo $form->labelEx($model, 'alt_phone'); ?>
            <?php echo $form->textField($model, 'alt_phone', array('maxlength' => 300, 'class' => 'form-control', 'placeholder' => '6-00-00')); ?>
            <?php echo $form->error($model, 'alt_phone'); ?>
        </div>
    </div>


    <div class="row buttons">
        <div class="col-xs-6 col-xs-offset-3">
            <?php echo CHtml::submitButton($model->isNewRecord ? 'Создать' : 'Сохранить', array('class' => 'btn btn-default')); ?>
            <!--		--><?php //echo CHtml::Button('Предосмотр', array('class'=>'btn btn-default')); ?>
        </div>
    </div>

    <?php $this->endWidget(); ?>

</div><!-- form -->