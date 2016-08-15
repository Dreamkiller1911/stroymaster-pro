/**
 * Created by Admin on 04.08.2016.
 */
function OrdersController() {

    this.createAction = function () {
        var _this = this;
        var content = document.getElementById('formCreate');
        var triger = true
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
        this.if(function () {
                this.render('FormCreate');
            })
            .then(function (result) {
                var exec = true;
                var slide = function () {
                    var btn = this;

                    if (Number(this.getAttribute('count')) === 1 && exec) {
                        exec = false;

                        _this.if(function () {
                            this.start.init('User', 'getUserInfo');
                        }).then(function (resUser) {
                            result.if.effects.nextButton.slideOffBottom.apply();
                            _this.if(function () {
                                render.effects['inputElements1'].slideOffRight.apply();
                            }).then(function () {
                                window.location.hash = 'stage2';
                                btn.setAttribute('count', 2);
                                btn.setAttribute('value', 'К первому шагу');
                                result.if.effects['inputElements2'].slideOnLeft.apply();
                                result.if.effects.nextButton.slideOnLeft.apply();
                                exec = true;
                            }).else(function () {

                                console.log('Failed test')

                            }).end({
                                'render': result.if
                            });
                        }).else(
                            function (res) {
                                console.log(res)
                            }
                        ).end(
                            {'result': result}
                        );
                    }else{
                        _this.if(function () {
                            render.effects['inputElements2'].slideOffRight.apply();
                        }).then(function () {
                            window.location.hash = 'stage1';
                            btn.setAttribute('count', 1);
                            btn.setAttribute('value', 'Шаг второй');
                            result.if.effects['inputElements1'].slideOnLeft.apply();
                            result.if.effects.nextButton.slideOnLeft.apply();
                            exec = true;
                        }).else(function () {

                            console.log('Failed test')

                        }).end({
                            'render': result.if
                        });
                    }

                    return false;
                    //result.if.effects['inputElements' + b].slideOnLeft.apply();
/*
        this.if(function(){
            this.render('FormCreate');
        })
            .then(function(result){
                var slide = function(e){
                    var count = Number(this.getAttribute('count'));
                    var ret = -1;
                    if(count != 2){
                        ret = 1;
                        this.value = 'Назад';
                    }else {
                        this.value = 'Далее';
                    }
                    var a = count, b = count + ret;
                    if(Number(this.getAttribute('count')) === 1){
                        _this.if(function(){
                            this.start.init('User', 'getUserInfo');
                        }).then(function(resUser){
                            result.if.effects.nextButton.slideOffBottom.apply();
                            _this.if(function(){
                                render.effects['inputElements'+a].slideOffRight.apply();
                            }).then(function(){
                                window.location.hash = 'stage' + b;
                                result.if.effects['inputElements' + b].slideOnLeft.apply();
                                result.if.effects.nextButton.slideOnLeft.apply();
                            }).else(function(){console.log('Failed test')}).end({
                                'render': result.if, 'a':a
                            });
                        }).else(function(res){
                            console.log(res)
                        }).end();
                    }
                    this.setAttribute('count', b);*/
                    //result.if.effects['inputElements' + b].slideOnLeft.apply();

                };
                var begin = function () {
                    result.if.append(content);
                    result.if.bind('nextButton', 'onclick', slide);
                    triger = false
                    var count = _this._getStage()
                    result.if.effects.headForm.startIn.apply();
                    result.if.effects['inputElements' + count].slideOnLeft.apply();
                    result.if.effects.nextButton.slideOnLeft.apply(function (element) {
                        $(element).prop('count', count)
                    });
                };
                if (getPosition(content) && triger) {
                    begin()
                }
                window.onscroll = function () {
                    if (getPosition(content) && triger) {
                        begin();
                    }
                }
            })
            .end()
    };
    this.indexAction = function () {
        alert('грузим index')
    }

    this._getStage = function () {
        var pattern = /stage(\d)/;
        var res = pattern.exec(window.location.hash);
        return res != undefined ? res[1] : 1;
    }
}