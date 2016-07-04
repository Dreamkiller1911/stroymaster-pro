<?php $this->widget('application.extensions.fancybox.EFancyBox', array(
        'target'=>'a[rel]',
    )
);?>
<div id="gallery-works" class="body">
    <div>
        <p class="tex">Галерея мастеров</p>
    </div>

    <div class="text-center">
        <?php foreach($data as $key):?>
        <a id="<?php echo $key->id_service?>" ><img src="<?php echo $key->simple_url?>" title="<?php $key->description?>" ></a>
        <?php endforeach?>
    </div>

    <div>

    </div>
</div>