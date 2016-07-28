/**
 * Created by Admin on 12.07.2016.
 */
function ImgServiceView() {
    var _this = this;
    this.prefix = 'ImgServiceView';


    this.viewOneImg = function(model, rain, debug){
        var r = function(){

        }
        console.log(this)
        console.log(model)
    };
    this.viewImgEdit = function(){
        _this.write(
            '<div class="modal">Тестовый див для генерации представления </div>'
        );
    };

    this.viewTest = function () {
        _this.write(
            '<div class="test"></div>'
        )
    }
}