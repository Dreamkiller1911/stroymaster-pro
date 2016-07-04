<?php
/**
 * @property $user->first_name;
 * @property $user->second_name;
 */
$this->breadcrumbs = array(
    'Мой профиль'
);
$this->widget('application.extensions.fancybox.EFancyBox', array(
        'target'=>'a[rel=gallery]',
        'config'=>array(),
    )
);
?>
<div id="profile">

    <h3>Добро пожаловать - <?php echo $user->first_name?></h3>
    <div class="form">
        <div class="row">
            <span class="labelUser" >Имя</span>
            <span><?php echo $user->first_name?></span>
        </div>

        <div class="row">
            <span class="labelUser" >Фамилия</span>
            <span><?php echo $user->second_name?></span>
        </div>
        <div class="row">
            <span class="labelUser" >Зарегестрированны как</span>
            <span><?php echo $user->Class->description?></span>
        </div>
        <div class="row">
            <span class="labelUser" >Электронная почта</span>
            <span><?php echo $user->email?></span>
        </div>
        <div class="row">
            <span class="labelUser" >Номер телефона</span>
            <span><?php echo $user->phone?></span>
        </div>

        <br>
        <hr>
        <br>
        <?php if(isset($user->Service)):?>
        <h3>Мое резюме</h3>
        <div style="display: block; padding: 2% 10px 10px 10px; width: 80   %; border: 1px solid gainsboro">

            <h4>

                <?php echo $user->Service->note?></h4>
            <?php echo $user->Service->description?>

            <?php foreach ($user->Service->imgServices as $img):?>
                <a rel="gallery" href="<?php echo $img->url?>" title="<?php echo $img->description?>">
                    <img src="<?php echo $img->url?>" height="120px">
                </a>


            <?php endforeach;?>

        </div>
        <?php endif?>
    </div>

</div>