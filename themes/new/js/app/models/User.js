/**
 * Created by tazeb on 24.06.2016.
 */
function User(){
    this.properties = ['id', 'email', 'phone', 'login', 'password'];
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
        var login = this.p.login.value, tmpLogin, password = this.p.password.value;
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
                if(data.complete){
                    return true;
                }
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
                console.log(_this.start.views.MainMenu.Menu);
            }
        });
    }
}