<?php
/**
 * @property $user->first_name;
 * @property $user->second_name;
 */
$this->breadcrumbs = array(
    'Мой профиль' => '',
);
$this->pageTitle = $user->first_name . ' - профиль - ' . Yii::app()->name;
$this->widget('application.extensions.fancybox.EFancyBox', array(
        'target' => 'a[rel=gallery]',
        'config' => array(),
    )
);

?>
<div class="col-sm-12">
    <div class="col-sm-12 well text-center">
        <h4>Добро пожаловать в личный кабинет</h4>
    </div>
    <div class="row">
        <div class="col-sm-6 well" style="min-height: 300px">
            <div class="row text-center">
                <h4><b class="text-muted">Информация о пользователе</b></h4>
            </div>
            <table width="100%">
                <tr>
                    <td class="text-right"><b>Имя</b></td>
                    <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
                    <td class="text-left"><span><?php echo $user->first_name ?></span></td>
                </tr>
                <tr>
                    <td class="text-right"><b>Фамилия</b></td>
                    <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
                    <td class="text-left"><span><?php echo $user->second_name ?>&nbsp;</span></td>
                </tr>
                <tr>
                    <td class="text-right"><b>Статус на сайте</b></td>
                    <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
                    <td class="text-left"><span><?php echo $user->Class->description ?>&nbsp;</span></td>
                </tr>
                <tr>
                    <td class="text-right"><b>Электронная почта</b></td>
                    <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
                    <td class="text-left">
                        <span><?php echo count($user->email) > 0 ? $user->email : 'Не указан</td>' ?></span>
                        <?php echo $user->getData('email_status') ?>
                    </td>
                </tr>
                <tr>
                    <td class="text-right"><b>Номер телефона</b></td>
                    <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
                    <td class="text-left">
                        <span><?php echo $user->getData('phone') ?></span>
                        <?php echo $user->getData('phone_status') ?>
                    </td>
                </tr>
                <tr>
                    <td class="text-right"><b>Дата регистрации</b></td>
                    <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
                    <td class="text-left">
                        <span> <?php echo Yii::app()->dateFormatter->format('d MMMM yyyy г.', $user->date_registration) ?></span>
                    </td>
                </tr>
                <?php if ($user->phone_read_date != 0): ?>
                    <tr>
                        <td class="text-right"><b>Доступ к базе заказчиков</b></td>
                        <td class="text-center" width="10%"><span class="glyphicon glyphicon-arrow-right"></span></td>
                        <td class="text-left"><span> До <?php echo $user->getData('phone_read_date') ?></span></td>
                    </tr>
                <?php endif; ?>
            </table>
            <div style="position: absolute; bottom: 10px; right: 10px" class="row-fluid text-right">
                <div class="col-sm-12">
                    <a class="text-info" href="<?php echo $this->createUrl('/user/settings/'); ?>">Редактировать <span
                            class="glyphicon glyphicon-edit"></span></a>
                </div>
            </div>
        </div>
        <div class="col-sm-6 well" style="min-height: 300px">
            <?php $this->Widget('UserServices', array(
                'userStatus' => $user->class,
                'model' => $user,
            )) ?>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6 well" rel="optionsBlock" style="min-height: 300px">
            <?php $this->Widget('UserOptions', array(
                'model' => $user,
            )) ?>
        </div>
        <div class="col-sm-6 well" style="min-height: 300px">
            <div class="row-fluid" id="placeData"></div>
        </div>
    </div>
    <div class="col-sm-12">
        <?php if (User::getClass() === User::MASTER): ?>

            <?php if (User::issetService()) {
                $this->renderPartial('_resume', array('model' => $model, 'user' => $user));
            } ?>

        <?php elseif (User::getClass() === User::VENDOR): ?>

        <?php elseif (User::getClass() === User::CLIENT): ?>

        <?php endif ?>
    </div>
</div>
