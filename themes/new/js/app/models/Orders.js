/**
 * Created by tazeb on 13.10.2016.
 */
function Orders (){
    this.prefix = '_ORDERS_';
    this.properties = ['text', 'date_start', 'date_complete'];

    this.getFormData = function () {
        this.ajax({
            type: 'POST',
            url: '/orders/create/',
            data: {'getAjaxData': true},
            dataType: 'html',
            success: function (data){
                return data;
            }
        })
    };
    this.checkUserFromServer = function(){
        var _this = this;

        this.if(function(){
            this.start.init('User', 'findUser')
        }).then(function(res){
            return res.if;
        }).else(function(res){
            return res.if, false;
        }).end()
    };
    this.createOrder = function(prop){
        this.ajax({
            type: 'POST',
            url: '/orders/create/',
            data: {'OrdersCreate': prop},
            dataType: 'json',
            success: function (data){
                console.log(data);
               if(data.complete){
                   return data.message;
               }else {
                   return data.message, false;
               }
            }
        })
    }
}