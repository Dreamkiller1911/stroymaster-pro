/**
 * Created by tazeb on 24.06.2016.
 */
function User(){
    this.properties = ['id', 'email', 'phone', 'phoneCode', 'login', 'password', 'name'];
    this.prefix = 'USER_';

    this.getAll = function(){
        this.ajax({
            type: "GET",
            url: '/user/getAll/',
            success: function(data){
                document.getElementById('com').innerHTML = data;
            }
        });
    };
    this.getUserInfo = function(phone){
        var data = {'phone': phone}
        this.ajax({
            type: "POST",
            data: data,
            url: '/user/login/',
            success: function(data){
                //document.getElementById('com').innerHTML = data;
                return data;
            }
        });
    };
    this.logIn = function () {
        var _this = this;
        var login = this.p.login || this.p.phone;
        if(!login || !this.p.password){
            var login = {error: 'user data not found'};
            return 'user data not found', false;
        }
        var login = login.value, tmpLogin, password = this.p.password.value;
        var pattern = {
            'email' : /\w+@\w+\.+?/,
            'phone' : /w/
        };
        if(pattern.email.test(login)){
            tmpLogin = login.replace(/\s/gm, '');
            this.login = tmpLogin;
        }else{
            tmpLogin = login.replace(/-|\s/g, '');
            this.login = tmpLogin;
        }
        this.password = password.replace(/\s/gm, '');

        this.ajax({
            type: "POST",
            url: "/site/login/",
            data: {'ajaxLogin': {'login': _this.login, 'password': _this.password}},
            dataType: 'json',
            success: function(data){
                return data;
            }
        });
    };
    this.logOut = function () {
        var _this = this;
        this.ajax({
            type: "POST",
            url: "/site/logout/",
            data: {'ajaxLogout': true},
            success: function (data) {
                return true;
            }
        });
    };
    this.findUser = function(name, phone){
        var _this = this;
        this.ajax({
            type: 'POST',
            url: '/user/checkPhone/',
            data: {'OrdersCheckPhone': {'name': name, 'phone': phone}},
            dataType: 'json',
            success: function (data) {
               if(data.complete === true){
                   return data;
               }else {
                   return data, false;
               }
            }
        })
    };
    this.verefyPhoneCode = function(){
        this.ajax({

        })
    }
    this.verefyCode = function(phoneCode, phone){
        this.ajax({
            type: 'POST',
            url: '/user/vereCode',
            data: {'Orders': {code: phoneCode, 'phone': phone, 'name': this.p.name.value}},
            dataType: 'json',
            success: function(data){
                console.log(data);
                if(data.complete === true){
                    return data;
                }else{
                    return data, false;
                }
            }
        })
    }
}