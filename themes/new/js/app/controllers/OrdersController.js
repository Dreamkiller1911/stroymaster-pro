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
                var slide = function(){
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
                    console.log(b)
                    _this.if(function(){
                        render.effects['inputElements'+a].slideOffRight.apply();
                    }).then(function(){
                        result.if.effects['inputElements' + b].slideOnLeft.apply();
                        result.if.effects.nextButton.slideOnLeft.apply();
                    }).else(function(){console.log('Failed test')}).end({
                        'render': result.if, 'a':a
                    });
                    //result.if.effects['inputElements' + b].slideOnLeft.apply();
                    this.setAttribute('count', b);
                };
                if(getPosition(content) && triger){
                    result.if.append(content);
                    result.if.bind('nextButton', 'onclick', slide);
                    triger = false
                    result.if.effects.headForm.startIn.apply();
                    result.if.effects.inputElements1.slideOnLeft.apply();
                    result.if.effects.nextButton.slideOnLeft.apply();
                }
                window.onscroll = function(){
                    if(getPosition(content) && triger){
                        result.if.append(content);
                        result.if.bind('nextButton', 'onclick', slide);
                        triger = false
                        result.if.effects.headForm.startIn.apply();
                        result.if.effects.inputElements1.slideOnLeft.apply();
                        result.if.effects.nextButton.slideOnLeft.apply();
                    }
                }
            })
            .end()
    };
    this.indexAction = function(){
        alert('грузим index')
    }
}