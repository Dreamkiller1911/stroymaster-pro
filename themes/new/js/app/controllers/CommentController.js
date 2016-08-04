/**
 * Created by tazeb on 17.06.2016.
 */
function CommentController(){

    var _this = this;

    this.prefix = 'com_';

    this.getAllAction = function(){
        var ctrl = _this.getControls();
        for (var i = 0; i < ctrl.length; i++){
            ctrl[i].onclick = function(){
                _this.startModel('Comment', function(model){
                    var input = document.getElementById('cond_comment_name');
                    model.getAll(input.value);

                })
            }
        }
    };
    this.getFormAction = function(){
        var ctrl = _this.getControls();
        ctrl[0].onclick = function(){
            _this.startModel('Comment',function(model){
                model.getForm();
            })
        }
    };
    this.loadAction = function(){
        var ctrl = _this.getControls();
        if(!ctrl){
            return false;
        }
        ctrl[0].onclick = function(){
            _this.startModel('Comment', function(model){
                model.getProperties();
                model.saveForm();

            })
        }
    }
}