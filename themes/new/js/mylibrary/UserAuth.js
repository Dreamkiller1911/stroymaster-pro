/**
 * Created by tazeb on 19.04.2016.
 */
function UserAuth(){
    var _this = this;
    this.flagIn = false;
    this.blockContent = undefined;
    this.base = undefined;
    this.content = undefined;
    this.currentID = undefined;
    this.tmpInputData = undefined;
    this.dataForm = undefined;
    this.currentLigin = "";
    this.resultConfirm = undefined;

    Messager.call(this);

    this.trigForm = function(myId) {//Функция для открытия и закрытия блока и отображения содержимого
        if(_this.base === undefined) {
            var start = '<div class="container-fluid col-sm-6  col-sm-pull-3 col-md-7 col-xs-12 col-xs-offset-0" id="loginForm"><div></div></div>';

            _this.base = $(start).appendTo($('body')).css('display', 'none');
            _this.blockContent = _this.base.children().eq(0).css('opacity', 0);
        }
        var id, c;
        if(myId == undefined) {
            var target = $(event.target);//Получаем кнопку нажатую в данный момент
            id = $(target).attr('id');//Получаем id кнопки
        }else{
            id = myId;//Получаем id кнопки
        }

        descContent(id);//Записываем в переменную this.content контент на основе id

        if (_this.flagIn === false && _this.currentID === undefined && _this.content != undefined) {//Если флаг открытия false и
            // кнопка нажатия не записана в память, открываем окно
            _this.currentID = id;//Сохраняем id кнопки которая была нажата для открытия окна

            $(_this.content).appendTo(_this.blockContent);
            c = _this.base.stop().css('display', 'block').animate({'height': '250px'}, 400, 'linear', function(){
                _this.blockContent.stop().animate({'opacity': 1}, 150);
            });
            _this.flagIn = true;
            return c;
        } else if(_this.flagIn != false && _this.currentID != id && _this.content != undefined){
            _this.currentID = id;
            c = _this.blockContent.stop().animate({"opacity": 0}, 150, 'linear', function(){
                $(this).html(_this.content).animate({"opacity": 1}, 150);
            });
            return c;
        } else {
            blocClose();
        }
    };
//Функция для авторизации
    this.login = function(){
        var target = $(event.target);
        var email = target.parents().eq(1).find('input[name*="email"]');
        var password = target.parents().eq(1).find('input[name*="password"]');
        var error = $('#Login_error');
        $.ajax({
            cache: true,
            type: "POST",
            url: "/site/login",
            data: {"Login[email]": email.val(), "Login[password]": password.val()},
            dataType: "json",
            success: function(data){
                if(data['complete'] != undefined){
                    blocClose();
                    setTimeout(function(){location.reload()}, 1000);
                    _this.progress(target, true);
                }else {
                    var error = {'email': false, 'pwd': false};
                    if (data.LoginForm_email != undefined) {
                        email.css('border', '2px solid #d24b4b');
                        error.email = true;
                        _this.progress(target, true);
                    } else {
                        email.css('border', '2px solid green');
                        _this.progress(target, true);
                    }

                    if (data.LoginForm_password) {
                        password.css('border', '2px solid #d24b4b');
                        error.pwd = true;
                        _this.progress(target, true);
                    } else {
                        password.css('border', '2px solid green');
                        _this.progress(target, true);
                    }

                    if ((error.email === true && error.pwd === true) || email.val().length === 0 || password.val().length === 0) {
                        _this.showMessages('Login_error', 'Заполните все поля', 'error');
                        _this.progress(target, true);
                    } else if ((error.email === true && error.pwd === true) || email.val().length != 0 || password.val().length != 0) {
                        _this.showMessages('Login_error', 'Не верный логин или пароль', 'error');
                        _this.progress(target, true);
                    }
                }
            },
            beforeSend: function(){
                _this.progress(target);
            }
        });
    };
    this.regUser = function(){//Функция для регистрации пользователей
        var target = $(event.target);//Определяем кнопку которая была нажата
        var form = $('form[name="UserReg"]');//Находим форму регистрации
        var data = form.serialize();//Получаем введенные данные из формы
        var login = form.find('input[name*="email"]').val();
        $.ajax({
            cache: true,
            type: "POST",
            url: "/site/reg",
            data: data,
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.complete != true) {//Если ответ пришел с complete = false
                    showError(data, form);
                    _this.progress(target, true);
                }else{
                    _this.progress(target, true);
                    _this.showMessages('classNote', '<h4 class="text-center">Регистрация прошла успешно</h4>');
                    setTimeout(function(){
                        _this.trigForm('in').find('input[name*="email"]').val(login);
                    }, 2300);


                }
            },
            beforeSend: function(){
                _this.progress(target);
            }
        })
    };

    var showError = function(data, form){
        $(form).find('input').css({'border': '2px solid green'});
        $(form).find('div [id*="error_"]').html("");
        if(_this.dataForm != undefined){
        }
        for(var key in data){
            var nameSelect = key.replace('RegForm_', '');
            $(form).find('[name*="' + nameSelect +'"]').css('border', '2px solid #D24B4B').attr('title', data[key][0]);
            var errorPlace = key.replace('RegForm_', 'error_');
            _this.showMessages(errorPlace, data[key][0], 'error');

        }
    };
    var blocClose = function(){
        _this.blockContent.stop().animate({'opacity': 0}, 150, function(){
            $(this).empty();
            _this.base.stop().animate({'height': 0}, 400, 'linear', function(){
                _this.base.css('display', 'none');
                _this.base = undefined;
                _this.content = undefined;
                _this.currentID = undefined;
                _this.flagIn = false;
            });
        });

        return true;
    };
    var descContent = function(target){//Определение содержимого блока
        switch (target){
            case 'in':
                _this.content = getFormLogin();
                break;
            case 'reg':
                _this.content = getFormReg();

        }
    };
    /*Форма входа, восстановления пароля и предложение к регистрации*/
    var getFormLogin = function(){
        return '<div class="row-fluid"><div class="col-md-4 col-xs-6">' +
            '<div class="row-fluid text-center"><h4>Вход на сайт</h4></div>' +
            '<div class="form">' +
            '<form autocomplete="on">' +
            '<div class="row text-center">' +
            '<input class="" value="' + _this.currentLigin + '" type="text" name="Login[email]" placeholder="E-Mail или телефон">' +
            '</div>' +
            '<div class="row text-center">' +
            '<input  type="password" name="Login[password]" placeholder="Пароль">' +
            '</div>' +
            '<div class="row text-center">' +
            '<button style="width: 100px" class="btn btn-default" name="Login" type="submit"><span class="glyphicon glyphicon-log-in"></span> Войти</button></div>' +
            '</form>' +
            '<h5><div class="text-center text-warning" id="Login_error"></div></h5>' +
            '</div></div>' +
            '' +
            '<div class="col-md-4 col-xs-6">' +
            '<div class="row-fluid text-center"><h4>Не можете войти?</h4></div>' +
            '<form>' +
            '<div class="row text-center">' +
            '<label class="small text-info" for="Repair[email]">Укажите телефон от вашей учетной записи или E-Mail</label>' +
            '<input type="text" name="Repair[email]" placeholder="E-Mail или телефон">' +
            '</div>' +
            '<div class="row text-center"><br>' +
            '<button disabled title="Данная услуга в разработке, обратитесь к администратору" class="btn btn-default" type="submit">Получить новый пароль</button></div>' +
            '</div>' +
            '</form>' +
            '</div>'+
            '' +
            '<div class="col-md-4 hidden-xs">' +
            '<div class="row-fluid text-center"><h4>Регистрация</h4></div>' +
            '<div class="row text-center">' +
            '<label class="small text-info" for="RegUser">Вы являетесь мастером но у Вас еще нет своего резюме на сайте</label>' +
            '<input  id="reg" class="btn btn-default" type="button" name="RegUser" value="Создать профиль">' +
            '</div>' +
            '</div></div>';
    };
    /*Форма регистрации пользователя*/
    var getFormReg = function(){
        return '<div class="row form" style="padding-top: 3px"><form id="regForm" name="UserReg">' +
            '<div class="col-xs-4">' +
            '<div class="row">' +
            //'<label for="UserReg[first_name]">Имя <span class="required">*</span></label>' +
            '<input type="text" name="UserReg[first_name]" placeholder="Иван">' +
            '<br><span class="regForm small" id="error_first_name"><b>Имя</b></span>' +
            '</div>' +
            '<div class="row">' +
            //'<label for="UserReg[second_name]">Фамилия <span class="required">*</span></label>' +
            '<input type="text" name="UserReg[second_name]" placeholder="Иванов">' +
            '<br><span class=" regForm small" id="error_second_name"><b>Фамилия</b></span>' +
            '</div>' +
            '<div class="row">' +
            //'<label for="UserReg[phone]">Номер телефона <span class="required">*</span></label>' +
            '<input type="text" name="UserReg[phone]" placeholder="8-999-999-99-99">' +
            '<br><span class=" regForm small" id="error_phone"><b>Номер телефона</b></span>' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-4">' +
            '<div class="row">' +
            //'<label for="UserReg[email]">E-Mail <span class="required">*</span></label>' +
            '<input type="text" name="UserReg[email]" placeholder="Example@email.ru">' +
            '<br><span class=" regForm small" id="error_email"><b>E-Mail</b></span>' +
            '</div>' +
            '<div class="row">' +
            //'<label for="UserReg[password]">Пароль <span class="required">*</span></label>' +
            '<input type="password" name="UserReg[password]" placeholder="******">' +
            '<br><span class=" regForm small" id="error_password"><b>Пароль</b></span>' +
            '</div>' +
            '<div class="row">' +
            //'<label for="UserReg[repeat_password]">Повторите пароль <span class="required">*</span></label>' +
            '<input  type="password" name="UserReg[repeat_password]" placeholder="******">' +
            '<br><span class=" regForm small" id="error_repeat_password"><b>Повторите пароль</b></span>' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-4 text-center"><br>' +
            '<label for="UserReg[class]">Выберете кем вы будете на сайте <span class="required">*</span></label>' +
            '<select name="UserReg[class]" class="dropdown-header">' +
            '<option value="0">Мастер</option>' +
            '<option value="1">Владелец магазина</option>' +
            '<option value="2">Заказчик</option>' +
            '</select>'+
            '<div class="row">' +
            '<button class="btn btn-default" type="submit" name="btnRegUser">Регистрация</button>' +
            '</div>' +
            '<div class="row" id="classNote">' +
            '</div>' +
            '</div>' +
            '</form></div>'
    };

}