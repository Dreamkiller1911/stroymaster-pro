<div class="row-fluid text-center">
    <h4><b class="text-muted">Активация SMS уведомлений</b></h4>
</div>
<div class="form form-shadow">
    <form>
        <div class="row-fluid">
            <span>Выберете на сколько месяцев активировать </span>
            <?php echo CHtml::dropDownList('date_m', '0', array(1,2,3,4,5,6,7,8,9,10,11,12))?>
        </div>
        <hr>
        <div class="row-fluid">
            <span id="result">Вы выбрали 3 месяца, общая стоимость = 900 руб.</span>
        </div>
        <div class="row">
            <div class="btn-group">
                <button class="btn btn-default btn-sm" type="submit">Наличные</button>
                <button class="btn btn-default btn-sm" type="submit">Электронная карта</button>
                <button class="btn btn-default btn-sm" type="submit">Электронный кошелек</button>

            </div>
        </div>
    </form>
</div>