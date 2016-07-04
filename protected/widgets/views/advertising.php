<?php if (isset($model) && count($model) > 0): ?>

    <?php foreach ($model as $key): ?>
        <div class="row body" rel="Wadvt_<?php echo $key->id?>">
            <div class="row-fluid text-center"><h4><?php echo $key->header ?></h4></div>
            <div>
                <img src="<?php echo $key->Img[0]->url ?>" width="100%">
            </div>
            <div>
                <div class="row-fluid">
                <?php if($key->getData('address')):?>
                    <span class=" glyphicon glyphicon-map-marker"> <?php echo $key->getData('address') ?></span>
                <?php endif?>
                </div>

                <div class="row-fluid">
                <?php if ($key->getData('phone')): ?>
                 <span class=" glyphicon glyphicon-phone"> <?php echo $key->getData('phone') ?></span>
                <?php endif ?>
                </div>

                <div class="row-fluid">
                <?php if ($key->getData('alt_phone')): ?>
                <span class="glyphicon glyphicon-phone-alt "> <?php echo $key->getData('alt_phone') ?></span>
                <?php endif ?>
                </div>
            </div>
        </div>
    <?php endforeach ?>

<?php else: ?>
    <div class="row body">
        <div><p>Строительный магазин "Мастерок" Все для ремонта</p></div>
        <div>
            <img src="/assets/112110ed/rasha_small.jpg" width="100%">
        </div>
        <div><span>Адрес</span><br><span
                class="glyphicon glyphicon glyphicon-phone"> 8-999-99-00-00 </span>
            <br><span class="glyphicon glyphicon-phone-alt "> 6-00-00</span></div>
    </div>
<?php endif; ?>