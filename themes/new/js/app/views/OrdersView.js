/**
 * Created by tazeb on 04.08.2016.
 */
function OrdersView (){

    this.viewFormCreate = function(){
        var _this = this;
        this.startInInterval = 0;
        this.formLInterval = 0;
        return this.show(
            '<div class="row ">' +
            '<div class="col-sm-10 col-sm-offset-1 well">' +
                '<form name="Orders_create">' +
                    this.addEffect('headForm',
                        '<div class="row-fluid text-center" >' +
                        '<h4>Форма заявок на ремонт и строительство</h4>' +
                        '<h5>Пожалуйста, заполните все поля</h5>' +
                        '</div>',[
                            ['startIn', function(element){
                               $(element).children().each(function(){
                                   $(this).css('opacity', 0);
                                   _this.startInInterval ++;
                                   $(this).animate({"opacity": 1}, 800 * _this.startInInterval)

                               })
                            }, true]
                        ]) +
                    '<br>' +
                    this.addEffect('inputElements',
                        '<div class="row">' +
                            '<div class="col-sm-5">'+
                                '<label class="label label-default">Ваше имя и фамилия</label>' +
                                '<input class="form-control" type="text" placeholder="Иван Иванов">' +
                            '</div>' +
                        '</div>' +
                        '<br>'+
                        '<div class="row">' +
                        '<div class="col-sm-5">'+
                        '<label class="label label-default">Контактный номпер телефона</label>' +
                        '<input class="form-control" type="text" placeholder="Иван Иванов">' +
                        '</div>' +
                        '</div>',
                        [
                            'slideOnLeft', function(element){
                            $(element).each(function(){
                                var self = this;
                                $(this).css({'margin-left': 500, 'opacity':0});
                                _this.formLInterval ++;
                                setTimeout(function(){
                                    $(self).animate({'margin-left': 0, 'opacity': 1}, 500);

                                }, 100 * _this.formLInterval);
                            })
                        }
                        ]
                    )+
                '</form>' +
            '</div>' +
            '</div>' +
            '<br>'
        )
    }
}