/**
 * Created by tazeb on 20.08.2016.
 */
function SiteView() {

    this.tic = 0;
    this.open = false;
    this.tic = 0;
    this.tics = 0;
    this.testS = function(){
        setTimeout(function(){
            return true;
        }, 2000)
    };



    this.viewLoginBlock = function () {
        var _this = this;
        var loginEffects = {
            loginBlock: [
                ['pre', function(element){
                    $(element).css({'height': 0, 'opacity': 0})
                }, true],
                ['show', function(element){
                    $(element).css('display', 'block').stop().animate({height: 200, opacity: 1}, 400, function(){
                        return true;
                    })
                }, false],
                ['close', function(element){
                    $(element).stop().animate({'height':0, 'opacity': 0}, 400, function(){
                        $(this).css('display', 'none');
                        return true;
                    })
                }, false]
            ],
            blockM: [
                ['pre', function(element){
                    $(element).each(function(){
                        $(this).css('opacity', 0);
                    })
                }, true],
                ['show', function(element){
                    var self = this.parent;
                    self.tic = 0;
                    $(element).each(function(){
                        self.tic++;
                        var _this = this;
                        setTimeout(function(){

                            $(_this).animate({'opacity': 1}, 400, function(){
                                self.tics++;
                                if(self.tics === 3){
                                    return true;
                                }
                            });
                        }, 150 *  self.tic)
                    })
                }, false]
            ],
            errorBlock: [
                ['pre', function(element){
                    var top = $(element).parent().css('top');
                   $(element).css({'background': 'red', 'position': 'absolute', 'top': top, 'left': 150, 'right': 0, 'z-index': 940})
                }, true],
                ['show', function(element){
                    $(element).stop().animate({'height': 100})
                }, false]
            ]
        };
        this.if(function(){
            this.include({
                path: 'views/site/login.html',
                effects: loginEffects
            })
        }).then(function(res){
            var a = _this.show(res.if);
            return a;
        }).end({'loginEffects': loginEffects})
        /*return this.show(
            this.addEffect('block',
                '<div class="container-fluid col-sm-6  col-sm-pull-3 col-md-7 col-xs-12 col-xs-offset-0" id="login-block">' +

                '</div>',
                [
                    ['pre', function (element) {

                    }, true],
                    ['show', function (element) {
                        $(element).animate({'height': 200, 'opacity' : 1}, 300, function(){
                            return true;
                        })
                    }, false],
                    ['out', function (element) {
                        $(element).animate({'height': 0, 'opacity': 0}, 300, function(){
                            return true;
                        })
                    }, false]
                ])
        );*/
    };
    this.viewLoginForm = function () {
        var _this = this;
        return this.show(
            '<div class="row-fluid">' +
                this.addEffect('formComponent',
                '<div class="col-md-4 col-xs-6">' +
                    '<div class="row-fluid text-center"><h4>Вход на сайт</h4></div>' +
                    '<div class="form">' +
                    '<form autocomplete="on">' +
                    '<div class="row text-center">' +
                    '<input StartModel="USER_login" class="form-control" type="text" name="Login[email]" placeholder="E-Mail или телефон">' +
                    '<span class="error" id="error_email"></span>' +
                    '</div>' +
                    '<div class="row text-center">' +
                    '<input StartModel="USER_password" class="form-control"  type="password" name="Login[password]" placeholder="Пароль">' +
                    '<span class="error" id="error_password"></span>' +
                    '</div>' +
                    '<div class="row">' +
                    this.toBind('logInBtn',
                    '<button class="btn btn-default btn-block" name="Login" ' +
                    'type="submit"><span class="glyphicon glyphicon-log-in"></span> Войти</button></div>') +
                    '</form>' +
                    '<h5><div class="text-center text-warning" id="Login_error"></div></h5>' +
                    '</div>' +
                    '</div>' +
                '<div class="col-md-4 col-xs-6">' +
                    '<div class="row-fluid text-center"><h4>Не можете войти?</h4></div>' +
                    '<form>' +
                    '<div class="row text-center ">' +
                    '<label class="small text-info" for="Repair[email]">Укажите телефон от вашей учетной записи или E-Mail</label>' +
                    '<input class="form-control" type="text" name="Repair[email]" placeholder="E-Mail или телефон">' +
                    '<label>&nbsp;</label>' +
                    '<button disabled title="Данная услуга в разработке, обратитесь к администратору" ' +
                    'class="btn btn-default btn-block" type="submit">Получить новый пароль</button>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                '<div class="col-md-4 hidden-xs">' +
                    '<div class="row-fluid text-center"><h4>Регистрация</h4></div>' +
                    '<div class="row text-center">' +
                    '<label class="small text-info" for="RegUser">Вы являетесь мастером но у Вас еще нет своего резюме на сайте</label>' +
                    '<input  class="btn btn-default" type="button" name="RegUser" value="Создать профиль">' +
                    '</div>' +
                '</div>',
                [
                    ['show', function(element){
                        $(element).each(function () {
                            $(this).css('margin-top', 0);
                        })
                    }, true],
                    ['out', function(element){
                        _this.tic = 0;
                        $(element).each(function () {
                            _this.tic ++;
                            var item = this;
                            setTimeout(function(){
                                $(item).animate({'margin-top': -500}, 900);
                            }, 100 * _this.tic)
                        })
                    }, false]
                ]) +
            '</div>'
        );
    };
    this.viewRegisterForm = function () {

    }
}