/**
 * Created by Admin on 08.07.2016.
 */
function ImgServiceController() {
    var _this = this;
    this.prefix = 'imgSrv_'
    this.testIf = 0;
    this.testThen = 0;
    this.testElse = 0;

    this.initAction = function(){

    };
    this.testViewAction = function(){
        var ctrl = this.getControls()
        for (var i = 0 ; i < ctrl.length; i++){
            ctrl[i].onclick = function(event){
                var e = window.event || event;
                e.preventDefault();
                var id = this.id;
                _this.startModel('ImgService',function(model){
                    model.id = id;
                    model.getOne()
                })
            }
        }
    };
    this.uploadAllAction = function () {
        var ctrl = _this.getControls();
        var place = document.getElementById('imgList');
        if (!ctrl) return false;

        _this.startModel('ImgService', function (model) {
            ctrl[0].onclick = function () {
                var cPl = model.getProperty('numOst');

                if (Number(cPl.innerHTML) > 0) {
                    ctrl[0].onchange = function () {
                        _this.startModel('ImgService', function (model) {
                            _this.if(function(){
                                model.addAll();
                            }).then(function(result){
                                var i = 0;
                                for ( ; i < result.if.length; i++){
                                    _this.if(function(){
                                        this.render('OneImg', {'data': {'model': model}})
                                    }).then(function (result) {
                                        result.if.append(place);
                                        _this.start.init('ImgService', 'delete');
                                    }).end({'model':result.if[i]})
                                }
                            }).end({'model':model})
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
    this.deleteAction = function(){
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
