/**
 * Created by Admin on 02.08.2016.
 */
function MainMenuController() {
    this.lastActiveElement = undefined;

    this.loadAction = function () {
        var _this = this;
        var place = document.getElementById('bs-example-navbar-collapse-1');
        if(place.children.length === 1){
            place.removeChild(place.children[0]);
        }

        this.listenMenu = function(e){
            var event = window.event || e;
            if(this.classList.contains('active')){
                this.classList.remove('active');

            }else {
                if(_this.lastActiveElement) _this.lastActiveElement.classList.remove('active');
                this.classList.add('active');
                _this.lastActiveElement = this;
            }

            var link = this.querySelector('a') || 'services';
            var url = link.getAttribute('href');
            var toUrlPush = true;
            var noPushReg = /(\/?site\/((login)|(logout)))/i;
            if(noPushReg.test(url)){
                _this.start.setCtrlOfUrl({url: url});
                event.preventDefault();
            }

        };

        this.startModel('MainMenu', function (model) {
            _this.if(function () {
                //model.myTest();
                model.getData();
            }).then(function (result) {
                 var model = result.if
                _this.if(function () {
                    this.render('Menu', {
                        view: model
                    });
                }).then(function (result) {
                    var menu = result.if;
                    menu.append(place);
                    menu.bind('item', 'onclick', _this.listenMenu);
                }).else(function(res){
                    console.log('else');
                }).end({'model': result.if})
            }).else(function (res) {
                console.log('low test fail', res.if)
            }).
            end({'model': model});
        })

    };
    this.updateAction = function() {
        var _this = this;
        var oldMenu = this.start.views.MainMenu.Menu;
        var menuPlace = oldMenu.result.parentNode;

        this.startModel('MainMenu', function(model){
            _this.if(function(){
                model.getData();
            }).then(function(model){
                _this.if(function(){
                    this.render('Menu', {'view': data})
                }).then(function(result){
                    var newMenu = result.if;
                    _this.if(function(){
                        oldMenu.effects.item.outLeft.apply();

                    }).then(function(){
                        oldMenu.result.parentNode.removeChild(oldMenu.result);
                        newMenu.append(menuPlace);
                        newMenu.bind('item', 'onclick', _this.listenMenu);
                    }).end({'oldMenu': oldMenu, 'menuPlace': menuPlace, 'nMenu': newMenu});

                    /*menuPlace.removeChild(oldMenu);
                    result.if.append(menuPlace);*/

                }).end({'data': model.if})
            }).end({'model': model})
        })

    };
    this.homeLinkAction = function(){
        var _this = this;
        var ctrl = this.getControls();
        var i = 0;
        while ( ctrl[i]){
            ctrl[i].onclick = function(e){
                var event = window.event || e;
                var homeCtrl = ['Services', 'index'];
                var link = event.target.getAttribute('href');
                event.preventDefault();
                _this.start.init(homeCtrl[0], homeCtrl[1]);

            }
            i++;
        }
    }
}
