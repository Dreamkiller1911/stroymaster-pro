/**
 * Created by tazeb on 14.04.2016.
 */



function orders() {
    var _this = this;
    this.ok = true;
    this.numOrders = undefined;
    this.countOrders = 5;
    this.params = undefined;

    const ERROR_NAME_NULL = 'Вам необходимо ввести свое имя и фамилию';
    const ERROR_NAME_FORMAT = 'Не похоже на имя и фамилию';

    Messager.call(this);

    /** Функция для редактирования заявки и отправки данных на сервер*/
    this.edit = function () {
        $('.client').ready(function () {
            var text = $('.order-text textarea');
            var block = $('.order-text');

            block.each(function () {
                    var h = $(this).children().eq(0).height();
                    $(this).find('textarea').height(h);
                }
            );

            $('.order-text').on('keydown, keyup', 'textarea', function () {
                var hidden = $(this).parents().eq(1).find('.hid');
                var t = $(this).val();
                t = t.replace(new RegExp('\n', 'g'), '<br>&nbsp;');
                hidden.html(t);

                var h = 40;
                if (hidden.height() > 20) h = hidden.height() + 20;
                $(this).height(h);


            })

        });

    };
    this.save = function () {
        $('.btn-save').click(function () {
            var bt = $(this);
            var progress = $(bt).parent().find('div');
            var id = $(this).attr('id').replace('save-', '');
            var txt = $.trim($(this).parents().eq(1).find('.order-text textarea').val());
            var date_start = $(this).parents().eq(1).find('#date_start').val();
            var date_complete = $(this).parents().eq(1).find('#date_complete').val();

            bt.attr('disabled', true);

            $.ajax({
                url: "/orders/update",
                cache: false,
                type: "POST",
                data: {'ajax': 'orderSave', 'id': id, 'text': txt, 'date_start': date_start, 'date': date_complete},
                dataType: 'json',
                success: function (data) {
                    if (data.complete != undefined) {
                        setTimeout(function () {
                            progress.attr('class', '');
                            bt.attr('disabled', false)
                        }, 900)
                    }
                },
                beforeSend: function (XMLHttpRequest) {
                    progress.attr('class', 'progress-bar1');
                },
                error: function (xhr) {
                    bt.attr('disabled', false)
                }
            });


        });
    };
    this.load = function () {
        _this.numOrders = $('.order-view').length;
        $(window).scrollTop();
        var ordersPlace = $('#orders');

        if ($(window).scrollTop() > (ordersPlace.height() - 450) - (window.innerHeight / 3) && _this.countOrders >= 5) {
            if (_this.ok === true) {
                _this.ok = false;
                $.ajax({
                    cache: 'false',
                    type: "POST",
                    url: "/orders/AjaxLoad",
                    data: {'stack': _this.numOrders},
                    dataType: 'json',
                    success: function (data) {

                        setTimeout(function () {
                            _this.loadProgressOff()
                            var content = data.content.join();


                            $(content).appendTo(ordersPlace);
                            _this.countOrders = data.count;
                            _this.ok = true;
                        }, 1500)

                    },
                    beforeSend: function (XMLHttpRequest) {
                        _this.loadProgressOn(ordersPlace);
                    }
                });

            }

        }
    };
    this.statusComplete = function () {
        $('.btn-complete').click(function () {
            var block = $(this).parents().eq(1);
            var id = $(this).attr('id').replace('cpl-', '');
            var bt = $(this);
            var progress = $(bt).parent().find('div');
            bt.attr('disabled', true);

            var data = {'ajax': 'setComplete', 'id': id};

            $.ajax({
                url: "/user/index",
                type: "POST",
                data: data,
                dataType: 'json',
                success: function (data) {

                    if (data.complete === true) {
                        block.animate({'opacity': 0.3}, 300, function () {
                            $(this).html(data.item).animate({'opacity': 1}, 600);
                            progress.attr('class', '');
                        })
                        bt.attr('disabled', false)
                    }
                },
                beforeSend: function (XMLHttpRequest) {
                    progress.attr('class', 'progress-bar1');
                },
                error: function (xhr) {
                    bt.attr('disabled', false)
                }

            })
        })
    };
    /** Функция для создания нового заказа и отправки на сервер*/
    this.add = function (selector) {
        var form = $(selector);
        _this.params = {
            tmpBtn: form.find('button[type*="submit"]'),
            tmpName: form.find('input[name*="name"]'),
            tmpPhone: form.find('input[name*="phone"]'),
            tmpText: form.find('textarea[name*="text"]'),
            tmpErrorAdd: form.find('span.errorMessage.add'),
            tmpConfirmPhone: form.find('button[name*="confirmPhone"]'),
            tmpErrorConfirmPhone: form.find('div.col-sm-6.errorMessage.confirmPhone'),
            tmpCodeRow: form.find('input[name*="codeRow"]'),
            tmpCheckCode : form.find('button[name*="checkCode"]'),
            tmpPassword : undefined
        };

        _this.params.tmpBtn.click(function () {
            event.preventDefault();
            try {
                /** Проверка введено ли поле name*/
                if (_this.params.tmpName.val() === '') {
                    _this.errorBorder(_this.params.tmpName, true);
                    throw ERROR_NAME_NULL;
                } else {
                    _this.errorBorder(_this.params.tmpName)
                }
                if ($.trim(_this.params.tmpName.val()).split(' ').length < 2) {
                    _this.errorBorder(_this.params.tmpName, true);
                    throw ERROR_NAME_FORMAT;
                } else {
                    _this.errorBorder(_this.params.tmpName)
                }

                if (_this.params.tmpPhone.val() === '') {
                    _this.errorBorder(_this.params.tmpPhone, true);
                    throw "Вам необходимо ввести номер телефона и подтвердить его";
                } else {
                    _this.errorBorder(_this.params.tmpPhone)
                }
                if (_this.params.tmpConfirmPhone.css('display') != 'none') {
                    _this.errorBorder(_this.params.tmpPhone, true);
                    _this.errorBorder(_this.params.tmpConfirmPhone, true);
                    throw "Вам необходимо подтвердить номер вашего телефона";
                } else {
                    _this.errorBorder(_this.params.tmpPhone);
                    _this.errorBorder(_this.params.tmpConfirmPhone);
                }
                if(_this.params.tmpText.val() === undefined || _this.params.tmpText.val() === ''){
                    _this.errorBorder(_this.params.tmpText, true)
                    throw "Оставлять пустой заказ не хорошо. Пожалуйста напишите что-нибудь";
                }else{
                    _this.errorBorder(_this.params.tmpText);
                }
                $.ajax({
                    cache: true,
                    type: "POST",
                    url: "/orders/create",
                    data: form.serialize(),
                    dataType: "json",
                    success: function(data){
                        if(data.complete != true){
                            _this.progress(_this.params.tmpBtn);
                            _this.showMessages(_this.params.tmpErrorAdd, '<h4> ' + data.message + ' </h4>', 'error');
                        }else{
                            _this.showMessages(_this.params.tmpErrorAdd, '<h4> ' + data.message + ' </h4>');
                            setTimeout(function(){
                                _this.progress(_this.params.tmpBtn);
                                location.replace('/orders/');
                            }, 2300)
                        }
                    },
                    beforeSend: function(XMLHttpRequest){
                        _this.progress(_this.params.tmpBtn)
                    }
                });
            } catch (e) {
                _this.showMessages(_this.params.tmpErrorAdd, '<h4> ' + e + ' </h4>', 'error');
            }
        });
        _this.params.tmpConfirmPhone.click(function () {
            try {
                /** Проверка введено ли поле name*/
                console.log(typeof user);
                if (_this.params.tmpName.val() === '') {
                    _this.errorBorder(_this.params.tmpName, true);
                    throw ERROR_NAME_NULL;
                } else {
                    _this.errorBorder(_this.params.tmpName)
                }

                if ($.trim(_this.params.tmpName.val()).split(' ').length < 2) {
                    _this.errorBorder(_this.params.tmpName, true);
                    throw ERROR_NAME_FORMAT;
                } else {
                    _this.errorBorder(_this.params.tmpName)
                }

                if (_this.params.tmpPhone.val() === '') {
                    _this.errorBorder(_this.params.tmpPhone, true);
                    throw "Вам необходимо ввести номер телефона и подтвердить его";
                } else {
                    _this.errorBorder(_this.params.tmpPhone)
                }

                $.ajax({
                    cache: false,
                    type: "POST",
                    url: "/user/checkphone/",
                    data: form.serialize(),
                    dataType: "json",
                    success: function (data) {
                        try {
                            if (data.complete != true) {
                                throw data;
                            } else {
                                switch (data.type) {
                                    case 'userReady'://Действия если пользователь уже зарегестрирован
                                        _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> ' + data.message + ' </h4>');
                                        setTimeout(function () {
                                            _this.progress(_this.params.tmpConfirmPhone, true);
                                            var user = new UserAuth();
                                            user.currentLigin = data.login;
                                            user.trigForm('in')
                                        }, 3200);
                                        break;
                                    case 'sendCode'://Действия после высылания кода
                                        actCodeForm('open');
                                        _this.progress(_this.params.tmpConfirmPhone, true);
                                        _this.progressTime(_this.params.tmpConfirmPhone, data.timeLimit)
                                        _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> ' + data.message + ' </h4>');
                                        break;
                                }
                            }
                        } catch (e) {
                            _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> ' + e + ' </h4>', 'error');
                        }
                    },
                    beforeSend: function (XMLHttpRequest) {
                        _this.progress(_this.params.tmpConfirmPhone)
                    }
                });

            } catch (e) {
                _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> ' + e + ' </h4>', 'error');
            }
        })
        _this.params.tmpCheckCode.click(function () {
            _this.showMessages(_this.params.tmpErrorConfirmPhone, '');

            try {
                var code = $.trim(_this.params.tmpCodeRow.val());
                if(code === '') {
                 throw "Вам необходимо ввести код для проверки"
                 }else if(code.length != 4){
                 throw "Формат кода не верный"
                 }
                var data = {
                    "Orders": {
                        "code": code,
                        "phone": _this.params.tmpPhone.val(),
                        "name": _this.params.tmpName.val()
                    }
                };

                $.ajax({
                    cache: true,
                    type: "POST",
                    url: '/user/VereCode',
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        try {
                            if (data.complete != true) {
                                throw data;
                            } else {
                                _this.params.tmpPassword = data.password;
                                _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> ' + data.message + ' </h4>');

                                setTimeout(function(){
                                    login()}, 3200
                                );
                            }
                        } catch (e) {
                            _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> ' + e + ' </h4>', 'error');
                            _this.progress(_this.params.tmpCheckCode, true)
                        }

                    },
                    beforeSend: function(XMLHttpRequest){
                        _this.progress(_this.params.tmpCheckCode)
                    }
                });

            } catch (e) {
                _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> ' + e + ' </h4>', 'error');
            }
        });
    };
    /** Функция для автоматического входа в систему после подтверждения телефона*/
    var login = function(){
        _this.progress(_this.params.tmpCheckCode, true);//Снимаем прогресс с кнопки
        $.ajax({
            cache: false,
            type: "POST",
            url: "/site/login",
            data: {'LoginFormA' : {'email': _this.params.tmpPhone.val(), 'password': _this.params.tmpPassword}},
            dataType: "json",
            success: function (data) {
                _this.progress(_this.params.tmpErrorConfirmPhone, true);
                _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h3>Добро пожаловать</h3>')
                _this.showMessages(_this.params.tmpErrorConfirmPhone, '<h4> Добро пожаловать </h4>');
                 $('#mainmenu').html(data.menu);
                 $('#um').css('display', 'none').html(data.usermenu).slideDown(200);
                 actCodeForm()

                 _this.params.tmpName.attr('disabled', true).val(data.userName);
                 _this.params.tmpPhone.attr('disabled', true);
                _this.params.tmpConfirmPhone.css('display', 'none');

                 setTimeout(function(){
                     _this.showMessages(_this.params.tmpErrorConfirmPhone, '')}, 2300
                 );

            },
            beforeSend: function(XMLHttpRequest){
                _this.progress(_this.params.tmpErrorConfirmPhone)
            }
        });

    };
    /** Функция открытия и закрытия формы проверки кода подтверждения*/
    var actCodeForm = function ($triger) {
        var codeForm = $('#codeForm');//Сама форма Проверки кода
        if ($triger === 'open') {//Если open то открываем, если ничего то закрываем
            codeForm.stop().css('display', 'block').animate({'height': '100px'}, 200, 'linear');//Анимируем при открытии по высоте
        }else{
            codeForm.stop().animate({height: '-0'}, 500, function () {
                $(this).css('display', 'none');//Анимируем при закрытии и отключаем
            });
        }

    };
/** Эти функции нужно перенести в Proto -> Messager*/
    this.loadProgressOn = function (pl) {
        var progress = '<div class="progress-bar1"></div>';
        $(progress).appendTo(pl);
    };
    this.loadProgressOff = function () {
        $('div .progress-bar1').remove();
    };

}
