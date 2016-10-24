<?php
/* @var $this ServicesController */
/* @var $service Services */
?>


<div viewFX="service" class="col-lg-4 col-sm-6 content">
    <div class="row">
        <div class="col-sm-12">
            <div class="rank">Статус</div>
            <div class="body">
                <div style="z-index: 10" StartCtrl="Services_viewModal" class="note" id="<?php echo $service->id; ?>">
                    <p><?php echo $service->note ?></p>
                </div>
                <div viewFx="textBlock" class="text"><p><?php echo $service->description ?></p></div>
                <div viewFX="imgBlock" class="imgList">
                    <div style="overflow: hidden; bottom: 0; position: static">
                        <?php foreach ($service->imgServices as $k): ?>
                            <a viewFX="imgList" class="link_normal" title="<?php echo $k->description ?>"
                               rel="gallery<?php echo $service->id ?>"
                               href="<?php echo Yii::app()->request->getBaseUrl(true) . $k->url ?>">
                                <img src="<?php echo Yii::app()->request->getBaseUrl(true) . $k->simple_url ?>"
                                     height="50px">
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-12 ">
        <div class="row userInfo" style="position: relative">
            <div class="col-sm-12 userInfo-element">
                <span
                    class="element"><?php echo $service->idUser->second_name . ' ' . $service->idUser->first_name ?></span>
            </div>
            <div class="col-sm-12 userInfo-element">
                <span class="element"><?php echo $service->idUser->getData('phone') ?></span>
            </div>
            <div viewFX="moreButton" class="more"><span class="more-label">
     <span class="glyphicon glyphicon-eye-open"></span></span>
                <input id="<?php echo $service->id; ?>" class="btn btn-default btn-block btn-sm more-close"
                       StartCtrl="Services_viewModal"
                       value="Подробнее"
                       type="button"></div>
        </div>
    </div>
</div>




