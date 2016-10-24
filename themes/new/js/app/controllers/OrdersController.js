/**
 * Created by Admin on 04.08.2016.
 */
function OrdersController() {
    this.prefix = '_CTRL_ORDERS_';

    this.createAction = function () {
        var _this = this;
        var content = document.getElementById('content');
        var startForm = function(){
            _this.if(function(){
                this.startModel('Orders', function(model){
                    model.getFormData();
                })
            }).then(function(res){
                _this.if(function(){
                    this.render('FormCreate', {
                        'view': data
                    })
                }).then(function(res){
                    _this.formOrder = res.if;
                    _this.formOrder.append(content);
                    _this.formOrder.bind('btnSendOrder', 'onclick', function(e){
                        var self = this;
                        this.setAttribute('disabled', 'true');
                        _this.if(function(){
                            this.start.init('Orders', 'sendFormCreate')
                        }).then(function(res){
                            _this.formOrder.effects.informConfirmPhone.showSuccess.apply('<h4>' + res.if + '</h4>');
                        }).else(function(res){
                            var msg = res.if;
                            _this.formOrder.effects.informConfirmPhone.showError.apply('<h4>' + msg + '</h4>');
                            self.removeAttribute('disabled');
                        }).end();
                    });
                    _this.if(function(){
                        this.start.init('Orders', 'acceptUser');
                    }).then(function(){
                        _this.formOrder.effects.btnSendOrder.unlock.apply();
                    }).end()
                }).end({'data': res.if})
            }).end()
        }
        if(typeof this.start.oldContent === 'object'){
            this.if(function(){
                this.start.oldContent.close();
            }).then(function(){
                startForm();
            }).end()
        }else{
            startForm();
        }
        /*var content = document.getElementById('formCreate');
        var triger = true
        var getPosition = function (elem) {
            var rect = elem.getBoundingClientRect();
            var docMarginTop = getComputedStyle(document.body).marginTop.replace(new RegExp('[a-z]+', 'i'), '');
            var currentScroll = document.body.scrollTop;
            var posCenter = document.documentElement.clientHeight / 2;
            var posBottom = document.documentElement.clientHeight;
            if ((rect.bottom - docMarginTop) > posCenter && rect.bottom < posBottom) {
                return true;
            }
            return false;
        }
        this.if(function () {
                this.render('FormCreate');
            })
            .then(function (result) {
                var exec = true;
                var slide = function () {
                    var btn = this;

                    if (Number(this.getAttribute('count')) === 1 && exec) {
                        exec = false;

                        _this.if(function () {
                            this.start.init('User', 'getUserInfo');
                        }).then(function (resUser) {
                            result.if.effects.nextButton.slideOffBottom.apply();
                            _this.if(function () {
                                render.effects['inputElements1'].slideOffRight.apply();
                            }).then(function () {
                                window.location.hash = 'stage2';
                                btn.setAttribute('count', 2);
                                btn.setAttribute('value', 'К первому шагу');
                                result.if.effects['inputElements2'].slideOnLeft.apply();
                                result.if.effects.nextButton.slideOnLeft.apply();
                                exec = true;
                            }).else(function () {

                                console.log('Failed test')

                            }).end({
                                'render': result.if
                            });
                        }).else(
                            function (res) {
                                console.log(res)
                            }
                        ).end(
                            {'result': result}
                        );
                    }else{
                        _this.if(function () {
                            render.effects['inputElements2'].slideOffRight.apply();
                        }).then(function () {
                            window.location.hash = 'stage1';
                            btn.setAttribute('count', 1);
                            btn.setAttribute('value', 'Шаг второй');
                            result.if.effects['inputElements1'].slideOnLeft.apply();
                            result.if.effects.nextButton.slideOnLeft.apply();
                            exec = true;
                        }).else(function () {

                            console.log('Failed test')

                        }).end({
                            'render': result.if
                        });
                    }

                    return false;*/
                    //result.if.effects['inputElements' + b].slideOnLeft.apply();
/*
        this.if(function(){
            this.render('FormCreate');
        })
            .then(function(result){
                var slide = function(e){
                    var count = Number(this.getAttribute('count'));
                    var ret = -1;
                    if(count != 2){
                        ret = 1;
                        this.value = 'Назад';
                    }else {
                        this.value = 'Далее';
                    }
                    var a = count, b = count + ret;
                    if(Number(this.getAttribute('count')) === 1){
                        _this.if(function(){
                            this.start.init('User', 'getUserInfo');
                        }).then(function(resUser){
                            result.if.effects.nextButton.slideOffBottom.apply();
                            _this.if(function(){
                                render.effects['inputElements'+a].slideOffRight.apply();
                            }).then(function(){
                                window.location.hash = 'stage' + b;
                                result.if.effects['inputElements' + b].slideOnLeft.apply();
                                result.if.effects.nextButton.slideOnLeft.apply();
                            }).else(function(){console.log('Failed test')}).end({
                                'render': result.if, 'a':a
                            });
                        }).else(function(res){
                            console.log(res)
                        }).end();
                    }
                    this.setAttribute('count', b);*/
                    //result.if.effects['inputElements' + b].slideOnLeft.apply();

                /*};
                var begin = function () {
                    result.if.append(content);
                    result.if.bind('nextButton', 'onclick', slide);
                    triger = false
                    var count = _this._getStage()
                    result.if.effects.headForm.startIn.apply();
                    result.if.effects['inputElements' + count].slideOnLeft.apply();
                    result.if.effects.nextButton.slideOnLeft.apply(function (element) {
                        $(element).prop('count', count)
                    });
                };
                if (getPosition(content) && triger) {
                    begin()
                }
                window.onscroll = function () {
                    if (getPosition(content) && triger) {
                        begin();
                    }
                }
            })
            .end()*/
    };
    this.sendFormCreateAction = function(){
        var _this = this;
        this.if(function(){
            this.startModel('Orders');
        }).then(function(res){
            var model = res.if;
            model.getProperties();
            var prop = model.p.allPropertiesTo('ajax');
            if(prop.text === ''){ return 'Необходимо заполнить поле с описанием задания', false;}
            model.createOrder(prop);

        }).end();
    };

    this.acceptUserAction = function () {
        //Проверка номера телефона в базе пользователей, регистрация и вход, для форма оформления заказа услуги
        var ctrl = this.getControls();
        var _this = this;
        ctrl[0].onclick = function(){
           _this.if(function(){
               this.startModel('Orders', function(model){
                   model.checkUserFromServer();
               });
           }).then(function(res){
               var userData = res.if;
               var formOrder = _this.formOrder.effects;
               switch (userData.type){
                   case 'sendCode':
                       formOrder.loginBlock.close.apply();
                       formOrder.codeBlock.show.apply();
                       formOrder.informConfirmPhone.showSuccess.apply('<h4>' + userData.message + '</h4>');
                       var checkCode = function checkCode (){
                           _this.if(function(){
                               this.start.init('User', 'confirmPhoneCode')
                           }).then(function(res){
                               formOrder.informConfirmPhone.showSuccess.apply('<h4>' + res.if.message + '</h4>');
                               console.log(res.if);
                           }).else(function(res){
                               _this.formOrder.effects.informConfirmPhone.showError.apply('<h4>' + res.if + '</h4>');
                               checkCode();
                           }).end()
                       };
                       checkCode();
                       break;
                   case 'userReady':
                       formOrder.codeBlock.close.apply();
                       formOrder.loginBlock.show.apply();
                       formOrder.informConfirmPhone.showSuccess.apply('<h4>' + userData.message + '</h4>');
                       _this.formOrder.bind('loginBtn', 'onclick', function(){
                           _this.if(function(){
                               this.start.init('User', 'login')
                           }).then(function(){
                               //Если пользователь смог авторизоваться, тогда выполнить подготовку формы
                               _this.start.init('MainMenu', 'update');
                               formOrder.codeBlock.close.apply();
                               formOrder.loginBlock.close.apply();
                               formOrder.checkPhoneBtn.close.apply();
                               formOrder.inpName.lock.apply();
                               formOrder.inpPhone.lock.apply();
                               return true;
                           }).else(function(){
                               formOrder.informConfirmPhone.showError.apply('<h4>Не верный пароль</h4>');
                           }).end();
                       })
                       break;
               }
               formOrder.checkPhoneBtn.loaded.apply(10);
           }).else(function(res){
               _this.formOrder.effects.informConfirmPhone.showError.apply('<h4>' + res.if + '</h4>');
           }).end();
        }
    };


    this.indexAction = function () {
        alert('грузим index')
    };
    this.listAction = function(){
        var service = this.start.views.Service.Service;
        console.log(service)
        var i;
        for( i = 0; i < service.length; i++){
            if(!service[i]) continue;
            service[i].effects.service.close.apply();
        }
       console.log()
    };

    this._getStage = function () {
        var pattern = /stage(\d)/;
        var res = pattern.exec(window.location.hash);
        return res != undefined ? res[1] : 1;
    }
}