/**
 * Created by tazeb on 24.06.2016.
 */
function User(){
    var _this = this;

    this.getAll = function(){
        _this.ajax({
            type: "GET",
            url: '/user/getAll/',
            success: function(data){
                document.getElementById('com').innerHTML = data;
            }
        });
    };
    this.login = function(){
        _this.ajax({
            type: "POST",
            url: '/user/login/',
            success: function(data){
                document.getElementById('com').innerHTML = data;
            }
        });
    };
}