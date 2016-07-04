/**
 * Created by tazeb on 12.06.2016.
 */

function SettingsController()
{
    var _this = this;

    this.prefix = 'stng_';

    this.load = function(){
        var ctrl = _this.getControls();

        for (var i = 0; i < ctrl.length; i++){
            ctrl[i].onclick = function(){
                _this.owner.init('Comment', 'getForm');
                _this.owner.init('Comment', 'getAll');



            }
        }

    }


}



