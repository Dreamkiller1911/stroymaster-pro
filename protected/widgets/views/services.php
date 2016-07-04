<div class="row text-center">
    <h4><b class="text-muted"><?php echo $data['title']?></b></h4>
</div>

<?php foreach($data as $key => $val):?>
    <?php if($key != 'title'):?>
    <table class="" width="100%" >
        <tr>
            <td class="text-right" width="50%"><b><?php echo $key?></b></td>
            <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
            <td class="text-left"><?php echo $val ?></td>
        </tr>
    </table>
    <?php endif?>
<?php endforeach;?>

