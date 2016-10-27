/**
 * Created by tazeb on 04.08.2016.
 */
function OrdersView() {

    var self = this;
    this.tic = 1;
    this.trigers = {'label': false};
    this.lastHeight = false;
    this.slideOnLeft = function (element) {
        var _this = this, t = 0;
        _this.formLInterval = 0;
        var main = element[0].parentNode.parentNode.parentNode;
        var currentHeight = '';
        self.lastHeight = !self.lastHeight ? currentHeight = window.getComputedStyle(main).height : self.lastHeight;
        $(main).css('height', 'auto');
        $(element).each(function(){
            $(this).css({'opacity': 0, 'display': 'block'});
            currentHeight = window.getComputedStyle(main).height;
        });
        var tmp = currentHeight.replace(/[^\d\s]+/, '');
        $(main).css('height', self.lastHeight.replace(/[^\d\s]+/, '')).animate({'height': tmp}, 500);
        self.lastHeight.replace(/[^\d\s]+/, '');
        self.lastHeight = currentHeight;

        $(element).each(function () {
            var self = this;
            $(this).css({'margin-left': 500, 'margin-top': 130, 'opacity': 0, 'display': 'block'});
            _this.formLInterval++;
            setTimeout(function () {
                t++;
                $(self).animate({'margin-left': 0, 'opacity': 1, 'margin-top': 0}, 500, function(){
                    if(t === element.length) return true;
                });
            }, 100 * _this.formLInterval);
        })
    };
    this.slideOffRight = function (element) {
        var _this = this, t = 1, l = element.length;
        this.formLInterval = 1;
        $(element).each(function () {
            var self = this;
            _this.formLInterval++;
            setTimeout(function () {
                $(self).css({'position': 'relative'}).
                animate({'margin-left': 500, 'opacity': 0}, 500, function () {
                    $(this).css('display', 'none');
                    t++;
                    if(t === l){
                        setTimeout(function(){
                            return 'Вторая фаза рендеринга';
                        }, 120)
                    }
                });


            }, 110 * _this.formLInterval);

        })
    };

    this.viewFormCreate = function () {
        var _this = this;
        var script = document.createElement('script');
        script.src = window.location.origin + '/themes/new/js/app/plugins/jQuery-Mask-Plugin-master/dist/jquery.mask.min.js';
        script.onload = function () {
            _this.if(function(){
                this.show({
                    effects: this.createFormEffects
                });
            }).then(function(res){
                return res.if;
            }).end();
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
        console.log(script.src);


    }
    /*this.startInInterval = 0;
     this.formLInterval = 0;
     return this.show(
     '<div class="row" >' +
     '<div class="col-sm-10 col-sm-offset-1 well">' +
     '<form name="Orders_create">' +
     this.addEffect('headForm',
     '<div class="row-fluid text-center" >' +
     '<h4>Форма заявок на ремонт и строительство</h4>' +
     '<h5>Пожалуйста, заполните все поля</h5>' +
     '</div>', [
     ['startIn', function (element) {
     $(element).children().each(function () {
     $(this).css('opacity', 0);
     _this.startInInterval++;
     $(this).animate({"opacity": 1}, 800 * _this.startInInterval)

     })
     }, false]
     ]) +
     '<br>' +
     '<div class="col-sm-8">' +
     this.addEffect('inputElements1',
     '<div class="row">' +
     '<div class="col-sm-12">' +
     this.addEffect('label', '<label class="label label-default"><span>Ваше имя и фамилия</span></label>',[
     ['pre', function(element){$(element).css('opacity', 0)}, true],
     ]) +
     '<input class="form-control" type="text" placeholder="Иван Иванов">' +
     '</div>' +
     '</div>' +
     '<br>' +
     '<div class="row">' +
     '<div class="col-sm-12">' +
     this.addEffect('label', '<label class="label label-default"><span>Контактный номер телефона</span></label>',[
     ['pre', function(element){$(element).css('opacity', 0)}, true],
     ['show', function(element){
     $(element).each(function(){
     _this.tic++;
     var elem = this;
     setTimeout(function(){$(elem).animate({'opacity':1}, 200)}, 350 * _this.tic);
     })
     }, true]
     ]) +
     '<input StartModel="user_phone" class="form-control" type="text" placeholder="Иван Иванов">' +
     '</div>' +
     '</div>',
     [
     ['preSlide', function (element) {
     $(element).each(function () {
     $(this).css({'opacity': 0, 'display': 'none'})
     })
     }, true],
     ['slideOffRight', this.slideOffRight, false],
     ['slideOnLeft', this.slideOnLeft, false]

     ]
     ) +
     this.addEffect('inputElements2',
     '<div class="row">' +
     '<div class="col-sm-12">' +
     '<label class="label label-default">Опишите Ваши требования</label>' +
     '<textarea class="form-control"></textarea>' +
     '</div>' +
     '</div>' +
     '<br>'
     ,
     [
     ['preSlide', function (element) {
     $(element).each(function () {
     $(this).css({'opacity': 0, 'display': 'none'})
     })
     }, true],
     ['slideOffRight', this.slideOffRight, false],
     ['slideOnLeft', this.slideOnLeft, false]

     ]
     ) +
     '</div>' +
     '<div class="col-sm-4">' +
     '<div class="row">' +
     this.addEffect('nextButton', '<input count="1" class="btn btn-default" type="button" value="Далее">', [
     ['preSlide', function (element) {
     $(element).each(function () {
     $(this).css('opacity', 0)
     })
     }, true],
     ['slideOnLeft', function (element) {
     var pattern = /stage(\d)/;
     var res = pattern.exec(window.location.hash);
     res != undefined ? res[1] : 1;

     var _this = this;
     _this.formLInterval = 1;
     $(element).each(function () {
     var self = this;
     console.log(this)
     $(this).css({'margin-left': 500, 'margin-top': 130, 'opacity': 0});
     _this.formLInterval++;
     setTimeout(function () {
     $(self).animate({'margin-left': 0, 'opacity': 1, 'margin-top': 0}, 500);

     }, 100 * _this.formLInterval);
     })
     }, false],
     ['progress', function (element) {
     $(element).val('Гружусь').addClass('disabled');
     }, false],
     ['slideOffBottom', function(element){
     $(element).blur().animate({'margin-top': 100, 'opacity': 0}, 350)
     }, false]
     ]) +
     '</div>' +
     '</div>' +
     '</form>' +
     '</div>' +
     '</div>' +
     '<br>'
     )
     }*/
    this.createFormEffects = {
        informConfirmPhone: [
            ['showError', function(element, message){
                if($(element).attr('sto')){
                    clearTimeout($(element).attr('sto'))
                }
                $(element).css('color', 'red').html(message || '');
                var time = setTimeout(function(){
                    $(element).html('');
                    $(element).attr('sto', '')
                }, 3000)
                $(element).attr('sto', time)
            }, false],
            ['showSuccess', function(element, message){
                if($(element).attr('sto')){
                    clearTimeout($(element).attr('sto'))
                }
                $(element).css('color', 'green').html(message || '');
                var time = setTimeout(function(){
                    $(element).html('');
                    $(element).attr('sto', '')
                }, 3000)
                $(element).attr('sto', time)
            }, false]
        ],
        codeBlock: [
            ['pre', function(element){
                $(element).attr('mh', $(element).css('height'));
                $(element).css({'opacity': 0, 'height': 0, 'display': 'none'});
            }, true],
            ['show', function(element){
                var height = $(element).attr('mh');
                $(element).css('display', 'block').stop().animate({'height': height}, 400, function(){
                    $(this).stop().animate({'opacity': 1});
                })
            }, false],
            ['close', function(element){
                $(element).stop().animate({'height': 0, 'opacity': 0}, 400, function(){
                    $(this).css('display', 'none');
                })
            }, false]
        ],
        'loginBlock': [
            ['pre', function(element){
                $(element).attr('mh', $(element).css('height'));
                $(element).css({'opacity': 0, 'height': 0, 'display': 'none'});
            }, true],
            ['show', function(element){
                var height = $(element).attr('mh');
                $(element).css('display', 'block').stop().animate({'height': height}, 400, function(){
                    $(this).stop().animate({'opacity': 1});
                })
            }, false],
            ['close', function(element){
                $(element).stop().animate({'height': 0, 'opacity': 0}, 400, function(){
                    $(this).css('display', 'none');
                })
            }, false]
        ],
        checkPhoneBtn: [
            ['loaded', function(element, time){
                var second = time;
                var originText = $(element).text();
                $(element).attr('disabled', true);
                var timer = setInterval(function(){
                    $(element).text(originText + ' (' + time + ')');
                    time--;
                    if(time < 0){
                        clearInterval(timer);
                        $(element).text(originText);
                        $(element).attr('disabled', false);
                        return true;
                    }
                }, 1000)
            }, false],
            ['close', function(element){
                $(element).animate({'opacity': 01}, 400, function(){
                    $(this).css('display', 'none');
                });
            }, false]
        ],
        'loginBtn': [
            ['progress', function(){}, false]
        ],
        'inpName': [
            ['lock', function(element){
                $(element).attr('disabled', 'true');
            }, false]
        ],
        'inpPhone': [
            ['formatter', function (element) {
                $(element).mask("+7(999) 999-99-99");
            }, true],
            ['lock', function (element) {
                $(element).attr('disabled', 'true');
            }, false]
        ],
        'btnSendOrder': [
            ['lock', function(element){
                $(element).attr('disabled', 'true');
            }, false],
            ['unlock', function(element){
                $(element).removeAttr('disabled');
            }, false]
        ]
    }

}