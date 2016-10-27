/**
 * Created by tazeb on 25.06.2016.
 */
function ServicesController() {
    this.timeIterator = 0;
    this.statusLoadIndex = true;
    this.toScroll = false;
    this.isLoadScroll = 0;
    this.oldArr = '';
    this.numElements = 0;

    this.viewModalAction = function () {
        //ОБЯЗАТЕЛЬНО ПЕРЕДЕЛАТЬ
        var _this = this;
        var ctrl = this.getControls();
         for (var i = 0; i < ctrl.length; i++) {
            ctrl[i].onclick = function () {
                var id_service = this.id;
                _this.if(function(){
                    this.startModel('Services')
                }).then(function(res){
                    var model = res.if;
                    model.viewFromId(id_service)
                }).end();
            }
        }
    };
    this.indexAction = function () {
        var _this = this;
        var content = document.getElementById('content');
        var serviceBody = document.querySelector('[rel="services"]'); //Блок для вставки результата рендера профилей пользователей

        if(!serviceBody){
            serviceBody = document.createElement('div');
            serviceBody.setAttribute('class', 'col-sm-12');
            serviceBody.setAttribute('rel', 'services');
            content.innerHTML = '';
        }

        this.start.oldContent = {
            start: _this.start,
            parent: _this,
            'element': serviceBody,
            close: function(){
                var _this = this.parent;
                _this.if(function(){
                    this.start.views.Services.Service.effects.service.closeAll.apply();
                }).then(function(){
                    var content = document.getElementById('content');
                    $(content).stop().animate({'height': 0}, 100, function(){
                        $(this).css('height', 'auto').text('');
                        return true;
                    })
                }).end()
            }};
        var getPosition = function (elem) {
            var rect = elem.getBoundingClientRect();
            var docMarginTop = getComputedStyle(document.body).marginTop.replace(new RegExp('[a-z]+', 'i'), '');
            var currentScroll = document.body.scrollTop;
            var posCenter = document.documentElement.clientHeight / 2;
            var posBottom = document.documentElement.clientHeight;
            if ((rect.bottom - docMarginTop) > posCenter && rect.bottom < posBottom) {
                return false, true;
            }
            return false, false;
        };
        this.setOldId = function(dataId){
            var _this = this;
            var _result = 'new';
            if(!dataId) return _result;
            if(dataId.length > 0){
                _result = dataId;
            }else{
                _result = false;
            }
            return false, _result;
        };
        _this.scrollLoad = function (e){
            if(getPosition(serviceBody) && _this.toScroll){
                window.removeEventListener('scroll', _this.scrollLoad);
                _this.toScroll = false;
                _this.if(function(){
                    this.startModel('Services', function(model, prop){
                        model.loadData(prop.id)
                    }, {'id': id})
                }).then(function(res){
                    _this.ticService = 0;
                    var data = res.if;
                    _this.if(function(){
                        load(data, this, srb);
                    }).then(function(){
                        window.addEventListener('scroll', _this.scrollLoad);
                    }).end({'load': load, 'data':data, 'srb': serviceBody})
                }).end({'id': _this.oldArr})
            }
        };
        var load = function(data, _this, srb){
            var od = _this.setOldId(data.oldArr);
            _this.oldArr = od;
            var i;
            for ( i = 0; i < data.length; i++){
                    _this.if(function(){
                        this.render('Service', {
                            view: data[this.ticService].view
                        });
                        this.ticService++;
                    }, {'queue': true}).then(function(render){
                        _this.isLoadScroll++;
                        var service = render.if;
                        service.append(srb || serviceBody);
                        _this.numElements++;
                        if(_this.isLoadScroll === data.length){
                            _this.if(function(){
                                service.effects.service.show.apply();
                            }).then(function(){
                                _this.toScroll = true;

                            }).end({'service': service});
                        }else {
                            service.effects.service.show.apply();
                        }
                    }).end({'data': data});
            }

        };

        this.if(function(){
            this.startModel('Services');
        }).then(function(res){
            var model = res.if;
            _this.if(function(){
                model.loadBaseData();
            }).then(function(res){
                content.innerHTML = res.if;
               _this.if(function(){
                   model.loadData('new')
               }).then(function(res){
                   _this.ticService = 0;
                   var data = res.if;
                   load(data, _this);
               }).end({'model': model});
            }).end({'model': model});
        }).end();

        /*this.if(function(){
            this.startModel('Services', function(model){
                model.loadData('new')
            });
        }).then(function(res){
            _this.ticService = 0;
            var data = res.if;
            load(data, _this);
        }).end();*/
        window.addEventListener('scroll', _this.scrollLoad, false);
    };

    this.crud = function () {
        this.start.init('ImgService', 'uploadAll')
        var _this = this;
        var place = document.getElementById('imgList');
        _this.startModel('ImgService', function (model) {
            _this.if(function () {
                model.getAllFromIdService(1);
            }).then(function (result) {
                var i = 0, res = result.if, imgModel = [];
                for ( ; i < res.length; i++){
                    _this.if(function(){
                        this.render('OneImg', {ctrl: 'ImgService', data: {'now':89207582615, 'model':model}})
                    }).
                        then(function(result){
                        _this.timeIterator ++;
                        setTimeout(function(){
                            result.if.append(place);
                            result.if.bind('globalAnimate', 'onmouseover', function(){result.if.effects.globalAnimate.op01()});
                            result.if.bind('globalAnimate', 'onmouseleave', function(){result.if.effects.globalAnimate.op04()});
                            setTimeout(function(){result.if.effects.globalAnimate.fadeOut()}, 2000)
                            _this.start.init('ImgService', 'delete');
                        }, 150 * _this.timeIterator);
                    }).
                        else(function(result){
                        console.log('Рендер завершился неудачей ')
                    }).
                        end({'model':res[i]});
                }
            }).end({
                'model': model
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