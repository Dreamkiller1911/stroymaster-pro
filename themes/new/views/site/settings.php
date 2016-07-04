<div class="col-sm-6 text-center">
    <canvas height='180' width='200' id='example'>Обновите браузер</canvas>
</div>

<div class="col-sm-5">
    <label for="text">Введите текст</label>
    <input name="text" type="text" class="form-control"><br>
    <input type="button" value="Добавить" class="btn btn-default" id="add_text">

    <input StartCtrl="stng_load" type="button" value="Загрузить модель настроек" class="btn btn-default"
           id="loadModelSettings"><br>
    <input StartCtrl="com_getForm" type="button" value="Получить форму" class="btn btn-default"
           id="loadModelSettings"><br>

</div>
<br>

<div class="row">
    <div class="col-sm-4">
        <input id="cond_comment_name" title="Имя пользователя" type="text" value="" class="form-control">
    </div>
    <div class="col-sm-4">
        <input type="button" value="Найти комментарии" StartCtrl="com_getAll" class="btn btn-default">
    </div>
</div>

<div id="com">

</div>

