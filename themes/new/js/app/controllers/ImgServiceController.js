/**
 * Created by Admin on 08.07.2016.
 */
function ImgServiceController() {
    var _this = this;
    this.prefix = 'imgSrv_';

    this.init = function(){

    };
    this.uploadAll = function () {

        var ctrl = _this.getControls();
        if (!ctrl) return false;

        _this.startModel('ImgServiceForm', function (model) {
            ctrl[0].onclick = function () {
                var cPl = model.getProperty('numOst');

                if (Number(cPl.innerHTML) > 0) {
                    ctrl[0].onchange = function () {
                        _this.startModel('ImgServiceForm', function (model) {
                            model.addAll();
                        });
                    }
                } else {
                    confirm('Вы исчерпали лимит по изображениям для вашего резюме');
                    return false;
                }
            }
        });


        ctrl[0].onchange = function () {


            _this.startModel('ImgServiceForm', function (model) {
                model.addAll();
            });


        }


    };
    this.delete = function(){
        var ctrl = _this.getControls();

        for(var i = 0; i < ctrl.length; i++){
            ctrl[i].onclick = function(){
                console.log(this.id);
            }
        }
    }

}
