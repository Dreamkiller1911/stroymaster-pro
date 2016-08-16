/**
 * Created by tazeb on 24.07.2016.
 */
function ServiceView() {
    this.tic = 0;
    this.ticImg = 0;
    this.btnMoreLeaveTimeou = undefined;
    this.toScroll = 0;

    this.viewService = function (model, user, images) {
        var _this = this;
        var imgList = ' ';
        if (images.length > 0) {
            var i = 0, tmpData = [], element = '', p = window.location.origin;
            for (; i < images.length; i++) {
                images[i].description = images[i].description != null ? images[i].description : '';
                element = '<a rel="my_img_' + images[i].id_service + '" href="' + p + images[i].url + '" title="' + images[i].description + '">' +
                    '<img src="' + p + images[i].simple_url + '" height="50px"></a>';
                tmpData.push(element);
            }
            imgList = tmpData.join('');
        }
        return this.show(
            this.addEffect('service', '<div class="col-lg-4 col-sm-6 content">', [
                ['init', function (element) {
                    $(element).css({'opacity': 0, 'margin-left': -500});
                    _this.start.init('Service', 'viewModal')
                }, true],
                ['show', function (element) {
                    _this.tic++;
                    if (_this.tic > 6) _this.tic = 1;
                    setTimeout(function () {
                        $(element).css('opacity', 0).animate({'opacity': 1, 'margin-left': 0}, 250)
                    }, 100 * _this.tic)
                }, true]
            ]) +
            '<div class="row">' +
            '<div class="col-sm-12">' +
            '<div class="body">' +
            '<div style="z-index: 10" StartCtrl="Service_viewModal" class="note" id="' + model.id + '">' +
            '<p>' + model.note + '</p>' +
            '</div>' +
            this.addEffect('textBlock', '<div class="text"><p>' + model.description + '</p></div>', [
                ['listen', function (element) {
                    var onWheel = function (e) {
                        e = e || window.event;
                        var delta = e.deltaY || e.detail || e.wheelDelta;
                        var toScroll = 0;
                        var hText = Number($(this).css('height').replace(/px/i, ''));
                        var hBlock = Number($(this).parent().css('height').replace(/px/i, ''));
                        var hImg = Number($(this).next().css('height').replace(/px/i, ''));
                        var numScroll = hText - (hBlock - hImg);
                        var hTmp = Number($(this).css('top').replace(/px/i, ''));
                        if(numScroll < 0) return false;

                        hTmp = isNaN(hTmp) ? -delta: hTmp + -delta;
                        console.log(hTmp, -numScroll, hTmp < -numScroll && hTmp > -numScroll - 100);
                        console.log(hTmp < -numScroll, hTmp === -numScroll - 100);

                        if(hTmp < -numScroll && hTmp > -numScroll - 100){
                            hTmp = -numScroll;
                        }
                        //console.log(_this.toScroll, numScroll)
                        $(this).css({'position': 'absolute'}).animate({'top': hTmp});
                        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    };
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
                    /*$(element).onmousewheel(function(){
                     var block = window.getComputedStyle(element);
                     var parent = window.getComputedStyle($(element).parent()[0]);
                     var imgBlock = window.getComputedStyle($(element).next()[0]);
                     var h1 = Number(block.height.replace(/px/i, ''));
                     var h2 = Number(parent.height.replace(/px/i, '')) - Number(imgBlock.height.replace(/px/i, ''))
                     if(h1 < h2) return false;
                     //$(document.body).css('overflow', 'hidden');
                     //$(this).parent().css('overflow', 'hidden');
                     //$(this).css({'position': 'absolute', 'top': -100});
                     });*/
                }, true]
            ]) +
            this.addEffect('imgBlock', '<div class="imgList">', [
                'showImg', function (element) {
                    var el = window.getComputedStyle($(element).children(0)[0]);
                    $(element).mouseenter(function () {
                        var h = Number(el.height.replace(/px/i, '')) + 15 + 'px';
                        $(this).stop().animate({'max-height': h}, 400)
                    });
                    $(element).mouseleave(function () {
                        $(this).stop().animate({'max-height': 60}, 400)
                    });
                }, true
            ]) +
            '<div style="overflow: hidden; bottom: 0; position: static">' +
            this.addEffect('imgList', imgList, [
                ['init', function (element) {
                    $(element).each(function () {
                        $(this).css('opacity', 0).fancybox([]);
                    })
                }, true],
                ['show', function (element) {
                    $(element).each(function () {
                        _this.ticImg++;
                        var elem = this;
                        setTimeout(function () {
                            $(elem).animate({'opacity': 1}, 300);
                        }, 250 * _this.ticImg);
                    })
                }, true]
            ]) +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-12 ">' +
            '<div class="row userInfo" style="position: relative">' +
            '<div class="col-sm-12"><span' +
            'class="glyphicon glyphicon-user">' + user.first_name + ' ' + user.second_name + '</span>' +
            '</div>' +
            '<div class="col-sm-12"><span' +
            'class="glyphicon glyphicon-phone"> ' + user.phone + '</span>' +
            '</div>' +
            this.addEffect('moreButton', '<input id="' + model.id + '" class="btn btn-default btn-block btn-sm"' +
                'StartCtrl="Service_viewModal"' +
                'value="Подробнее"' +
                'type="button">', [
                    ['init', function (element) {
                        $(element).css({
                            'width': 0,
                            'opacity': 0,
                            'height': 0,
                            'position': 'absolute',
                            'font-size': '1.3em'
                        })
                    }, true],
                    ['show', function (element) {
                        $(element).parent().mouseover(function () {
                            var cst = window.getComputedStyle($(element).parent()[0]);
                            $(element).stop().animate({'width': cst.width, 'opacity': 1, 'height': cst.height}, 220);
                        });
                        $(element).parent().mouseleave(function () {
                            _this.btnMoreLeaveTimeou = setTimeout(function () {
                                $(element).stop().animate({'width': 0, 'opacity': 0, 'height': 0}, 220);
                            }, 500);
                        });
                    }, true]
                ]
            ) +
            '</div>' +
            '</div>' +
            '</div>'
        );
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
