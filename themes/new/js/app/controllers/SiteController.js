/**
 * Created by tazeb on 18.08.2016.
 */
function SiteController ()
{
    this.prefix = 'SITE_';
    this.loginBlock = undefined;


    this.loginAction = function(){
        var _this = this;
        this.if(function(){
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
                var blockHead = resHead.if;
                _this.if(function(){
                    loginBlock.effects.block.show.apply();

                }).then(function(){
                    blockHead.append(_loginBlock);
                    blockHead.effects.formComponent.show.apply();
                    blockHead.bind('logInBtn', 'onclick', function(e){
                        var e = window.event || e;
                        e.preventDefault();
                        //Блок авторизации пользователя
                        _this.if(function(){
                            this.start.init('User', 'login');
                        }).then(function(resLogin){
                            blockHead.effects.formComponent.out.apply();
                            setTimeout(function(){
                                _this.loginBlock.effects.block.out.apply();
                            }, 600)
                        }).end();
                        //Конец блока авторизации
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
            }
        }).end()
    };
    this.logoutAction = function(){
        this.startModel('User', function(model){
            model.logOut();
        })
    }
}