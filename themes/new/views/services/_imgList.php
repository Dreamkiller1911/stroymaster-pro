<?php
$data = isset($model->imgServices) ? $model->imgServices : $model;

?>
<?php foreach ($data as $key): ?>


    <div class="row myIMGBlock well">

        <div class=" col-xs-6 imgS" rel='<?php $key->id ?>'>
            <a href="<?php echo $key->url ?>" rel="gallery" title="<?php echo $key->description ?>">
                <img src="<?php echo $key->simple_url ?>">
            </a>
        </div>


        <div class=" col-xs-6 param">

            <div class="row description form-inline">
                <?php echo CHtml::label('Описание', 'imgServices[' . $key->id . '][description]') ?><br>
                <input class="form-control" id="<?php echo $key->id ?>" type="text" name="imgServices'[<?php echo $key->id ?>][description]" value="<?php echo $key->description ?>">
            </div>

            <div class="row url" style="position: relative">
                <label class="btn btn-default" >Заменить файл <span class="text-info glyphicon glyphicon-download-alt"></span>
                <input class="imgItem" id="<?php echo $key->id ?>" type="file" name="imgServices[<?php echo $key->id ?>]" style="opacity: 0.3; position: fixed; height: 35px; width: 180px">
                </label>
                <span style="display: inline-block; margin-left: 10px"></span>
            </div>
            <div class="row">
                <button type="button" id="<?php echo $key->id ?>" class="btn btn-default" name="deleteImg">Удалить <span class=" text-danger glyphicon glyphicon-remove"></span></button>
                <span class="showSave" id="save<?php echo $key->id ?>"></span></div>




        </div>

    </div>
<?php endforeach; ?>

