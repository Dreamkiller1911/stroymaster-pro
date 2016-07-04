

<div class="row-fluid text-center">
    <h4><b class="text-muted"><?php echo $secondDate['RequestLabel'][$type]?></b></h4>
</div>
<div class="form form-shadow">
    <form>
        <div class="row ">
            <div class="col-xs-6">
            <span>Месяцы </span>
                <?php echo CHtml::dropDownList('date_m', '0', array('1'=>1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12), array(
                    'onchange' => 'opt.getSum({"value":$(this).val()})',
                ))?>
            </div>

            <div class="col-xs-6">
            <span id="result">__________</span>
            </div>
        </div>

        <div class="row">&nbsp;</div>
        <div class="row">

            <div class="btn-group">
                <button id="pay_cash" onclick="
                    opt.sendRequest(this,
                <?php echo $type ?>,
                <?php echo Yii::app()->user->id ?>,
                <?php echo $secondDate['baseId']?>)" class="btn btn-default btn-sm" type="button">Наличные
                </button>
                <button class="btn btn-default btn-sm" type="submit" disabled>Электронная карта</button>
                <button class="btn btn-default btn-sm" type="submit" disabled>Электронный кошелек</button>
            </div>
        </div>
    </form>
</div>
<div class="row-fluid">
    <span class="ajax-loader1"> </span>
</div>
