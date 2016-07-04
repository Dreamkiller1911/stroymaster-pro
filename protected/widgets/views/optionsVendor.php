<div class="row text-center text-muted">
    <h4><b><?php echo $opt['Title'] ?></b></h4>
</div>

<div class="row" id="options">

    <table width="100%">
        <tr>
            <th width="30px">№</th>
            <th>Название(шапка)</th>
            <th class="text-center">Статус</th>
            <th class="text-center"><span class="glyphicon glyphicon-eye-open btn"></span></th>
            <th class="text-center"><span class="glyphicon glyphicon-cog btn"></span></th>
        </tr>
    <?php $i = 1; foreach ($model->Advt as $advt): ?>
        <tr>
            <td><?php echo $i?></td>
            <td><?php echo mb_substr($advt->header, 0, 40)?>...</td>
            <?php if($advt->status === Advertising::STATUS_ANACTIVE):?>
                <td class="text-center"><span title="Не активно" class="glyphicon glyphicon-ban-circle text-danger"></span></td>
            <?php else:?>
                <td class="text-center"><span title="Активно" class="glyphicon glyphicon-ok-circle text-success"></span></td>
            <?php endif;?>
            <td class="text-center"><span opt="<?php echo $advt->id?>" class="glyphicon glyphicon-eye-open  preview text-info btn"></span></td>
            <td class="text-center"><span opt="<?php echo $advt->id?>" class="glyphicon glyphicon-cog  options text-info btn"></span></td>
        </tr>

        <tr>
            <td colspan="5">
                <?php echo $advt->dateEndProgress();?>

            </td>
        </tr>
        <tr> <td colspan="5">&nbsp;</td></tr>
    <?php $i++; endforeach; ?>
    </table>
</div>
