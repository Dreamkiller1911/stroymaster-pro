/**
 * Created by tazeb on 20.08.2016.
 */
function SiteView() {

    this.tic = 0;
    this.open = false;
    this.tic = 0;
    this.tics = 0;
    this.includeMask = function(){
        if(!document.getElementById('jquery.mask.min.js')){
            var script = document.createElement('script');
            var head = document.getElementsByTagName('head')[0];
            script.src = '/themes/new/js/app/plugins/jQuery-Mask-Plugin-master/dist/jquery.mask.min.js';
            script.setAttribute('id', 'jquery.mask.min.js');
            script.onload = function(){ return true;};
            head.appendChild(script);
        }
    };

    this.viewLoginBlock = function () {
        var _this = this;
        this.if(function(){
            this.include({
                path: 'views/site/login.html',
                effects: this.loginEffects
            })
        }).then(function(res){
            var a = _this.show(res.if);
            return a;
        }).end();
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

    this.loginEffects = {
        loginBlock: [
            ['pre', function(element){
                $(element).css({'height': 0, 'opacity': 0})
            }, true],
            ['show', function(element){
                $(element).css('display', 'block').stop().animate({height: 240, opacity: 1}, 400, function(){
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
        inpLogin: [
            ['pre', function(){}, true]
        ],
        btnLogin: [
            ['pre', function(element){
                var pattern = /^((?:\+7)|(?:8))?[\s\-\(]?(\d{3})[\s\-\)]?/;
                var _this = this.parent;
                element.onkeydown = function(e){
                    var event = window.event || e;
                    //console.dir(event);
                }

                element.onkeyup = function(){
                    if(pattern.test(this.value)){
                        _this.if(function(){
                            this.includeMask();
                        }).then(function(){
                            $(element).mask('+7(000) 000-00-00')
                        }).end();
                    }
                }
            }, true]
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
        info: [
            ['show', function(element){
                $(element).stop().animate({'height': 100})
            }, false]
        ]
    };
}