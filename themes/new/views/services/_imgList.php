<?php
$data = isset($model->imgServices) ? $model->imgServices : $model;

?>
<?php foreach ($data as $key): ?>

    <div class="col-sm-4 text-center">

        <div class="row">
            <div class="imgS" rel='<?php $key->id ?>'>
                <a href="<?php echo $key->url ?>" rel="gallery" title="<?php echo $key->description ?>">
                    <img src="<?php echo $key->simple_url ?>">
                </a>
            </div>
        </div>
        <div class="row description form-inline">

                <?php echo CHtml::label('Описание', 'imgServices[' . $key->id . '][description]') ?><br>
                <input StartModel="imgSrvF_description" class="form-control" id="<?php echo $key->id ?>" type="text"
                       name="imgServices'[<?php echo $key->id ?>][description]" value="<?php echo $key->description ?>">

        </div>
        <div class="row url form-inline " style="position: relative">
            <label class="btn btn-default">Заменить файл <span
                    class="text-info glyphicon glyphicon-download-alt"></span>
                <input StartCtrl="imgSrv_testView" class="imgItem" id="<?php echo $key->id ?>" type="file"
                       name="imgServices[<?php echo $key->id ?>]"
                       style="opacity: 0.3; position: fixed; height: 35px; width: 180px">
            </label>
            <span style="display: inline-block; margin-left: 10px"></span>
        </div>
        <div class="row form-inline">
            <button StartCtrl="imgSrv_delete" type="button" id="<?php echo $key->id ?>" class="btn btn-default"
                    name="deleteImg">Удалить <span class=" text-danger glyphicon glyphicon-remove"></span></button>
            <span class="showSave" id="save<?php echo $key->id ?>"></span>
        </div>
        <div class="row">&nbsp;</div>


    </div>

<?php endforeach; ?>

