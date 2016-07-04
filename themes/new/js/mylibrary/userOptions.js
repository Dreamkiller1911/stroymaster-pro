/**
 * Created by tazeb on 09.04.2016.
 */

function userOptions()
{
    var _this = this;
    this.place  = '#placeData';
    this.placeSumm;
    this.priceOptions;
    this.inter;
    this.datePrice;
    this.dataBoxRequest ='<div id="myUI"></div>';
    this.timerRegectRequest;
    this.timeAcceptRequest;
    this.getData_tp;//Параметр для повторного вызова

    const PLACE = '#placeData';
    const MYUI = '#myUI';

    this.getData = function(TP) {//Получение данных о заявках

        var tp;
        if(TP == undefined){
            tp = _this.getData_tp;
        }else {
            tp = TP;
            _this.getData_tp = TP;
        }
        _this.dataBoxRequestRemove();
            $.ajax({
                cache: false,
                type: "POST",
                url: '/Request/get',
                data: {'type': tp},
                success: function (data) {
                    setTimeout(function(){
                        $(_this.place).html(data);
                    }, 1500)
                },
                beforeSend: function (XMLHttpRequest) {
                    $(_this.place).empty();
                    var div = '<div class="progress progress-info">' +
                        '<div class="progress-bar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 1%;"></div>' +
                        '</div>'
                    var t = $(div).appendTo(_this.place);
                    t.children().eq(0).animate({'width': '100%'})
                }
            });
    };
    this.getSum = function(params)//Получение суммы и отображение ее
    {
        _this.placeSumm = $('#result');
        if(params.price != 0 && params.price != _this.priceOptions && params.price != undefined){
            _this.priceOptions = params.price;
            _this.placeSumm.empty();
            _this.datePrice = newData()
        }
        if(params.value != 0 && params.value != undefined){
            _this.datePrice = newData(params.value)
        }

        function  newData (value){
            return 'Сумма к оплате - ' +  _this.priceOptions * (value === undefined? 1: value);

        };
        this.placeSumm.html(_this.datePrice);
    };
    this.regectRequest = function(id){//Функция отклонения заявок от пользователя
        var pld = $(_this.place).parent().css('position', 'relative');//Блок в котором отображается информация
        var content = '<div class="row-fluid text-muted text-center"><h4>Вы точно хотите отклонить заявку?</h4></div>' +
            '<div class="row-fluid text-center">Напишите причину по которой заявка была отклоненна</div>' +
            '<div class="row-fluid"><textarea class="form-shadow"></textarea></div>' +
            '<div class="row-fluid btn-group">' +
            '<button onclick="opt.regReq(' + id +')" type="button" class="btn btn-default">Отклонить</button>' +
            '<button onclick="opt.dataBoxRequestRemove()" type="button" class="btn btn-default">Оставить</button>' +
            '</div>' +
            '<div class="row-fluid text-center text-danger"></div> ';

        $(_this.dataBoxRequest).prependTo(pld).animate({'opacity': 1}, 400, function(){
            $(content).appendTo($(this)).animate({'opacity': 1}, 300);
        });
    };
    this.regReq = function(i){//Отклонить заявку от пользователя и сохранить данные в базу
        var text = $.trim($(MYUI).find('textarea').val());
        var id = $.trim(i);
        $.ajax({
            cache: false,
            type: "POST",
            url: '/request/regect',
            data: {'id': id, 'description':text},
            dataType: 'json',
            success: function(data){
                if(data.error != undefined){
                    showTxt(MYUI, data.error);
                }else {
                    showTxt(MYUI, data.complete);

                }
                if(data.close) {
                    setTimeout(function () {
                        _this.dataBoxRequestRemove();
                        _this.getData();
                    }, 3000)
                }
            }


        });
    };
    this.acceptRequest = function(id, btn){//Принять заявку от пользователя
        var row = $(btn).parents().eq(2);
        $.ajax({
            cache: false,
            type: "POST",
            url: "/request/accept",
            data: {'id': id},
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data.close == true && data.complete != undefined){
                    clearTimeout(_this.timeAcceptRequest);
                    _this.timeAcceptRequest = setTimeout(function(){
                        _this.getData();
                    }, 1800)
                }else if(data.error != undefined) {
                    _this.timeAcceptRequest = setTimeout(function() {
                        $(row).next().css('width', '0%')
                        $(row).css('background', 'red');
                        setTimeout(function () {
                            $(row).css('background', 'none');
                        }, 300)
                    }, 1200);
                }
            },
            beforeSend: function(XMLHttpRequest){
                $(row).next().stop().animate({'width': '93%'}, 1200)
            }
        });
    };
    this.dataBoxRequestRemove = function(){

        $(MYUI).animate({'opacity': 0},200, function(){$(this).remove();});
    };
    this.getForm = function(tr, bId){//Запрос на получение форм заявок
        $.ajax({
            cache: false,
            type: "POST",
            url: '/request/getForm',
            data: {'type_request': tr, 'baseId': bId},
            dataType: 'json',
            success: function (data) {
                setTimeout(function() {
                    $(_this.place).css('font-size', '10pt').html(data.content);
                    _this.getSum({'price':data.cost_price});
                }, 1000);
            },
            beforeSend: function(XMLHttpRequest){
                var ms = new Messager();
                ms.progressLineAnime(_this.place);
            }
        });
    };
    this.sendRequest = function(inp, type, id_user, id_service){//Запрос на создание нового запроса от пользователя
        var input = inp;
        $(inp).attr('type', 'button');
        var data = $('form').serializeArray();
        data.push({name: "id", value: $(inp).attr('id')});
        data.push({name: 'type', value: type});
        data.push({name: 'id_user', value: id_user});
        data.push({name: 'id_service', value: id_service});

        $.ajax({
            cache: false,
            type: "POST",
            url: '/request/add',
            data: data,
            dataType: 'json',
            success: function (data) {

                setTimeout(function () {
                    $('.ajax-loader1').css('display', 'none');
                    if (data.complete == true) {
                        $(_this.place).empty().append(showStatus(data.title, data.text));
                        setTimeout(function () {
                            window.location.href = "./"
                        }, 2000);
                    }else if(data.error == true){
                        $('.ajax-loader1').css({
                            'background':'none',
                            'display':'block',
                            'width': '100%',
                            'margin': '0 5px 5px 5px'}).html(data.text)
                    }
                }, 2000)

            },
            beforeSend: function(XMLHttpRequest){
                $('.ajax-loader1').css('display', 'block')
            }
        });
    };
    var showTxt = function(place, text){//Показывает сообщение в последнем элементе блока
        var p = $(place).children(':last-child');
        clearTimeout(_this.timerRegectRequest);
       p.stop().empty().animate({'opacity': 0}, 300, function(){
            $(this).html(text).animate({'opacity': 1}, 300)
            _this.timerRegectRequest = setTimeout(function(){p.html('').animate({'opacity': 0}, 300)}, 2500)
        });
    };
    var showStatus = function(title, text){
        var tmp = '<div class="row-fluid text-center">' +
            '<h4><b class="text-muted"> ' + title +  '</b></h4>' +
            '</div>' +
            '<div class="row-fluid text-center">' +
            '<p class="text-muted"> ' + text +  '</p>' +
            '</div>';
        return tmp;
    };
    var checkPlace = function(){
        var x;
        if($(_this.place).html().length > 22){
            x = confirm('Вы не закончили работу с данным\n\rВы перейдете в другой раздел\n\rХотите продолжить?');
        }else {
            x = true;
        }
        return x;
    };
    var hangSubmit = function(fn){
        $(_this.place).on('click', '#pay_cash', function(){
            $(this).attr('type', 'button');
            fn(this);
        })
    };
}