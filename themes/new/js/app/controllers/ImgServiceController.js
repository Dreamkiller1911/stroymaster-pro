/**
 * Created by Admin on 08.07.2016.
 */
function ImgServiceController(){
    var _this = this;
    this.prefix = 'imgSrv_';

    this.upload = function(){

        var ctrl = _this.getControls();
        if(!ctrl) return false;

        ctrl[0].onchange = function(){
            window.event.preventDefault();
            _this.startModel('ImgServiceForm', function(model){
                model.addAll();
            });

        }
    };

}
