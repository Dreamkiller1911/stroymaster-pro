<div class="row-fluid text-center">
    <h4><b class="text-muted">Данные по заявкам</b></h4>
</div>

<table class="table" style="font-size: 8pt">
    <tr>
        <th>ID</th>
        <th>Тип заявки</th>
        <th>Сумма</th>
        <th>Сделана</th>
        <th class="text-center"><span class="glyphicon glyphicon-ok"> &nbsp;</span><span class="glyphicon glyphicon-remove"></span></th>


    </tr>

<?php foreach($model as $key):?>

<tr class="myRow">
    <td><?php echo $key->getId()?></td>
    <td><?php echo Lookup::item('request_code', $key->type)?></td>
    <td><?php echo $key->summ?></td>
    <td><?php echo date('d.m.Y',$key->date_create)?></td>
    <td>
        <div class="row">
        <button onclick="opt.acceptRequest(<?php echo$key->id ?>, this)" class="btn btn-sm btn-default">
            <span class="glyphicon glyphicon-ok" style="color: green">

            </span>
        </button>
        <button onclick="opt.regectRequest(<?php echo $key->id?>)" class="btn btn-sm btn-default">
            <span class="glyphicon glyphicon-remove" style="color: red">

            </span>
        </button>
        </div>
    </td>


</tr>
    <tr class="compliteBefore"></tr>


<?php endforeach;?>
</table>
