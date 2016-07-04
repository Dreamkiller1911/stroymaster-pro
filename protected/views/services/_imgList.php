<?php
$data = isset($model->imgServices)? $model->imgServices : $model;

?>
<?php foreach($data as $key):?>


    <div class="myIMGBlock">
        <div class="imgS" rel='<?php $key->id?>' style="display: block; float: left">
            <a href="<?php echo $key->url?>" rel="gallery" title="<?php echo $key->description?>">
                <img height="150" src="<?php echo $key->url?>">
            </a>
        </div>

        <div class="param" style="margin-left: 350px;">
            <span class="description">
                <?php echo CHtml::label('Описание','imgServices[' . $key->id . '][description]')?>
                <input id="des<?php echo $key->id?>" type="text" name="imgServices'[<?php echo $key->id?>][description]" value="<?php echo $key->description?>">
                <input id="save_<?php echo $key->id?>" type="button" class="saveDescription" value="Сохранить">
                <?php /*echo CHtml::ajaxButton('Сохранить', '/ImgServices/Save', array(
                    'method' => 'get',
                    'data' => array(
                        'id' => $key->id,
                        'description' => "js:$('#des" . $key->id ."').val()",
                        'beforeSend' => "js:function(){
                            $('#save". $key->id . "').animate({opacity: 1}), 100
                        }",
                        'complete' => "js:function(){
                            setTimeout(function(){
                                $('#save". $key->id . "').animate({opacity: 0}), 300
                            },1000)
                        }"
                    ),
                    'update' => '#save' . $key->id,
                ))*/?>
                <span class="showSave" id="save<?php echo $key->id?>"></span>
            </span><br><br>
            <span class="url">
                <?php echo CHtml::label('Загрузить новый файл', 'imgServices[' . $key->id . ']')?>
                <input class="myImg" id="<?php echo $key->id?>" type="file" name="imgServices[<?php echo $key->id?>]">
            </span><br><br>
            <span class="delete">

                 <input type="button" id="<?php echo $key->id?>" class="deleteImages" value="Удалить">

                <?php /*echo CHtml::ajaxButton('Удалить', '/services/DeleteImg?id='. $key->id, array(
                    'replace' => '#imgList',
                    'cache' => false,

                ))*/?>
            </span>
        </div>
        <hr>
    </div>
<?php endforeach;?>

