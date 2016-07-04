/**
 * Created by tazeb on 25.04.2016.
 */
function Services(placeId) {
    var _this = this;
    this.place = $(placeId);//Хранит родительский объект блока, с которым мы будем работать
    this.params = undefined;//Парамерт для хранения всех данных услуги в объекте

    Messager.call(this);
    /** Функция для инициализации приложения обработки резюме*/
    this.Init = function () {
       /* _this.params = {
            "tmpSendButton": _this.place.find('button[name="sendServices"]'),
            "tmpServicesNote": _this.place.find('input[name*="Services\[note\]"]'),
            "tmpServicesDescription": _this.place.find('textarea[name*="Services\[description\]"]'),
            "tmpServicesError": _this.place.find('div.servicesError'),
            "tmpAllImgTitle": undefined,
            "tmpImgList": $("#imgList"),
            "tmpImgListData": {},
            "tmpTime": {"ServiceSend": undefined},
            "btnAddAllImg": _this.place.find('#addAllImg')
        };
        _this.params.tmpSendButton.click(function () {
            _this.saveServices();
        });
        _this.params.tmpServicesDescription.focusout(function () {
            _this.saveServices();
        });
        _this.params.tmpImgList.find('.myIMGBlock .description input[type="text"]').each(function () {

            _this.saveImgData($(this));

        });
        _this.params.tmpImgList.find('.imgItem').each(function () {
            $(this).change(function () {
                _this.saveOneImg(this);
            })
        });
        _this.params.tmpImgList.find('button[name="deleteImg"]').each(function () {
            $(this).click(function () {
                _this.deleteImg();
            });
        });
        _this.params.btnAddAllImg.find('input').change(function () {
            _this.saveAllImg();

        });*/
    };
    /** Функция показывает в модальном окне резюме мастера*/
    /*this.showService = function(th, content){
        var btn = $(th);
        var id = btn.attr('id');
        $.ajax({
            type: "POST",
            url: "/user/ShowService",
            data: {id: id},
            dataType: "html",
            success: function(data){
                $(content).html(data);
                var img = $(content).find('img[class="imgS"]').parent();
                img.each(function(){
                    $(this).fancybox([]);
                });
                var com = new Comments('#comment');
                com.init();
                $(content).find('span[data-toggle="tooltip"]').tooltip();
            },
            beforeSend: function(){
                _this.progress(content);
            }
        });
    };*/
    /** Функция для закрытия модального окна*/
    this.closePreview = function(){
        $("html,body").css("overflow", "auto");
        $('#back').animate({'opacity': 0}, 300, function () {
            $(this).remove();
        })
    };
    /** Функция для сохранения текста резюме*/
    this.saveServices = function () {
        window.event.preventDefault();

        try {
            var note = $.trim(_this.params.tmpServicesNote.val());
            var desc = $.trim(_this.params.tmpServicesDescription.val());
            var btn = _this.params.tmpSendButton;
            if (note === undefined || note === '') {
                _this.showMessages(_this.params.tmpServicesNote.next(), 'Название не дожно быть пустым', 'error')
                throw '';
            } else {
                _this.showMessages(_this.params.tmpServicesNote.next(), '', '')
            }
            if (note.length > 120) {
                _this.showMessages(_this.params.tmpServicesNote.next(), 'Количество символов должно быть не более 120', 'error')
                throw '';
            }
            if (desc === undefined || desc === '') {
                _this.showMessages(_this.params.tmpServicesDescription.next(), 'Текст резюме не может быть пустым', 'error')
                throw '';
            } else {
                _this.showMessages(_this.params.tmpServicesDescription.next(), '')
            }

            var data = {'ajax': 'update', 'Services': {'note': note, 'description': desc}};
            $.ajax({
                cache: true,
                type: "POST",
                url: "/services/update",
                data: data,
                dataType: 'json',
                success: function (data) {
                    if (data.complete != true) {
                        _this.showMessages(_this.params.tmpServicesError, data.message, 'error')
                        _this.progress(btn, true);
                    } else {
                        _this.showMessages(_this.params.tmpServicesError, data.message);
                        _this.progress(btn, true);
                        _this.params.tmpTime.ServiceSend = setTimeout(function () {
                            _this.showMessages(_this.params.tmpServicesError, '');
                        }, 3000);
                    }
                },
                beforeSend: function (XMLHttpRequest) {
                    clearTimeout(_this.params.tmpTime.ServiceSend);
                    _this.progress(btn);
                }
            });
        } catch (e) {

        }
    };
    /** Функция для сохранения описания для изображения*/
    this.saveImgData = function (desc) {

        $(desc).focusout(function () {
            if (desc.val() != undefined) {
                $.ajax({
                    type: "POST",
                    url: "/imgservices/save",
                    data: {"SaveDescription": {"id": $.trim(desc.attr('id')), "description": $.trim(desc.val())}},
                    dataType: "json",
                    success: function (data) {
                        if (data.complete === true) {
                            var tmp = desc.prev().prev().html();
                            _this.showMessages(desc.prev().prev(), 'Сохранено');
                            setTimeout(function () {
                                _this.showMessages(desc.prev().prev(), tmp);
                                desc.prev().prev().css('color', 'black')
                            }, 1300)
                        }

                    }
                });
            }
        });
    };
    /** Функция для сохранения одного изображения после замены*/
    this.saveOneImg = function (input) {
        var inp = window.event.target;
        var place = $(inp).parents('div.myIMGBlock').find('div.imgS');
        var btn = $(input).parent().next();
        var file = new FormData;
        file.append('OneImg', inp.files[0]);
        file.append('id', $(inp).attr('id'));
        try {
            _this.showMessages(btn, '');
            if (inp.files[0] === undefined) {
                throw "Вы не выбрали файл";
            }
            if (inp.files[0].size > 5242880) {
                throw "Файл слишком большого размера";
            }
            $.ajax({
                type: "POST",
                url: "/imgservices/save",
                data: file,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data) {
                    if (data.complete === true) {
                        _this.showMessages(btn, '<h4>' + data.message + '</h4>');
                        place.html(data.content);
                        place.find('a').fancybox([]);
                        setTimeout(function () {
                            _this.showMessages(btn, '');
                        }, 1300)
                    } else {
                        _this.progress(place, true);
                        _this.showMessages(btn, data.message, 'error');
                        setTimeout(function () {
                            _this.showMessages(btn, '');
                        }, 1300)
                    }
                },
                beforeSend: function (HMLHttpRequest) {
                    _this.progress(place, false, 2.3)
                }
            });
        } catch (e) {
            _this.showMessages(btn, e, 'error');
        }
    };
    /** Функция для сохранения всех изображений, добавленных в резюме*/
    this.saveAllImg = function () {
        var inp = window.event.target;
        var imgData = new FormData;
        var title = _this.params.btnAddAllImg.find('div[rel="title"]');
        if (_this.params.tmpAllImgTitle === undefined) {
            _this.params.tmpAllImgTitle = title.html();
        }
        for (var i = 0, j = inp.files.length; i < j; i++) {
            imgData.append('saveAllImg[]', inp.files[i]);
        }

        var disabledInp = function (stat) {
            $(inp).attr('disabled', stat);
            $(inp).parent().attr('disabled', stat);
        };

        $.ajax({
            type: "POST",
            url: "/imgservices/save",
            data: imgData,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (data) {
                try {
                    title.css('color', 'gray').html(_this.params.tmpAllImgTitle);
                    disabledInp(false);
                    if (data.complete === undefined) {
                        throw data;
                    }
                    refreshBalance(data.imgBalance);
                    for (var i = 0, j = data.img.length; i < j; i++) {
                        var newImg = $(data.img[i]).appendTo(_this.params.tmpImgList);
                        newImg.find('button[name="deleteImg"]').click(function () {
                            _this.deleteImg()
                        });
                        newImg.find('.description input[type="text"]').click(function () {
                            _this.saveImgData(newImg.find('.description input[type="text"]'))
                        });
                        newImg.find('input.imgItem').change(function () {
                            _this.saveOneImg(newImg.find('input.imgItem'));
                        });
                        newImg.find('.imgS a').fancybox([]);
                    }
                } catch (e) {
                    _this.showMessages(title, e, 'error');
                }
            },
            beforeSend: function (XMLHttpRequest) {
                disabledInp(true);
                _this.progress(title)
            }
        });
    };
    /** Функция для удаления выбранного изображения*/
    this.deleteImg = function () {
        var btn = window.event.target;

        $.ajax({
            url: "/imgservices/delete",
            type: "POST",
            data: {"deleteImg": {"id": $(btn).attr('id')}},
            dataType: "json",
            success: function (data) {
                try {
                    if (data.complete === undefined) {
                    }
                    _this.progress($(btn), true);
                    $(btn).parents('.myIMGBlock').stop().animate({'height': 0, 'opacity': 0}, 500, function () {
                        $(this).remove()
                    });
                    refreshBalance(0, true)
                } catch (e) {

                }
            },
            beforeSend: function (XMLHttpRequest) {
                _this.progress($(btn));
            }
        });
    };
    /** Функция для сохранения комаентария*/
    this.sendComment = function(){

        var DB = {
            'text': _this.commTxtt.val(),
            'service_id': $('#sendComment').attr('name'),
            'first_name': $("input[name='first_name']").val(),
            'email': $("input[name='email']").val(),
        };
        $.ajax({
            cache: true,
            type: "POST",
            url: "/comments/add",
            data: DB,
            dataType: 'json',
            success: function(data){
                if(data.error != true){
                    var comment = '<div class="comment">' +
                        '<span class="glyphicon glyphicon-user"></span><span>' + data.comment.first_name + ' ...</span>' +
                        '<p>' + data.comment.text + '</p>' +
                        '<span>' + data.comment.date_create + '</span>' +
                        '</div>';
                    $(comment).appendTo('#commentList').css({'opacity': 0 }).animate({'opacity': 1}, 300);
                    _this.noError = true;

                }else{
                    for (key in data){
                        if(key != 'error'){
                            showMessage(key, data[key])
                        }
                    }
                }
            },
            complete: function(data, XMLHttpRequest){
                if(_this.noError == true) clearForm();
            },
        })
    };
    /** Функция для формирования остатка количества изображений, доступных для загрузки*/
    var refreshBalance = function (num, del) {
        var pl = $('#numOst');
        if (del === true) {
            var t = pl.html();
            pl.html(Number(t) + 1);
        } else {
            pl.html(num);
        }
    }

}