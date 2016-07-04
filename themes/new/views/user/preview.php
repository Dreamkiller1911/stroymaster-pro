<div class="row">
    <div class="col-sm-8 col-sm-offset-2 text-center">
        <h4 class="text-muted">Контактная информация</h4>
    </div>
</div>
<div class="row">
    <div class="col-sm-12 well">
        <div class="col-sm-3 well"><span
                class="glyphicon glyphicon-user"></span> <?php echo $user->first_name . ' ' . $user->second_name ?>
        </div>
        <div class="col-sm-3 well">
            <span
                class="glyphicon glyphicon-phone"></span> <?php echo $user->getData('phone') . $user->getData('phone_status') ?>
        </div>
        <div class="col-sm-3 well">
             <span data-toggle="tooltip" data-placement="bottom" title="<?php echo $user->email ?>">
            <span class="glyphicon glyphicon-envelope"></span>
                 <?php echo $user->getData('email') . $user->getData('email_status') ?></span>
        </div>
        <div class="col-sm-3 well"><span class="glyphicon glyphicon-refresh"></span>
            <?php echo $user->Service->getData('last_update') ?>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-8 col-sm-offset-2 text-center">
        <h4 class="text-muted">Резюме мастера</h4>
    </div>
</div>
<div class="row">
    <div class="col-sm-10 col-sm-offset-1 text-justify well preform-text">
        <div class="title"><h4><b><?php echo $user->Service->note ?></b></h4></div>
        <div class="content"><?php echo $user->Service->description ?></div>
    </div>
</div>

<div class="row text-center">
    <div class="col-sm-10 col-sm-offset-1 well">
        <?php foreach ($user->Service->imgServices as $img): ?>
            <a class="link_normal" rel="gallery" href="<?php echo $img->url ?>"
               title="<?php echo $img->description ?>">
                <img class="imgS" src="<?php echo $img->simple_url ?>" height="80px">
            </a>
        <?php endforeach; ?>
    </div>
</div>
<div class="row" id="comment">

    <?php if (count($user->Service->comments)): ?>
        <div class="col-sm-12 text-center">
            <h4 class="text-muted">Комментрии</h4>
        </div>


        <div class="col-sm-6 col-sm-offset-3 well">
            <div id="commentList">
                <?php foreach ($user->Service->comments as $comment): ?>

                    <?php $this->renderPartial('_comments', array('comment' => $comment, 'user' => $user)) ?>

                <?php endforeach; ?>
            </div>
        </div>
    <?php else: ?>
        <div class="col-sm-12 text-center">
            <h4 class="text-muted">Комментрии отсутствуют</h4>
        </div>
        <div class="col-sm-6 col-sm-offset-3 well">
            <div id="commentList">
            </div>
        </div>
    <?php endif; ?>
    <div class="col-sm-12">
        <?php $this->renderPartial('_commentForm', array('user' => $user, 'model' => $model)) ?>
    </div>

</div>
<div class="row">
    &nbsp;
</div>