/**
 * Created by Admin on 04.08.2016.
 */
function OrdersController(){

    this.createAction = function(){
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
        this.if(function(){
            this.render('FormCreate');
        })
            .then(function(result){
                var slide = function(e){
                    if(Number(this.getAttribute('count')) === 1){
                        _this.if(function(){
                            this.start.init('User', 'login');
                        }).then(function(resUser){
                            console.log(resUser);
                        }).else(function(res){console.log(res)}).end();
                    }
                    return false;
                    result.if.effects.nextButton.slideOffBottom.apply();
                    var count = Number(this.getAttribute('count'));
                    var ret = -1;
                    if(count != 2){
                        ret = 1;
                        this.value = 'Назад';
                    }else {
                        this.value = 'Далее';
                    }
                    var a = count, b = count + ret;

                    _this.if(function(){
                        render.effects['inputElements'+a].slideOffRight.apply();
                    }).then(function(){
                        window.location.hash = 'stage' + b;
                        result.if.effects['inputElements' + b].slideOnLeft.apply();
                        result.if.effects.nextButton.slideOnLeft.apply();
                    }).else(function(){console.log('Failed test')}).end({
                        'render': result.if, 'a':a
                    });
                    //result.if.effects['inputElements' + b].slideOnLeft.apply();
                    this.setAttribute('count', b);
                };
                var begin = function(){
                    result.if.append(content);
                    result.if.bind('nextButton', 'onclick', slide);
                    triger = false
                    var count = _this._getStage()
                    result.if.effects.headForm.startIn.apply();
                    result.if.effects['inputElements'+count].slideOnLeft.apply();
                    result.if.effects.nextButton.slideOnLeft.apply(function(element){$(element).prop('count', count)});
                };
                if(getPosition(content) && triger){
                    begin()
                }
                window.onscroll = function(){
                    if(getPosition(content) && triger){
                        begin();
                    }
                }
            })
            .end()
    };
    this.indexAction = function(){
        alert('грузим index')
    }

    this._getStage = function(){
        var pattern = /stage(\d)/;
        var res = pattern.exec(window.location.hash);
        return res != undefined ? res[1] : 1;
    }
}