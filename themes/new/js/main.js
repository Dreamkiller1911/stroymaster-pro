$(document).ready(function () {



   /* $('#in').click(function () {
        var form = '<li xmlns="http://www.w3.org/1999/html"><div id="loginForm"><form  class="form-inline" action="/site/login" method="post">' +
            '<input type="text" class="form-control btn-sm" name="LoginForm[email]"placeholder="Email или номер телефона">' +
            '<input type="password" class="form-control" name="LoginForm[password]" placeholder="Пароль">' +
            '<input type="submit" value="Войти"></form></div></li>';

        var li2 = $('#in').parent().eq(0);
        $('#in').remove();
        //$(li2).before('<form class="form-inline" action="./" method="post">');
        $(form).insertBefore(li2).css({'display': 'none', 'width': '0'}).css('display', 'block').
       animate({'width': '450px'}, 800, function (){ $('#login').html('')});

    });*/

    var imgL = $('.imgList')

    imgL.hover(function () {
        var _this = $(this);
        if($(this).height() != $(this).children().eq(0).height()-7){
        $(this).children().css('opacity', '0.4');
        $(this).stop().animate({'max-height':'300px','height': ($(this).children().eq(0).height()) + 5}, 500, function () {
            $(this).children().css('opacity', '1');
        });
            setTimeout(function(){
               if(!_this.is(":hover") && _this.height() > 56) {
                   _this.children().css('opacity', '0.4');
                   _this.stop().animate({'height': 60}, 500, function () {
                       _this.children().css('opacity', '1')
                   });
               }
            },3000);
    }


    }, function(){
        if($(this).height() > 56 ) {
            $(this).children().css('opacity', '0.4');
            $(this).stop().animate({'height': 60}, 500, function () {
                $(this).children().css('opacity', '1')
            });
        }
    });

    var triger = false;

    /*$(window).scroll( function(event){
        var menu = $('#userMenu').position().top;
        var doc = $(window).scrollTop();
        var pos = menu - doc;


        if(pos < 40 && triger != true){
            if($('#userMenu').css('opacity') != 0) {
                $('#userMenu').clone().appendTo('#newMenu');
                $('#userMenu').stop().animate({'opacity': 0}, 300);
                $('#newMenu').stop().css({'opacity': 1}).animate({'height': '40px'}, 600);
                $('body').css('margin-bottom', '80px');
            }
            triger = true;
        }else if(pos > 40 && triger !=false) {
            if ($('#userMenu').css('opacity') != 1) {
                $('#userMenu').stop().animate({'opacity': 1}, 500)
                $('#newMenu').stop().animate({'height': '0', 'opacity': 0}, 300);
                $('body').css('margin-bottom', '0');
                triger = false;
            }
        }
    });*/

    /*services*/





    /*$('.content').on('click', '.body > .note, .userInfo > .more', function () {
        var servicesView = new Services();
        servicesView.showService(this);

    });*/
 /*  $('#myModal').on('show.bs.modal', function (event) {
       var button = $(event.relatedTarget);
       var modal = $(this);
       var content = modal.find('.modal-content');
       var servicesView = new Services();
       servicesView.showService(button, content);
   });*/








    /*$('body').on('load', '#sendComment', function(){
        alert(123);
        var com = new Comments('#comment');
        com.init();
        window.event.preventDefault();
    })*/
    /*$('body').on('click.senComm', '#sendComment', function(){
        var servicesView = new Services(this);
        servicesView.sendComment();
    })*/


    $('body').on('click.close', '#back > span', function(){
        var servicesView = new Services(this);
        servicesView.closePreview();
        });
    /*Слайдер в шапке сайта*/
       /* var slider = new Slider('slider');
        if(slider.run()) {
        }*/



})