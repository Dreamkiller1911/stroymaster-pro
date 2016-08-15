/**
 * Created by tazeb on 25.06.2016.
 */
function ServiceController() {
    var _this = this;
    this.timeIterator = 0;
    this.statusLoadIndex = true;
    this.scrollTo = undefined;
    this.oldArr = '';

    this.t = function (per) {
        console.log('t')
        return 'qwe';
    };
    this.viewModalAction = function () {
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
    this.indexLoadAction = function () {
        var _this = this;
        var serviceBody = document.querySelector('[rel="services"]');
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
        };
        var setOldId = function(dataId){
            var _result = 'new';
            if(!dataId[0]) return _result;
            if(dataId[0].length > 0){
                _result = dataId[0];
            }else{
                _result = false;
            }
            return _result;
        };
        this.if(function(){
            this.startModel('Service', function(model){
                model.loadData('new')
            });
        }).then(function(data){
            _this.oldArr = setOldId(data.if.oldArr);
            var i = 0;
            for ( ; i < data.if.result.length; i++){
                _this.if(function(){
                    this.render('Service',{'data':{'model': model, 'user': user, 'images': images}})

                }).then(function(render){
                    render.if.append(serviceBody);
                }).end({'model': data.if.result[i].service, 'user': data.if.result[i].user, 'images': data.if.result[i].images});
            }
        }).end();
        window.onscroll = function(e){
           if(getPosition(serviceBody) && _this.statusLoadIndex){
               if(_this.scrollTo != undefined && _this.scrollTo != window.scrollY){
                   return false
               }else {
                   _this.scrollTo = window.scrollY;
               }
               _this.statusLoadIndex = false;
               _this.if(function(){
                   this.startModel('Service', function(model){
                       model.loadData(id)
                   })
               }).then(function(res){
                   _this.oldArr = setOldId(res.if.oldArr);
                   var i = 0;
                   for ( ; i < res.if.result.length; i++){
                       _this.if(function(){
                           this.render('Service',{'data':{'model': model, 'user': user, 'images': images}})

                       }).then(function(render){
                           render.if.append(serviceBody);
                           //if(i === res.if.result.length) console.log(i);
                       }).end({'model': res.if.result[i].service, 'user': res.if.result[i].user, 'images': res.if.result[i].images});

                       if(i === res.if.result.length -1){
                           _this.statusLoadIndex = true;
                           _this.scrollTo = undefined;
                       }
                   }
               }).else(function(){
                   console.log('Рендерим финальный блок');
               }).end({'id': _this.oldArr})
           }
        };
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