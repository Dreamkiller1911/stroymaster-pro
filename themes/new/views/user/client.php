<?php
/**
 * @property $user->first_name;
 * @property $user->second_name;
 */
$this->breadcrumbs = array(
    'Мой профиль'
);
$this->widget('application.extensions.fancybox.EFancyBox', array(
        'target' => 'a[rel=gallery]',
        'config' => array(),
    )
);
?>
<div class="row-fluid" id="profile">

    <div class="row">&nbsp;</div>
    <div class=" row-fluid">
        <div class="col-xs-12 well">
            <div class="row-fluid text-center">
                <h4>Добро пожаловать в личный кабинет</h4>
            </div>
            <div class="row-fluid">
                <hr>
            </div>
            <div class="row-fluid text-center">
                <h4><b class="text-muted">Личные данные</b></h4>
            </div>


            <table width="100%" align="center"><!--Таблица начало-->
                <tr>
                    <td align="center">
                        <table>
                            <tr>
                                <td class="text-right"><b>Фамилия</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><input style="cursor: pointer;border: none; background: none"
                                                             type="text"
                                                             value="<?php echo $user->first_name ?>&nbsp;" disabled>
                                </td>
                            </tr>


                            <tr>
                                <td class="text-right"><b>Имя</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><input style="cursor: pointer;border: none; background: none"
                                                             type="text"
                                                             value="<?php echo $user->second_name ?>&nbsp;" disabled>
                                </td>

                            </tr>
                            <tr>
                                <td class="text-right"><b>Телефон</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><?php $this->widget('CMaskedTextField', array(
                                        'model' => $user,
                                        'attribute' => 'phone',
                                        'mask' => '8-999-999-99-99',
                                        'htmlOptions' => array(
                                            'value' => $user->id != null ? $user->phone : '',
                                            'disabled' => $user->id != null ? true : false,
                                        )
                                    )) ?></td>
                            </tr>
                            <tr>
                                <td class="text-right"><b>E-Mail</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><input style="cursor: pointer;border: none; background: none"
                                                             type="text"
                                                             value="<?php echo $user->email != '' ? $user->email : 'Не указан'; ?>&nbsp;"
                                                             disabled></td>
                            </tr>
                        </table>
                    </td>


                    <td align="center">
                        <table>
                            <tr>
                                <td class="text-right"><b>Статус на сайте</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><?php echo $user->Class->description ?></td>
                            </tr>

                            <tr>
                                <td class="text-right"><b>Дата регистрации</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><?php echo date('d.m.Y',$user->date_registration) ?></td>
                            </tr>
                            <tr>
                                <td class="text-right"><b>Всего заказов</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><?php echo count($user->Orders) ?></td>
                            </tr>
                            <tr>
                                <td class="text-right"><b>Активных заказов заказов</b></td>
                                <td width="15%" class="text-center"><span
                                        class="glyphicon glyphicon-arrow-right"></span></td>
                                <td class="text-left"><?php echo Orders::getActiveStatus() ?></td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
        </div>
    </div>


    <div class="row-fluid">
        <?php $this->renderPartial('_listOrders', array('model'=>$user->Orders))?>
    </div>

</div>
