

$(window).ready(function(){

    $('body').on('click', '.deleteImages', function(){
        var dImg = new deleteImg(this);

        dImg.init();
    });




    function saveDescript(NameClass)//Функция для кнопки с сохранением описания картинки
    {
        var _this = this;
        this.btn = $('.'+NameClass);
        this.inp;
        this.id;
        //
        this.mess = $('#save'+this.id);

        this.init = function(){


            $('body').on('click','.' + NameClass, function(){
                _this.inp = $(this).parent().parent().find('input[type="text"]');
                _this.id = _this.inp.attr('id').substr(3);
                _this.textDescript = _this.inp.val();
                send();
            })

        }

        var send = function() {//Сохранение описание картинки
            var saveAjax = $.ajax({
                cache: false,
                type: "GET",
                processData: true,
                contentType: false,
                url: '/ImgServices/save',
                data: {'id':_this.id, 'description': _this.textDescript},
                success: function (data) {
                    if(data == 'true'){
                        $.when($('#save' +_this.id).html('Сохраненно').animate({opacity: 1}), 100)
                            .then(setTimeout(function(){
                                $('#save' +_this.id).animate({opacity: -0}), 100
                            },1000));
                    }
                }
            });
        }

    }



    var saveDes = new saveDescript('saveDescription');
    saveDes.init();



    $('#showMyImg').click(function(){
        var im = $('#imgList').slideToggle(800);
        var button = $(this);
        if(button.val() == 'Mои фотографии'){
            button.val('Скрыться');
        }else button.val('Mои фотографии');
    });


    $('body').on('change', '.showSave', function(event){
        $(this).animate({opacity: 1}, 50);
    });

    $('body').on('change', '.myImg', function(event){
        var _this = this;
        var file = new FormData();
        file.append('ImgServices', _this.files[0]);
        file.append('id', $(this).attr('id'));


        $.ajax({
            global: true,
            cache: false,
            type: "POST",
            processData: false,
            contentType: false,
            url: '/ImgServices/save',
            data: file,
            success: function(data){
                var img = $(_this).parents().eq(2).children().eq(0).empty();
                img.animate({'opacity': '-0'}, 100, function(){$(this).html(data)}).animate({'opacity': '+1'}, 300);
            }
        });
    })
})