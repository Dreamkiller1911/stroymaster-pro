<div class="comment <?php echo $comment->isOwner($user->id)?> col-sm-12 well">
    <div class="col-sm-12">
        <span class="glyphicon glyphicon-user"></span><span>
            <?php echo $comment->user != null ? $comment->user->first_name : $comment->first_name ?>
        <?php echo $comment->isOwner($comment->user->id) ? ' - Мастер': ''?></span>
        <span
            class="text-muted small">( <?php echo Yii::app()->dateFormatter->format('d MMMM.yyyy -  HH:mm', $comment->date_create) ?>
            )</span>
    </div>
    <div class="col-sm-12 well-sm">
        <p> <?php echo $comment->text ?> </p>
    </div>
</div>