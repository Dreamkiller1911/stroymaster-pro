/**
 * Created by tazeb on 15.06.2016.
 */
function UserController()
{
    var _this = this;

    this.whenLogin = function(){

    };

    this.getAll = function(){
        var ctrl = _this.getControls();
        console.log(ctrl)
        ctrl[0].onclick = function(){
            window.event.preventDefault();
            _this.startModel('User', function(model){
                model.getAll();
            })
        };

    };
    this.loginAction = function(){
           this.if(function(){
               this.startModel('User', function(model){
                   model.getProperties();
                   model.logIn();
               });
           }).then(function(result){
               var loginData = result.if;
               if(loginData.complete === true){
                   return true;
               }else{
                   return loginData.error, false;
               }
           }).else(function(res){
               return res.if;
           }).end()
    };
    this.registerAction = function(){
        var _this = this;
        this.if(function(){
            this.startModel('User');
        }).then(function(res){
            var model = res.if;
            var data = {};
            model.getProperties();
            if(model.p.class.getElementsByClassName('active')){
                data.class = model.p.class.getElementsByClassName('active')[0].getElementsByTagName('input')[0];
            }

            console.log(5)
        }).end();
    };
    this.getUserInfoAction = function(){
        this.startModel('User', function(model){
            model.getProperties();
            var phone = model.p.phone.value;
            phone = phone.replace(/\-/gm, '');
            model.getUserInfo(phone);
        });

    };
    this.findUserAction = function(){
        this.startModel('User', function(model){
            model.getProperties();
            var name, phone;
            try {
                name = model.p.name.value;
                phone = model.p.phone.value;
            }catch (e){
                return 'no data user', false;
            }
            if(name === '') {return 'Введите имя и фамилию', false;}
            if(name.split(' ').length < 2) {return 'Похоже что имя и фамилия введены не полностью', false;}
            if(phone === ''){return 'Введите номер телефона', false;}

            model.findUser(name, phone);
        })
    };
    this.confirmPhoneCodeAction = function(){
        var _this = this;
        var ctrl = this.getControls();
        if(!ctrl){return false;}
        ctrl[0].onclick = function(){
            _this.if(function(){
                this.startModel('User');
            }).then(function(res){
                var model = res.if;
                if(!model.p.phoneCode){
                    model.getProperties()
                }
                var phoneCode = model.p.phoneCode.value;
                var phone = model.p.phone.value;
                var pattern = {
                    noWords: /\D/,
                    spaceTrim: /w/
                };
                if(phoneCode === ''){ return 'Введите код', false;}
                if(pattern.noWords.exec(phoneCode || phoneCode.length != 4)){ return 'Не верный формат кода', false;}
                _this.if(function(){
                    model.verefyCode(phoneCode, phone)
                }).then(function(res){
                    return res.if;
                }).else(function(res){
                   return res.if, false;
                }).end({'model': model, 'phoneCode': phoneCode, 'phone': phone})

            }).end();
        }
    }
}