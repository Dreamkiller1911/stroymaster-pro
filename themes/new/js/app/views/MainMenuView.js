/**
 * Created by Admin on 02.08.2016.
 */
function MainMenuView() {
    this.prefix = 'MM';
    this.interval = 1;

    this.viewMenu = function (model) {
        var _this = this;
        if (model.visible === false) {
            return false
        }
        return this.show(
            '<ul class="nav navbar-nav">' +
            this.addEffect(
                'menuItem',
                '<li><a href=""><span class="glyphicon glyphicon-th"> </span> Заказы</a></li>' +
                '<li><a href="/orders/create"><span class="glyphicon glyphicon-plus"> </span> Заказать работы</a></li>' +
                '<li><a href=""><span class="glyphicon glyphicon-envelope"> </span> Обратная связь</a></li>' +
                //'<li><a href=""><span class="glyphicon glyphicon-cog"> </span> Регистрация</a></li>' +
                (function(){if(!model.user) return '<li><a href="/site/login"><span class="glyphicon glyphicon-user"> </span> Войти</a></li>'}()) +
                (function(){if(model.user) return '<li><a href="/site/logout/"><span class="glyphicon glyphicon-off"> </span> Выход</a></li>'}()), [
                    ['show', function (element) {
                        $(element).each(function () {
                            $(this).addClass('mainMenu-stage-a');
                        });
                        $(element).each(function () {
                            $(this).removeClass('mainMenu-stage-a').addClass('mainMenu-stage-b');
                        });

                    }, true]
                ]
            ) +
            '</ul>'
        )
    }
}