<?php
$form = $this->beginWidget('CActiveForm', array(
    'id' => 'services-form',
    'enableAjaxValidation' => false,
    'htmlOptions' => array(
        'enctype' => 'multipart/form-data',
    )
)); ?>
<div class="col-xs-12 services">
    <div class="row form well">
        <div class="col-sm-8 col-sm-offset-2">
            <form id="services" name="resume" role="form">
                <div class="form-group">

                    <div class="row">
                        <p class="note text-info">Поля с <span class="required">*</span> обязательные.</p>
                    </div>

                    <div class="row">
                        <?php echo $form->labelEx($model, 'note'); ?>
                        <?php echo $form->textField($model, 'note', array(
                            'size' => 50,
                            'maxlength' => 300,
                            'class' => 'form-control',
                            'StartModel'=>'srv_note'
                        )); ?>
                        <?php echo $form->error($model, 'note'); ?>
                        <div StartModel="srv_error_note"></div>
                    </div>

                    <div class="row">
                        <?php echo $form->labelEx($model, 'description'); ?>
                        <?php echo CHtml::activeTextArea($model, 'description', array(
                            'rows' => '8',
                            'class' => 'form-control',
                            'StartModel'=>'srv_description'
                        )) ?>
                        <?php echo $form->error($model, 'description'); ?>
                        <div StartModel="srv_error_description"></div>
                    </div>

                    <div class="row- ">
                        <div class="col-xs-4">
                        <button StartCtrl="Service_crud" type="submit" name="sendServices" class="btn btn-default">Сохранить</button>
                        </div>
                        <div class="col-xs-8 servicesError">
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>


    <div class="row" id="imgList">
        <?php $this->renderPartial('_imgList', array('model' => $model)) ?>
    </div>

<div class="row col-xs-8 col-xs-offset-2" id="addAllImg">
        <div class="row well text-muted text-center">
            <div class="col-xs-12" rel="title">
            <h4 >Вы можете загрузить фотографии в формате :<br> <span class="text-danger">*.jpeg *.gif *.png</span><br>
            Размер фотографии не долже превышать 5Мб</h4>
            </div>
        </div>
            <div class="row">
                <div class="col-xs-5">
                <label class="form-control btn btn-default">Загрузить фотографии <span class="text-info glyphicon glyphicon-download-alt"></span>
                <input style="opacity: 0; position: fixed"  type="file" name="imgUpload" multiple>
                </label>
                </div>

                <div class="col-xs-7">
                    <span class="form-control">Доступно фотографий -
                    <span class="badge" id="numOst"><?php print_r($model->img_limit - count($model->imgServices)) ?>
                    </span>
                    </div>
            </div>

</div>
    <?php $this->endWidget(); ?>
</div>