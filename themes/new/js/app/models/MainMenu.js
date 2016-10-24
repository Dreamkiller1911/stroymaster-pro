/**
 * Created by Admin on 02.08.2016.
 */
function MainMenu(){

    this._testComBlock = function(){
        setTimeout(function() {
           return 'error_code_829', false;
        }, 2000);

    };
    this.modLogic = function(){
        return true;
    };
    this.ret = function(test){
        /*
        Тестовый комментарий
         */
        console.log(test, 2222);
        this._testComBlock();
        /*
         Тестовый комментарий 2
         */
        this.if(function(){
            this.modLogic();
        }).then(function(){
            return 'data';
        }).end()

    };
    this.myTest = function (b, c, d) {

        var x = 3241;
        var y = 2324;
        var _this = this;
        var _f = function (b, c, d) {
            return false, b + c - d;
        };
        var sumer = function(a,b){
            return false, a+b;
        };
        var t = sumer();
        setTimeout(function() {
            _this.ret(sumer(x,y)); _f(5,2,4);
        }, 1000);


    };

    this.getData = function(){
        this.ajax({
            type: "POST",
            url: '/site/MainMenuGenerate/',
            data: {},
            dataType: "json",
            success: function(data) {
               return data;
            }
        });
    }
}