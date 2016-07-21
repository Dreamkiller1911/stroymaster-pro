/**
 * Created by Admin on 08.07.2016.
 */
function ImgServiceController() {
    var _this = this;
    this.prefix = 'imgSrv_'
    this.testIf = 0;
    this.testThen = 0;
    this.testElse = 0;

    this.init = function(){

    };
    this.testView = function(){
        var ctrl = this.getControls()
        for (var i = 0 ; i < ctrl.length; i++){
            ctrl[i].onclick = function(){
                window.event.preventDefault();
                var id = this.id;
                _this.startModel('ImgService',function(model){
                    model.getOne(id)
                })
            }
        }
    };
    this.uploadAll = function () {

        var ctrl = _this.getControls();
        if (!ctrl) return false;

        _this.startModel('ImgService', function (model) {
            ctrl[0].onclick = function () {
                var cPl = model.getProperty('numOst');

                if (Number(cPl.innerHTML) > 0) {
                    ctrl[0].onchange = function () {
                        _this.startModel('ImgService', function (model) {
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
            _this.startModel('ImgService', function (model) {
                model.addAll();
            });
        }
    };
    this.delete = function(){
        var ctrl = _this.getControls();

        for(var i = 0; i < ctrl.length; i++){
            ctrl[i].onclick = function(){
                var id = this.id;
                var btn = this;
                _this.
                if(function(){
                    this.startModel('ImgService', function(model){
                        model.delete(id)
                    });
                }).
                then(function(){
                   var blockElement = btn.parentElement.parentElement;
                    blockElement.parentElement.removeChild(blockElement);
                }).
                else(function(){
                    alert('Удаление завершено с ошибкой, все файлы были сохранены')
                }).
                end({'id':id})
        }
        }
    }

}
