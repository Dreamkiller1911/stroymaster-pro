<div class="col-sm-8 col-sm-offset-2">
    <div class="row">
        <h3>Резюме</h3>
    </div>

    <div class="row well">

        <h4 class="well-sm text-center"><?php echo CHtml::encode($user->Service->note) ?></h4>

        <p class="well-sm"
           style="white-space: pre-wrap"><?php echo CHtml::encode($user->Service->description) ?></p>

        <?php if (count($user->Service->imgServices) > 0): ?>
            <div class="row block-img text-center">
                <?php foreach ($user->Service->imgServices as $img): ?>
                    <a rel="gallery" class="" href="<?php echo $img->url ?>"
                       title="<?php echo $img->description ?>">
                        <img class="imgS" src="<?php echo $img->simple_url ?>" height="80px">
                    </a>
                <?php endforeach; ?>
                <div class="row-fluid text-right">
                    <div class="col-sm-12">
                        <a class="text-info" href="/services/update/">Редактировать <span
                                class="glyphicon glyphicon-edit"></span></a>
                    </div>
                </div>
            </div>
        <?php endif; ?>

    </div>


    <?php if (count($user->Service->comments) > 0): ?>
        <div id="comment">
            <div class="row">
                <div class="col-sm-8">
                    <h3>Комментарии</h3>
                </div>
            </div>

            <div class="row well" id="commentList">
                <?php foreach ($user->Service->comments as $comment): ?>

                    <?php $this->renderPartial('_comments', array('comment' => $comment, 'user' => $user)) ?>

                <?php endforeach; ?>
            </div>

            <?php $this->renderPartial('_commentForm', array('user' => $user, 'model' => $model)) ?>
        </div>
    <?php endif; ?>
</div>


