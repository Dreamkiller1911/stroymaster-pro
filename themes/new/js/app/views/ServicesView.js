/**
 * Created by tazeb on 24.07.2016.
 */
function ServicesView() {
    this.tic = 0;
    this.ticClose = 0;
    this.ticImg = 0;
    this.toScroll = true;

    this.viewService = function (model, user, images) {
        var _this = this;
        this.if(function(){
            this.show({
                effects: this.serviceEffects
            });
        }).then(function(res){
            return res.if;
        }).end()

    };

    this.serviceEffects = {
        'service': [
            ['init', function (element) {
                var _this = this.parent;
                $(element).css({'opacity': 0, 'margin-left': -500});
                _this.start.init('Services', 'viewModal')
            }, true],
            ['show', function (element) {
                var _this = this.parent;
                _this.tic++;
                if (_this.tic > 6) _this.tic = 1;
                setTimeout(function () {
                    $(element).css('opacity', 0).animate({'opacity': 1, 'margin-left': 0}, 250, function(){
                        return true;
                    })
                }, 100 * _this.tic)
            }, false],
            ['closeAll', function (element){
                var _this = this.parent;
                var block =$(element).parent().children();
                var l = block.length;
                var i;
                for(i = l; i >= 0; i--){
                    $(block[i]).stop().animate({'height': 0, 'opacity': 0}, 800, function(){
                        _this.ticClose++;
                        $(this).css('display', 'none').remove();
                        if(_this.ticClose == l - 2){
                            return true;
                        }
                    })
                }
            }, false]
        ],
        'textBlock': [
            ['listen', function (element) {
            var _this = this.parent;
            var onWheel = function (e) {
                var event = window.event || e ;
                var delta = event.deltaY || event.detail || event.wheelDelta; //Направление скрола 100 или - 100, up or down
                var hText = Number($(this).css('height').replace(/px/i, ''));//Высота блока текста резюме
                var hHead = Number($(this).prev().css('height').replace(/px/i, ''));//Высота шапки резюме
                var hBlock = Number($(this).parent().css('height').replace(/px/i, ''));//Высота родительского блока
                var hImg = Number($(this).next().css('height').replace(/px/i, ''));//Высота блока с изображением
                var numScroll = hText - (hBlock - hImg);
                var oldTop = Number($(this).css('top').replace(/px/i, ''));
                var hTmp = oldTop;
                var value = delta > 0 ? 100 : -100;
                if(numScroll < 0) return false, false;
                hTmp = isNaN(hTmp) ? -value: hTmp + -value;
                if((hHead - hTmp) < 0){
                    hTmp = hHead;
                }
                if(hTmp < -numScroll && hTmp > -numScroll - 200){
                    hTmp = -numScroll;
                }
                if(hTmp === oldTop) return false, false;
                if(_this.toScroll){
                    _this.toScroll = false;
                    $(this).css({'position': 'absolute'}).animate({'top': hTmp}, 300, function(){
                        _this.toScroll = true;
                    });
                }
                _this._stopEvent(event);
            };
            _this._addEventWheel(element, onWheel);
        }, true],
        ],
        'imgBlock': [
            ['showImg', function (element) {
                var el = window.getComputedStyle($(element).children(0)[0]);
                $(element).mouseenter(function () {
                    var h = Number(el.height.replace(/px/i, '')) + 15 + 'px';
                    $(this).stop().animate({'max-height': h}, 400)
                });
                $(element).mouseleave(function () {
                    $(this).stop().animate({'max-height': 60}, 400)
                });
            }, true]
        ],
        'imgList': [
            ['init', function (element) {
                $(element).each(function () {
                    $(this).css('opacity', 0).fancybox([]);
                })
            }, true],
            ['show', function (element) {
                var _this = this.parent;
                $(element).each(function () {
                    _this.ticImg++;
                    var elem = this;
                    setTimeout(function () {
                        $(elem).animate({'opacity': 1}, 300);
                    }, 250 * _this.ticImg);
                })
            }, true]
        ],
        'moreButton': [
            ['init', function (element) {
                var wBlock = Number($(element).parent().css('width').replace(/px|%|pt|em/i, ''));
                var wSpan = Number($(element).find('.more-label').css('width').replace(/px|%|pt|em/i, ''));
                $(element).css({
                    'margin-left' : wBlock - wSpan,
                })
            }, true],
            ['show', function (element) {
                var _this = this.parent;
                var wBlock = Number($(element).parent().css('width').replace(/px|%|pt|em/i, ''));
                var wSpan = Number($(element).find('.more-label').css('width').replace(/px|%|pt|em/i, ''));
                var label = $(element).find('.more-label');
                var btn = $(element).parent().find('input');



                _this._leftMore = function(target, element){
                    var label = $(target).find('.more-label');
                    var btn = $(target).parent().find('input');
                    if (!$(label).hasClass('more-open')) return false;
                    setTimeout(function () {
                        $(btn).stop().animate({'width': 0}, 100, function () {
                            $(this).css({'opacity': 0, 'font-size': '1.3em'});
                            $(label).removeClass('more-open').parent().stop().animate({'margin-left': wBlock - wSpan});
                        })
                    }, 500);
                };
                $(label).mouseenter(function (e) {
                    var event = window.event || e;
                    var label = $(event.target.parentNode).find('.more-label');
                    var btn = $(event.target.parentNode).parent().find('input');
                    var nameTimeOut = 'timeOutMoreLeft_' + $(btn)[0].id;
                    if(_this[nameTimeOut]){clearInterval(_this[nameTimeOut])}
                    if($(this).hasClass('more-open')) return false;
                    $(this).addClass('more-open').parent().stop().animate({'margin-left': 0}, 300, function(){
                        $(btn).css({'opacity': 1, 'font-size': '1.3em', 'background-size': '30px'}).stop().animate({'width': wBlock - 29 }, 100, function(){
                        });
                        _this[nameTimeOut] = setTimeout(function(){
                            if(!$(btn).is(':hover')){
                                _this._leftMore(event.target.parentNode, element);
                            }
                        }, 1000)
                    })
                });
                $(btn).mouseleave(function (e) {
                    var event = window.event || e;
                    var btn = $(event.target.parentNode).parent().find('input');
                    var nameTimeOut = 'timeOutMoreLeft_' + $(btn)[0].id;
                    if(_this[nameTimeOut]){clearInterval(_this[nameTimeOut])}
                    _this._leftMore(event.target.parentNode);
                });
            }, true]
        ]
    };

    this._stopEvent = function(e){
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    };
    this._addEventWheel = function(element, onWheel){
        if (element.addEventListener) {
            if ('onwheel' in document) {
                element.addEventListener("wheel", onWheel);
            } else if ('onmousewheel' in document) {
                element.addEventListener("mousewheel", onWheel);
            } else {
                element.addEventListener("MozMousePixelScroll", onWheel);
            }
        } else {
            element.attachEvent("onmousewheel", onWheel);
        }
    }

    this.viewFinalBlock = function () {
        return this.show(
            '<div class="col-sm-12">' +
            this.addEffect('finalText', '<p>Благодарим вас за просмотр данного ресурса! Enjoy ;)</p>', [
                ['init', function (element) {
                    $(element).parent().css('position', 'relative');
                    $(element).css({'position': 'absolute', 'opacity': 0, 'left': -200}).
                    animate({'opacity': 1, 'left': 30}, 280, function () {
                        $(this).animate({'left': -10}, 80, function () {
                            $(this).animate({'left': 0}, 20)
                        })
                    });
                }, true]
            ]) +
            '</div>'
        );
    };

}
