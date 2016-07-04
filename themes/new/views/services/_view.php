<?php
/* @var $this ServicesController */
/* @var $service Services */


?>
<div class="col-lg-4 col-sm-6 content">
    <div class="row">
        <div class="col-sm-12">
            <div class="body">
                <div StartCtrl="Service_viewModal" class="note" id="<?php echo $service->id; ?>">
                    <p><?php echo $service->note ?></p>
                </div>
                <div class="text">
                    <p><?php echo $service->description ?></p>
                </div>
                <div class="imgList">
                    <div style="overflow: hidden; bottom: 0; position: static">
                        <?php foreach ($service->imgServices as $k): ?>
                            <a class="link_normal" title="<?php echo $k->description ?>"
                               rel="gallery<?php echo $service->id ?>"
                               href="<?php echo $k->url ?>">
                                <img src="<?php echo $k->simple_url ?>" height="50px">
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-12 ">
        <div class="row userInfo">
            <div class="col-sm-12"><span
                    class="glyphicon glyphicon-user">
                                <?php echo $service->idUser->second_name . ' ' . $service->idUser->first_name ?>
                            </span>
            </div>
            <div class="col-sm-12"><span
                    class="glyphicon glyphicon-phone"> <?php echo $service->idUser->getData('phone') ?></span>
            </div>

            <input id="<?php echo $service->id; ?>" class="btn btn-default btn-block btn-sm"
                   StartCtrl="Service_viewModal"
                   value="Подробнее"
                   type="button">
        </div>
    </div>
</div>



