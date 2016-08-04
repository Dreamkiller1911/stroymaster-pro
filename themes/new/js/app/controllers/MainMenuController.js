/**
 * Created by Admin on 02.08.2016.
 */
function MainMenuController() {

    this.loadAction = function () {
        var _this = this;
        var place = document.getElementById('bs-example-navbar-collapse-1');


        this.startModel('MainMenu', function (model) {
            //place.innerHTML = 'Тут будет новое меню';
            _this.if(function () {
                model.getData();
            }).
            then(function (result) {
                //place.innerHTML = 'Получены новые данные';
                _this.if(function () {

                    this.render('Menu', {'data': {ctrl: '', 'model': model}})

                }).then(function (result) {

                    result.if.append(place);

                    //console.log(result.if.effects.label.in)

                }).end({'model': result.if})
            }).else(function () {
                console.log('Меню не рендериться')
            }).
            end({'model': model});
        })

    }
}
