/**
 * Created by Admin on 02.08.2016.
 */
function MainMenuController() {
    this.lastActiveElement = undefined;

    this.loadAction = function () {
        var _this = this;
        var place = document.getElementById('bs-example-navbar-collapse-1');

        this.startModel('MainMenu', function (model) {
            _this.if(function () {
                model.getData();
            }).
            then(function (result) {
                var model = result.if
                _this.if(function () {
                    this.render('Menu', {'data': {'model': model}})
                }).then(function (result) {
                    result.if.append(place);
                    result.if.bind('menuItem', 'onclick', function (e) {
                        var e = window.event || e;
                        if(this.classList.contains('active')){
                            this.classList.remove('active');

                        }else {
                            if(_this.lastActiveElement) _this.lastActiveElement.classList.remove('active');
                            this.classList.add('active');
                            _this.lastActiveElement = this;
                        }
                        e.preventDefault();
                        var link = this.querySelector('a');
                        var url = link.getAttribute('href');
                        _this.start.setCtrlOfUrl(url);
                    })
                }).end({'model': result.if})
            }).else(function () {
                console.log('Меню не рендериться')
            }).
            end({'model': model});
        })

    }
}
