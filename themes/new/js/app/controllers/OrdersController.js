/**
 * Created by Admin on 04.08.2016.
 */
function OrdersController(){

    this.createAction = function(){
        var _this = this;
        var content = document.getElementById('formCreate');
        var btnCheck = this.getControls('check');
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

                if(getPosition(content) && triger){
                    result.if.append(content)
                    triger = false
                    result.if.effects.headForm.startIn();
                    result.if.effects.inputElements1.slideOnLeft()
                }
                window.onscroll = function(){
                    if(getPosition(content) && triger){
                        result.if.append(content);
                        result.if.bind('nextButton', 'onclick', function(){
                            var limit = 2;
                            var count = Number(this.getAttribute('count'));
                            var ret = -1;
                            if(count != limit){
                                ret = 1;
                                this.value = 'Назад';
                            }else {
                                this.value = 'Вперед';
                            }
                            var a = count, b = count + ret;
                            _this.if(function(){
                                console.log(4);
                                render.effects['inputElements'+a].slideOffRight();
                            }).then(function(){
                                console.log('Render');
                            }).end({
                                'render': result.if, 'a':a
                            });
                            result.if.effects['inputElements' + b].slideOnLeft();
                            this.setAttribute('count', b);
                        });
                        var inp = document.getElementById('');
                        triger = false
                        result.if.effects.headForm.startIn();
                        result.if.effects.inputElements1.slideOnLeft()
                        result.if.effects.nextButton.slideOnLeft()
                    }
                }
            })
            .end()
    };
    this.indexAction = function(){
        alert('грузим index')
    }
}