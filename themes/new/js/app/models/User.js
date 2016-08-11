/**
 * Created by tazeb on 24.06.2016.
 */
function User(){
    this.properties = ['id', 'email', 'phone'];
    this.prefix = 'user_';

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
}