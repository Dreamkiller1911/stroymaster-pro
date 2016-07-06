<!--<div id="imgBox">
<?php /*foreach($data as $key => $val):*/?>
    <div class="img">
    <img src="<?php /*echo $val['url']*/?>">
    </div>
<?php /*endforeach*/?>
</div>-->

<div id="carousel-example-generic" class="carousel slide" data-interval="6000" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
        <?php $i=0; foreach($data as $key => $val):?>
            <div class="carousel-item item <?php echo $i == 0 ? 'active': '' ?>">
                <img src="<?php echo Yii::app()->request->baseUrl . '/img/toSlider/' .  $val['file_name']?>" alt="First slide">
            </div>
            <?php $i++?>
        <?php endforeach?>
    </div>
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="icon-prev" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="icon-next" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>