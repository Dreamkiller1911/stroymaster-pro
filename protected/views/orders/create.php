<?php
/* @var $this OrdersController */
/* @var $model Orders */

$this->breadcrumbs=array(
	'Список заявок'=>array('index'),
	'Добавить',
);

$this->menu=array(
	array('label'=>'List Orders', 'url'=>array('index')),
	array('label'=>'Manage Orders', 'url'=>array('admin')),
);
?>

<h1>Оставить заявку </h1>

<div class="form">

	<?php $form=$this->beginWidget('CActiveForm', array(
			'id'=>'orders-form',
			'enableAjaxValidation'=>true,
	)); ?>

	<p class="note">Поля с <span class="required">*</span> обязательные.</p>


	<div class="row">
		<?php echo $form->labelEx($model,'name'); ?>
		<?php

		echo $form->textField($model,'name',array(
				'size'=>40,
				'maxlength'=>150,
				'value' => $user->id != null? $user->first_name . ' ' . $user->second_name: '',
				'disabled' => $user->id != null ? true: false,
		));
		?>
		<?php echo $form->error($model,'name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'phone'); ?>
		<?php echo $form->textField($model,'phone', array(
			'value' => $user->id != null ? $user->phone : '',
			'disabled' => $user->id != null ? true: false,
		)); ?>
		<input type="button" value="Подтвердить" id="sendCode" style="display: <?php echo $user->id != null ? 'none;': 'inline;'?>">

		<?php echo $form->error($model,'phone'); ?>
	</div>
	<div class="row" id="codeRow" style="display: none; height: 0px">
		<?php echo CHtml::label('Код подтверждения', 'code'); ?>
		<input id="code" type="text" name="code">

		<input type="button" value="Проверить" id="checkCode">
	</div>
	<div class="row" id="loginForm" style="display: none; height: 0px">

			<?php echo CHtml::label('Пароль', 'password'); ?>
			<input type="password" name="password">

		<input type="button" value="Войти" id="login">
	</div>

	<div class="row">
		<?php echo CHtml::label('Опишите что вам нужно и Ваши требования', 'text', array('required'=>true)); ?>
		<?php echo $form->textArea($model,'text',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'text'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'date_complition'); ?>
		<?php echo CHtml::activeTextField($model,'date_complition'); ?>
		<?php echo $form->error($model,'date_complition'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Добавить'); ?>
	</div>

	<?php $this->endWidget(); ?>

</div><!-- form -->
<script>
	$('document').ready(function(){
		var name = $("input[name *= 'name']");
		var phone = $("input[name *= 'phone']").eq(0);
		var checkB = $('#sendCode');
		var sendCode = $('#checkCode');
		var loginForm = $('#loginForm');
		var form = $('form');

		var code = $('#code');

		var logined = function ($pwd) {
			var _this = this;
			$.ajax({
				type: "POST",
				url: "/site/login",
				data: {'LoginFormA': {'email': phone.val(), 'password': $pwd}},
				success: function (data) {
					var pars = JSON.parse(data);
					$('#mainmenu').html(pars.menu);
					$('#um').css('display', 'none').html(pars.usermenu).slideDown(200);

					setTimeout(function () {
						if($('#codeRow').css('display') != 'none') {
							$('#codeRow').animate({height: '-0'}, 500, function () {
								$(this).css('display', 'none');
							});
						}else{
							$('#loginForm').animate({height: '-0'}, 500, function () {
								$(this).css('display', 'none');
							});
						}
						checkB.css('display', 'none');
					}, 500);


					name.attr('disabled', true).val(pars.userName);
					phone.attr('disabled', true);
					var arg = ['Добро пожаловать!'];
					setTimeout(showMessage(arg), 1000);

				},

				error: function(XMLXttpRequest, textStatus, errorThrown){
					//alert('Логин не верный пароль!');
					arg = ['Не верный пароль', 'Попробуйте еще раз'];
					showMessage(arg, 2500);

				}
			});
		};

		var showMessage = function(arg, fade){
			var error = function(data){
				return data.join("<br>");
			};
			$('div').find('#showMessage').remove();
			if(!$('div').is('#showMessage')) {
				var div = '<div id="showMessage">' + error(arg) + '</div>';
				form.css('position', 'relative');
				var newDiv = $(div).appendTo(form).css({
					'height': '100px',
					'width': '340px',
					'top': '10px',
					'right': '150px',
					'position': 'absolute',
					'opacity': '0',
					'font-size': '12pt',
				});
				newDiv.animate({'opacity': '+1'}, 500);
				setTimeout(function(){
					newDiv.animate({'opacity': '-0'}, 500);
				},fade || 1700);
			}

		};
		var sCode = function(){
			if($.trim(code.val()).length < 1){
				console.log('Код не введен')
			}else{
				$.ajax({
					cache: true,
					type: "POST",
					url: '/user/VereCode',
					data: {'code':$.trim(code.val()), 'phone': $.trim(phone.val()), 'name':$.trim(name.val())},
					success: function(data){
						var pars = JSON.parse(data);
						var error = new Array;
						switch (pars[0]){
							case 'codeFalse':
								error = ['Код не подходит'];
								showMessage(error);
								break;
							case 'userReg':
								error = ['Поздравляем, код верный', 'Ваш пароль выслан вам в СМС'];
								showMessage(error, 6000);
								(function() {
									logined(pars[1]);
								}());
									console.log(pars);
								break;
						}
					}
				});
			}

//			console.log('Отправляем код');
		};

		var showCheck = function(_this, tic){
			var tic = tic ||60;
			$(_this).attr('disabled', true);

			var time = setInterval(function(){
				$(_this).val('Подтвердить ( ' + tic + ')');
				tic--;
				if(tic < 0){
					clearInterval(time);
					$(_this).val('Подтвердить');
					$(_this).attr('disabled', false);
				}
			}, 1000);

			$('#codeRow').css('display', 'inline').animate({height: '+50'}, 500);
		};

		checkB.click(function(){
			var error = new Array;
			if ( name.val().length < 1 ){
				error.push('Введите имя');
			}
			if ( phone.val().length < 1 ){
				error.push('Введите номер телефона')
			}
			if( isNaN(phone.val()) ){
				error.push('Номер телефона должен быть числовым:)');
			}
			if ( error.length > 0 ){
				showMessage(error);
			}else{
				var _this = this;
				$.ajax({
					cache: false,
					type: "POST",
					url: "/user/checkphone",
					data: {'name': name.val(), 'phone': phone.val()},
					success: function(data){
						var pars = JSON.parse(data);
						var error = new Array;

						if(pars == false){
							console.log('Временный пользователь не найден')
						}else{
							switch (pars[0]){
								case 'tmpTrue':
										error = ['Ранее вам уже был выслан код',
										'Если вы его не получил',
										'Нажмите "Подтвердить"'];
										showMessage(error, 5000);
										error = [];
										showCheck(_this, 10);
										sendCode.click(sCode);

									break;
								case 'userTrue':

									error = ['Вы уже зарегестрированны'];

										if(loginForm.css('display') == 'none') {
											loginForm.css('display', 'inline').animate({height: '+50'}, 400);
										}
										$('#login').click(function(){
											logined($("input[name='password']").val());
										});
									showMessage(error);
									break;
								case 'userFalse':
									error = ['Вы уже зарегестрированны', 'И не являетесь заказчиком на сайте', 'Введите другой номер'];
									loginForm.animate({height: '-0'}, 400, function(){
										$(this).css('display', 'none');
									});
									showMessage(error, 10000);
									break;
								case 'tmpReg':
										if(loginForm.css('display') == 'inline-block'){
											loginForm.animate({height: '-0'}, 400, function(){
												$(this).css('display', 'none');
												showCheck(_this);
											});
										}else showCheck(_this);
									error = ['Пароль был выслан на номер', phone.val()];

									sendCode.click(sCode);
									showMessage(error, 4000);
									break;
							}
						}

					}
				})
			}
		});

	});
</script>