/**
 * Created by tazeb on 25.06.2016.
 */
function ServiceController() {
    var _this = this;
    this.statusLoadIndex = true;
    this.t = function(per){
        console.log('t')
        return 'qwe';
    }
    this.proprrr;
    this.viewModal = function () {
        var ctrl = _this.getControls();
        for (var i = 0; i < ctrl.length; i++) {
            ctrl[i].onclick = function () {
                var id_service = this.id;
                _this.startModel('Service', function (model) {
                    model.viewFromId(id_service);
                })
            }
        }
    };
    this.indexLoad = function () {
        var getPosition = function (elem) {
            var rect = elem.getBoundingClientRect();
            var docMarginTop = getComputedStyle(document.body).marginTop.replace(new RegExp('[a-z]+', 'i'), '');
            var currentScroll = document.body.scrollTop;
            var posCenter = document.documentElement.clientHeight / 2;
            var posBottom = document.documentElement.clientHeight;

            if ((rect.bottom - docMarginTop) > posCenter && rect.bottom < posBottom) {
                return true;
            }
            return false;
        }
        var serviceBody = document.querySelector('[rel="services"]');
        if (getPosition(serviceBody) && _this.statusLoadIndex) {
            _this.statusLoadIndex = false;
            _this.startModel('Service', function (model) {
                model.loadScroll(serviceBody, _this.properties.indexLoad.Id);
                model.statusLoadIndex = false;


            })
        }
        window.onscroll = function () {
            if (getPosition(serviceBody) && _this.statusLoadIndex) {
                _this.statusLoadIndex = false;
                _this.startModel('Service', function (model) {
                    model.loadScroll(serviceBody, _this.properties.indexLoad.Id);
                    model.statusLoadIndex = false;


                })
            }

        };


    };
    this.crud = function () {

        _this.startModel('ImgService', function (model) {

            _this.if(function () {
               var t = model.getAllFromIdService(1);

            }).then(function (result) {
                console.log(result.if)

            }).end({
                'model':model
            });

        });

        var prop = this.properties.crud;
        var act = _this.getControls();
        _this.startModel('Service', function (model) {
            model.getProperties();
            model.p.description.onblur = function () {
                model.save();
            }
        });
        act[0].onclick = function (event) {
            var e = window.event || event;
            e.preventDefault;


            _this.startModel('Service', function (model) {
                model.getProperties();
                _this.
                if(function () {
                    model.save()
                }).
                then(function () {
                    model.viewFromId(1);

                }).
                else(function () {
                    alert('Не удалось выполнить запрос на сохранение')

                }).
                end({'model': model})
            });

        }
    }


}