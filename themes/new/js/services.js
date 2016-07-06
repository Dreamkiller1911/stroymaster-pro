/**
 * Created by tazeb on 03.04.2016.
 */
function aervices(bt) {
    var _this = this;
    this.service = bt;
    this.id;
    this.img = '';
    this.comment = '';
    this.commTxtt = $('#textComment');
    this.user = {
        'first_name': '',
        'email': '',
        'blocked': '',
    };
    this.noError = false;


    this.preview = function () {
        setId();
        getUser();
        getData();

    };

    this.close = function () {
        $("html,body").css("overflow", "auto");
        $('#back').animate({'opacity': 0}, 300, function () {
            $(this).remove();
        })
    }

    var setId = function () {
        if (isFinite($(_this.service).attr('id'))) {
            _this.id = $(_this.service).attr('id');
        }
    };

    var getData = function () {
        $.ajax({
            cache: false,
            type: "POST",
            url: '/services/getone',
            data: {'id': _this.id},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var preview = generateView(data);
                $(preview).css('opacity', 0).prependTo('body')
                $('#back > span').css('opacity', 0);
                $('#back').animate({'opacity': 1}, 200);
                $("#service-prev").css({'top': '50%', 'right': '50%', 'bottom': '50%', 'left': '50%', 'opacity': 0})
                    .animate({
                        'top': '100px',
                        'right': '280px',
                        'bottom': '50px',
                        'left': '280px',
                        'opacity': 1
                    }, 400, function () {
                        $('#back > span').animate({'opacity': 1}, 100);
                        $("html,body").css("overflow", "hidden");
                    })


            }
        });
    };
    var generateView = function (data) {
        getImg(data.img);
        getComments(data.comments);

        var preview = '<div id="back"><span>Закрыть</span><div id="service-prev">' +
            /*'<div class="items">' +
            '<div><span class="glyphicon glyphicon-user"></span> ' + data.userName + '</div>' +
            '<div><span class="glyphicon glyphicon-phone"></span> ' + data.userPhone + '</div>' +
            '<div><span class="glyphicon glyphicon-envelope"></span> ' + data.userEmail + ' </div>' +
            '<div><span class="glyphicon glyphicon-refresh"></span> ' + data.last_update + '</div></div>' +
            '<div class="title">' + data.note + '</div>' +
            '<div class="content">' + data.description + '</div> ' +

            '<div class="img-list">' + _this.img + ' </div>' +

            '<div id="commentBlock">' +
            '<span>Комментрии</span>' +
            '<div id="commentList">' + _this.comment + '</div>' +
            '<p>Если вы воспользовались услугами мастера, оставьте оставьте коментарий</p>' +
            '<span id="error_text"></span>' +
            '<textarea id="textComment" placeholder="Оставьте коментарий"></textarea>' +
            '<input type="text" ' + _this.user.blocked + ' name="first_name" value="' + _this.user.first_name + '" placeholder="Ваше имя">' +
            '<span id="error_first_name"></span> <br>' +
            '<input type="email" ' + _this.user.blocked + ' name="email" value="' + _this.user.email + '" placeholder="Электронная почта">' +
            '<span id="error_email"></span><br>' +
            '<input id="sendComment" type="button" name="' + data.id + '" value="Отправить">' +
            '</div>' +*/
            ' </div></div>'

        return preview;
    };
    var getImg = function (dataIMG) {
        $(dataIMG).each(function () {
            _this.img += '<a rel="gallery"  href="' + this.url + '"><img height="80px" src="' + this.url + '" note="' + this.description + '" ></a>'
        })
        return true;
    };
    var getComments = function (dataComments) {

        $(dataComments).each(function () {
            _this.comment += '<div class="comment">' +
                '<span class="glyphicon glyphicon-user"></span><span>' + this.userName + ' ...</span>' +
                '<p>' + this.text + '</p>' +
                '<span>' + this.date_create + '</span>' +
                '</div>'
        })
        return true;
    };

    var getUser = function () {
        $.ajax({
            cache: false,
            type: "POST",
            url: '/user/GetCurrentUser',
            dataType: 'json',
            success: function (data) {
                if (data.error == true) {
                    return false;
                } else {
                    _this.user.first_name = data.first_name;
                    _this.user.email = data.email;
                    _this.user.blocked = 'disabled';
                }
            },
        });
    };
    this.sendComment = function () {

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
            success: function (data) {
                if (data.error != true) {
                    var comment = '<div class="comment">' +
                        '<span class="glyphicon glyphicon-user"></span><span>' + data.comment.first_name + ' ...</span>' +
                        '<p>' + data.comment.text + '</p>' +
                        '<span>' + data.comment.date_create + '</span>' +
                        '</div>';
                    $(comment).appendTo('#commentList').css({'opacity': 0}).animate({'opacity': 1}, 300);
                    _this.noError = true;

                } else {
                    for (key in data) {
                        if (key != 'error') {
                            showMessage(key, data[key])
                        }
                    }
                }
            },
            complete: function (data, XMLHttpRequest) {
                if (_this.noError == true) clearForm();
            },
        })
    };
    var clearForm = function () {
        var textComment = $("#textComment");
        var name = $("input[name='first_name']");
        var email = $("input[name='email']");

        textComment.val('');
    }
    var showMessage = function (id, ms) {
        $('#error_' + id).css('opacity', 0).stop().html(ms).animate({'opacity': 1}, 300, function () {
            var tp = this;
            var t = setTimeout(function () {
                $(tp).animate({'opacity': 0}, 200)
            }, 3000)
        })
    }


}