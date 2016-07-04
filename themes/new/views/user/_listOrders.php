<?php foreach($model as $key):?>
    <?php if(!isset($ajax)):?>
        <div class="col-xs-12">
            <?php endif;?>
        <div class="col-xs-8 col-xs-offset-0 client <?php echo $key->status? '': 'complete'?>">

            <div class="row">
                <div class="col-xs-6 text-center">
					<span title="Ваше имя" class="glyphicon glyphicon-user curs-help">
						<?php echo CHtml::decode($key->User->first_name) . ' ' . CHtml::encode($key->User->second_name) ?>
					</span>
                </div>
                <div class="col-xs-6 text-center">
					<span title="Дата создания заказа" class="glyphicon glyphicon-calendar curs-help">
						<?php echo CHtml::decode(date('Y-m-d H-i',strtotime($key->date_create))); ?>
					</span>
                </div>
            </div>

            <div class="row order-text" >
                <div class="hid" style="display: <?php echo !isset($ajax)? 'none': 'block'?>;"><p><?php echo CHtml::decode($key->text)?></p></div>
    <?php if(!isset($ajax)):?>
<!--                <div class="col-xs-12 text-left">-->
                    <textarea draggable="false" <?php echo $key->status  ? '' : 'disabled'?>><?php echo CHtml::decode($key->text)?></textarea>
<!--                </div>-->
    <?php endif;?>
            </div>

            <div class="row">
                <div class="col-xs-4 text-center">
					<span title="Ваш номер" class="glyphicon glyphicon-phone curs-help">
						<?php echo CHtml::decode(Converter::toPhone($key->User->phone, $key->User->id)); ?>
					</span>
                </div>

                    <div class="col-xs-8 text-center ">

						<span class="glyphicon glyphicon-share"><?php echo CHtml::DateField('date_start', $key->date_start)?></span>
                        <span class="glyphicon glyphicon-check"> <?php echo CHtml::DateField('date_complete', $key->date_complition)?></span>
                    </div>
            </div>

<!--            <div class="complete" style="display: --><?php //echo $key->status == 1 ? 'none' : 'block' ?><!--"></div>-->
        </div>
    <?php if($key->status):?>
            <div class="col-xs-2 ">
                <button id="cpl-<?php echo $key->id?>" type="button" class="btn btn-default btn-group-justified btn-complete"><span class="glyphicon glyphicon-ban-circle text-danger"></span> Завершить</button><br>
                <button id="save-<?php echo $key->id?>" type="button" class="btn btn-default btn-group-justified btn-save"><span class="glyphicon glyphicon-ok text-success"></span> Сохранить</button><br>
<!--                <button type="button" class="btn btn-default btn-group-justified"><span class="glyphicon glyphicon-ok-circle text-success"></span> Возобновить</button>-->
                <div></div>
          </div>
        <?php endif;?>
    <?php if(!isset($ajax)):?>
    </div>
        <?php endif;?>
<?php endforeach;?>