<div class="row text-center text-muted">
    <h4><b><?php echo $opt['Title'] ?></b></h4>
</div>
<div class="row" id="options">

    <?php foreach ($opt['data'] as $key): ?>
        <div class="row opt">
            <div class="col-xs-10">
                <span><?php echo $key['text'] ?></span>
            </div>

            <div class="col-xs-2">
                <button act="getForm" onclick="<?php echo $key['click'] ?>" typeRequest="<?php echo $key['type']?>"
                        advt="<?php echo $key['advt']?>" title="<?php echo $key['title'] ?>" type="button"
                        class="tlpBtn btn btn-default btn-sm" <?php echo $key['active'] ?>>
                    <span class="glyphicon <?php echo $key['glyphicon'] ?>"
                          style="color: <?php echo $key['color'] ?>"></span>
                    <span class="badge"><?php echo $key['amount'] ?></span>
                </button>
            </div>
        </div>
    <?php endforeach; ?>

    <?php if(isset($_POST['ajax'])):?>
        <div class="col-sm-12 text-right">
            <br>
            <button act="return" class="btn btn-default">Вернуться</button>
        </div>
    <?php endif?>
</div>
