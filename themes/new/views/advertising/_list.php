<?php
/* @var $this AdvertisingController */
/* @var $data Advertising */
?>

<div class=" col-sm-12 view well" rel="advt_<?php echo $data->id?>">
    <a id="_<?php echo $data->getData('id')?>"></a>
    <div class="row text-center">
        <h4 class="text-success"><b><?php echo Yii::app()->user->getFlash('success_' . $data->id); Yii::app()->user->setFlash('success_' . $data->id, '')?></b></h4>
    </div>
<div class="col-sm-6">
    <div class="BlockData">
    <?php $this->renderFile(Yii::getPathOfAlias('application') . '/widgets/views/advertising.php', array('model'=>array($data)))?>
    </div>
</div>
<div class="col-sm-6">
    <hr>
    <b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
    <?php echo $data->getData('id'); ?>
    <br>

    <b><?php echo CHtml::encode($data->getAttributeLabel('status')); ?>:</b>
    <?php  if($data->status)echo 'Активно'; else echo 'Не активно'; ?>
    <br>

    <b><?php echo CHtml::encode($data->getAttributeLabel('date_create')); ?>:</b>
    <?php echo $data->getData('date_create'); ?>
    <br />

    <b>Обновлялось:</b>
    <?php echo $data->getData('date_update'); ?>
    <br />

    <b>Закончится:</b>
    <?php echo $data->getData('date_end'); ?>
    <br />

    <hr>
    <a class="link_normal" href="<?php echo Yii::app()->createUrl('advertising/update', array('id'=>$data->id))?>"><button class="btn btn-default btn-block" type="button">Редактировать</button></a><br>

    <a class="link_normal" href="<?php echo Yii::app()->createUrl('advertising/switch', array('id'=>$data->id))?>">
        <button class="btn btn-default btn-block" type="button"><?php if(!$data->status && $data->date_end != Advertising::DATE_NULL){
                echo 'Включить';
            }else echo 'Выключить'?></button>
    </a><br>

    <?php echo CHtml::ajaxButton('Удалить', '/advertising/delete', array(
        'type' => 'POST',
        'cache' => 'false',
        'dataType' => 'html',
        'data' => array('ajax'=>'delete','Advertising' => array('id'=>$data->id)),
        'beforeSend' => 'function(){if(confirm("Вы точно хотите удалить блок' . $data->getData("id") . '") === false){return false}}',
        'success' => 'function(data){
        console.log(data);
            $(\'div[rel="advt_' . $data->id . '"]\').animate({"height": 0}, 250, function(){
                $(this).css("display", "none");
                    $(\'div[rel="Wadvt_' . $data->id . '"]\').animate({"opacity": 0}, 250, function(){
                        $(this).animate({"height":0}, 100, function(){$(this.remove())})
                    })
                })
            }'
    ),array('class'=>'btn btn-default btn-block'))?>


</div>

</div>