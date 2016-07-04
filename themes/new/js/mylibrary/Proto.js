
function Messager () {
    var _this = this;
    this.tmpInputData = undefined;
    this.tmpMessageDate = undefined;
    this.tmpErrors = {};
    this.time = undefined;
    this.tic = undefined;

    const CLASSERROR = 'errorMessage';

    /** Функция принимает массив ошибок после валидации, принимает кнопку субмит или просто объект вызова,
     * переберает форму, ищет нужные поля для вставки ошибок и показывает их, предварительно очистив от старых ошибок */
    this.showErrors = function(eData, inp, idItem) {
        var form = $(inp).parents('form');
        var isError = function (fAttr, eData) {
            for (var key in eData) {
                if ($(fAttr).attr('type') != 'submit' && $(fAttr).prop('id') == key) {
                    return key;
                }
            }
            return false;
        };
        for (var i = 0, j = form[0]; i < j.length; i++) {
            var a = isError(j[i], eData);
            var atr = $(j[i]);
            if (a != false) {
                if(idItem != undefined){
                    if(idItem === a) {
                        _this.tmpErrors[a] = j[i];
                        _this.errorBorder(atr, true);
                        var e = $(j[i]).parent().find('#' + a + '_em_');
                        if (e.length > 0) {
                            e.removeAttr('style');
                            _this.showMessages(e, eData[a], 'error');
                        }
                        break;
                    }
                }else {
                    _this.tmpErrors[a] = j[i];
                    _this.errorBorder(atr, true);
                    var e = $(j[i]).parent().find('#' + a + '_em_');
                    if (e.length > 0) {
                        e.removeAttr('style');
                        _this.showMessages(e, eData[a], 'error');
                    }
                }
            } else {
                for (var key in _this.tmpErrors) {
                    if (key === atr.attr('id')) {
                        _this.errorBorder(atr);
                        _this.showMessages($(j[i]).parent().find('#' + key + '_em_'), '');

                    }
                }
            }
        }
    };

    this.showMessages = function (idPlace, message, type) {
        var place = undefined;
        if (typeof idPlace === 'object') {
            place = idPlace;
        } else {
            place = $('#' + idPlace);
        }
        var color = type === 'error' ? 'red' : 'green';
        var addAll = function (ms) {
            if(ms === '') {
                place.stop().animate({'opacity': 0}, 300, function(){
                    $(this).css('display', 'none');
                    $(this).empty();
                });
            }else {
                place.stop().css({'opacity': 0, 'color': ' transparent', 'text-shadow': '0 0 5px rgba(0,0,0,0.5)'})
                    .html(ms).css({'color': color, 'text-shadow': '0 0 5px white', 'display': 'inline-block'}).animate({'opacity': 1}, 300, function () {
                });
            }
        };
        addAll(message);

    };

    this.errorBorder = function (inp, error) {
        $(inp).removeClass('error success');
        if (error === true) {
            $(inp).addClass('error');
            //inp.css({'border': '2px solid red', 'background': 'none'})
        } else {
            $(inp).addClass('success');
            //inp.css({'border': '6px solid #6A9565', 'background': '#E5EEC1'})
        }
    };

    this.progress = function (target, close, scale) {
        var size = scale + 'em' || '';
        if (close === true) {
            target.attr('disabled', false);
            target.html(_this.tmpInputData);
        } else {
            target.attr('disabled', true);
            _this.tmpInputData = target.html();
            var div = '<span class="progress-bar3" style="height: ' + size + '"></span>';
            target.html(div);
        }
    };
    this.progressLine = function(target){

       /* var progress = '<div class="progress">' +
            '<div class="progress-bar" role="progress-bar progress-bar-striped active" aria-valuenow="70"' +
            'aria-valuemin="0" aria-valuemax="100" style="width:70%">' +
            '</div></div>';*/
        var progress = '<div class="ajax-loader1"></div>';
        $(progress).appendTo($(target)).css('display', 'block');
    };
    this.progressLineAnime = function(target){
        $(target).empty();
        var div = '<div class="progress progress-info">' +
            '<div class="progress-bar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 1%;"></div>' +
            '</div>';
        var t = $(div).appendTo(target);
        t.children().eq(0).animate({'width': '100%'})
    };
    this.progressTime = function(button, time){

        var t = time || 60;
        var tmp = button.html()

        $(button).attr('disabled', true);

        var IntTime = setInterval(function(){
            $(button).text(tmp + ' ( ' + t + ')');
            t--;
            if(t < 0){
                clearInterval(IntTime);
                $(button).text(tmp);
                $(button).attr('disabled', false);
            }
        }, 1000);

    };
}
