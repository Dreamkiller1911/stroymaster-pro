/**
 * Created by Admin on 02.08.2016.
 */
function MainMenuView (){
    this.prefix = 'MM';
    this.interval = 1;

    this.viewMenu = function(model){
        var _this = this;
        if(model.visible === false){
            return false
        }
        return this.show(
            this.addEffect('label',
                '<iframe frameborder="0" src="JavaScript:">Ваш браузер не поддерживает iFrame</iframe>' +
                '<ul class="nav navbar-nav">' +
                    '<li><a href=""><span class="glyphicon glyphicon-th"> </span> Заказы</a></li>' +
                    '<li><a href=""><span class="glyphicon glyphicon-plus"> </span> Заказать работы</a></li>' +
                    '<li><a href=""><span class="glyphicon glyphicon-envelope"> </span> Обратная связь</a></li>' +
                    '<li><a href=""><span class="glyphicon glyphicon-cog"> </span> Регистрация</a></li>' +
                    this.addEffect('login', '<li><a href=""><span class="glyphicon glyphicon-user"> </span> Войти</a></li>', ['in', function(element, e){
                        $(element).click(function(event){
                            var e = window.event || event;
                            e.preventDefault();
                            console.log(window.location.pathname = 'site/login')
                            alert(555)})
                    }, true]) +
                    '<li><a href=""><span class="glyphicon glyphicon-off"> </span> Выход</a></li>' +
                '</ul>',
            [
                ['in', function(element){$(element).css('opacity', 0).stop();
                    $(element).animate({'opacity': 1}, 100);
                }, true]
            ]
            )
        )
    }
}