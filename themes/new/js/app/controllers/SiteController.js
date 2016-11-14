/**
 * Created by tazeb on 18.08.2016.
 */
function SiteController() {
    this.prefix = 'SITE_';
    this.loginBlock = undefined;

    this.loginAction = function () {
        var _this = this;

        if (this.loginBlock) {
            if(this.loginBlock.result.getAttribute('status') === 'open'){
                this.loginBlock.effects.loginBlock.close.apply();
                this.loginBlock.result.setAttribute('status', 'close');
            }else{
                this.loginBlock.effects.loginBlock.show.apply();
                this.loginBlock.result.setAttribute('status', 'open');
            }
        } else {
            this.if(function () {
                this.render('LoginBlock');
            }).then(function (res) {
                _this.loginBlock = res.if;
                _this.loginBlock.append(document.body);
                _this.if(function () {
                    this.loginBlock.effects.loginBlock.show.apply();
                }).then(function () {
                    _this.loginBlock.result.setAttribute('status', 'open');
                    _this.loginBlock.effects.blockM.show.apply();
                    _this.loginBlock.bind('btnLogin', 'onclick', function () {
                        var btn = this;
                        btn.setAttribute('disabled', true);
                        _this.if(function () {
                            this.start.init('User', 'login');
                        }).then(function (res) {
                            _this.loginBlock.effects.loginBlock.close.apply();
                            _this.loginBlock.result.setAttribute('status', 'close');
                            _this.start.init('MainMenu', 'update');
                        }).else(function (res) {
                            btn.removeAttribute('disabled');
                            var data = res.if, i = 0, error, fx;
                            for (error in data){
                                i++;
                                fx = error.replace('LoginForm_', '');
                                if(_this.oldFX){
                                    _this.loginBlock.effects[_this.oldFX + 'Inp'].normal.apply()
                                }
                                _this.oldFX = fx;
                                _this.loginBlock.effects[fx + 'Inp'].error.apply()
                                _this.loginBlock.effects.info.showError.apply(data[error][0]);
                                if(i === 1) break;
                            }
                        }).end()
                    });
                    _this.loginBlock.bind('regUser', 'onclick', function(){

                        _this.if(function(){
                            this.render('RegForm');
                        }).then(function(res){
                            _this.RegForm = res.if;
                            _this.RegForm.append(document.getElementById('login-block'));
                            setTimeout(function(){
                                _this.loginBlock.effects.loginData.closeSlideLeft.apply();
                                _this.RegForm.effects.form.showSlideLeft.apply();
                                _this.RegForm.bind('btnReg', 'onclick', function(){
                                    _this.if(function(){
                                        this.start.init('User', 'register');
                                    }).then(function(){

                                    }).end();
                                });
                                _this.RegForm.bind('btnBack', 'onclick', function(){
                                    _this.RegForm.effects.form.closeSlideRight.apply();
                                    _this.loginBlock.effects.loginData.showSlide.apply();
                                });
                            },200)
                        }).end();
                    });
                }).end()
            }).end();
        }


        /*this.if(function(){
         if(isNaN(document.getElementById('login-block'))) {
         return false
         }else{
         this.render('LoginBlock');
         }
         }).then(function(resBlock){
         _this.loginBlock = resBlock.if;
         _this.loginBlock.append(document.body);
         var _loginBlock = document.getElementById('login-block');
         _loginBlock.setAttribute('viewStatus', 'open');
         _this.if(function(){
         this.render('LoginForm');
         }).then(function(resHead){
         _this._blockHead = resHead.if;
         _this.if(function(){
         loginBlock.effects.block.show.apply();

         }).then(function(){
         _this._blockHead.append(_loginBlock);
         _this._blockHead.effects.formComponent.show.apply();
         _this._blockHead.bind('logInBtn', 'onclick', function(e){
         var e = window.event || e;
         e.preventDefault();
         //--------------------Блок авторизации пользователя--------------------
         _this.if(function(){
         this.start.init('User', 'login');
         }).then(function(resLogin){
         //Если пользователь вошел на сайт, закрываем меню, и обновляем кго
         _this._blockHead.effects.formComponent.out.apply();//Скрываем компоненты меню
         setTimeout(function(){
         _this.if(function(){
         this.loginBlock.effects.block.out.apply();//Скрываем сам блок меню входа
         }).then(function(){
         _this._blockHead.effects.formComponent.out.apply();
         _this.start.init('MainMenu', 'load');
         _loginBlock.setAttribute('viewStatus', 'close');
         }).end()
         }, 600)
         }).else(function(res){
         console.log(_this.errors().showAll({
         dataError: res.if,
         errorPattern: {id: 'error_{prop}'}
         }));
         //Если пользователь не вошел на сайт, нужно показать ему почему он  не смог войти
         }).end();
         //--------------------Конец блока авторизации--------------------
         })
         }).end({'loginBlock': _this.loginBlock});

         }).end();
         }).else(function(){
         var _loginBlock = document.getElementById('login-block');
         var status = _loginBlock.getAttribute('viewStatus');
         if(status === 'open'){
         _loginBlock.setAttribute('viewStatus', 'close');
         _this.loginBlock.effects.block.out.apply();
         }else {
         _loginBlock.setAttribute('viewStatus', 'open');
         _this.loginBlock.effects.block.show.apply();
         _this._blockHead.effects.formComponent.show.apply()
         }
         }).end()*/
    };
    this.logoutAction = function () {
        var _this = this;
        var _loginBlock = document.getElementById('login-block');
        this.startModel('User', function (model) {
            _this.if(function () {
                model.logOut();
            }).then(function () {
                _this.start.init('MainMenu', 'update');
            }).end({'model': model})
        })
    }
}