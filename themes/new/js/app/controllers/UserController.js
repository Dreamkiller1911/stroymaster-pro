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

    }
    this.loginAction = function(){

    }
}