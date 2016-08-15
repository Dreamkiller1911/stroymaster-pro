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
        this.startInInterval = 0;
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
    }
}