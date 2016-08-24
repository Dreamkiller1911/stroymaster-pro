/**
 * Created by tazeb on 15.06.2016.
 */
function UserController()
{
    var _this = this;

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
        var _this = this;
        var ctrl = this.getControls();
        this.startModel('User', function(model){
            model.getProperties();
           _this.if(function(){
               model.logIn();
           }).then(function(){
               var currentIdServices = Object.keys(_this.start.views.Service.Service);
               console.log(_this.ctrl);
               return true;
           }).else(function(){
               alert('Не вошел');
           }).end({'model': model})
        });
    };
    this.getUserInfoAction = function(){
        this.startModel('User', function(model){
            model.getProperties();
            var phone = model.p.phone.value;
            phone = phone.replace(/\-/gm, '');
            model.getUserInfo(phone);
        });

    }
}