/**
 * Created by tazeb on 02.05.2016.
 */
function Comments (pl)
{
    var _this = this;
    this.place = $(pl);
    this.params = undefined;

    Messager.call(this);
    /** Функция инициализации объекта с комментариями, отправка и показ добавленного комментария*/
    this.init = function (pl){

        /*if(_this.place === undefined){
            _this.place = $(pl)
        }

        _this.params = {
            comList : _this.place.find('#commentList'),//Блок для вставки комментария
            comText : _this.place.find('div[rel="form-comment"] textarea'),//Поле с текстом комментария
            comName : _this.place.find('div[rel="form-comment"] input[id*="name"]'),//Поле с именем пользователя
            comEmail : _this.place.find('div[rel="form-comment"] input[id*="email"]'),//Поле с почтой пользователя
            comBtnSub : _this.place.find('div[rel="form-comment"] button[type="submit"]'),//Кнопка отправки комментария
            comError : _this.place.find('div[rel="form-comment"] div[rel="error"]')//Поле отображения ошибок
        };
        console.log(this);
        if(_this.params.comBtnSub.length > 0) {
            _this.params.comBtnSub.click(function () {
                window.event.preventDefault();
                _this.sendComment();
            });
        }
        if(_this.place.find('form#newComment').length > 0) {
            $(_this.place.find('form#newComment')[0].elements).each(function () {
              if($(this).attr('type') != 'submit') {
                  $(this).focusout(function () {
                      _this.checOneAttr();
                  })
              }
            });
        }*/

    };
    this.checOneAttr = function(){
        var inp = window.event.target;
        var attr = $(inp).attr('name');
        var comData = {
            ajax: 'newComment'
        };
        comData[attr] = $(inp).val();

        $.ajax({
            type: "POST",
            url: "/comments/add",
            data: comData,
            dataType: "json",
            success: function(data){
                _this.showErrors(data, inp, $(inp).attr('id'));
            }
        });
    };
    this.sendComment = function(){
        var btn = window.event.target;
        var comData = {
        };
        $(_this.place.find('form#newComment')[0].elements).each(function(){
            comData[$(this).attr('name')] = $(this).val();
        });


        $.ajax({
            type : "POST",
            url : "/comments/add",
            data : comData,
            dataType : "json",
            success: function(data){
               try {
                    if(data.complete === false){
                        throw data.message;
                    }
                   if(data.complete === true){
                       _this.showMessages(_this.params.comError, '<h5><b>Комментарий добавлен</b></h5>');
                       setTimeout(function(){
                           addCommentToList(_this.params.comList, data.comment);
                           _this.showMessages(_this.params.comError, '');
                           _this.progress($(btn), true);
                           _this.params.comText.val('');
                       }, 1300)

                   }else{
                       _this.progress($(btn), true);
                       _this.showErrors(data, btn);
                   }


                }catch (e){
                   _this.progress($(btn), true);
                   _this.showMessages(_this.params.comError, '<h5><b>' + e + '</b></h5>', 'error')
                }
            },
            beforeSend: function(XMLHttpRequest){
                _this.progress($(btn));
            }
        });
    };

    var addCommentToList = function(place, data){
        $(data).appendTo($(place));
        return true
    }

}
