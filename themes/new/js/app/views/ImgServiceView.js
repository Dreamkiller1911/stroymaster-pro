/**
 * Created by Admin on 12.07.2016.
 */
function ImgServiceView() {
    var _this = this;
    this.prefix = 'ImgServiceView';
    this.setFancy = function(element){

        $(element).fancybox([])
    };


    this.viewOneImg = function (model) {
        model.description = !model.description ? '' : model.description
        return this.show(
            this.addEffect('globalAnimate',
                '<div class="col-sm-4 text-center well" style="">' +
                '<div class="row">' +
                '<div class="imgS" rel="' + model.id + '">' +
                this.addEffect('imgBlock',
                    '<a href="' + model.url + '" rel="gallery" title="' + model.description + '">' +
                    '<img src="' + model.simple_url + '">' +
                    '</a>',
                    [
                        ['fancybox', this.setFancy, true],
                        ['op04', function(element){$(element).stop().animate({'opacity':0.3},400)}, false],
                        ['op01', function(element){$(element).stop().animate({'opacity':1},400)}, false]]
                ) +
                '</div>' +
                '</div>' +
                '<div class="row description form-inline">' +
                this.addEffect('labelDescription',
                    '<label style="opacity: 0" for="imgServices[' + model.id + '][description]">Описание</label><br>',
                    ['showDescription', function(element){setTimeout(function(){$(element).css('opacity', 0).animate({'opacity': 1}, 400)},Math.round(Math.random()*1000))}]
                ) +
                '<input StartModel="imgSrvF_description" class="form-control" id="' + model.id + '" type="text"' +
                'name="imgServices[' + model.id + '][description]" value="' + model.description + '">' +
                '</div>' +
                '<div class="row url form-inline " style="position: relative">' +
                '<label class="btn btn-default">Заменить файл <span' +
                'class="text-info glyphicon glyphicon-download-alt"></span>' +
                '<input StartCtrl="imgSrv_testView" class="imgItem" id="' + model.id + '" type="file"' +
                'name="imgServices[' + model.id + ']"' +
                'style="opacity: 0.3; position: fixed; height: 35px; width: 180px">' +
                '</label>' +
                '<span style="display: inline-block; margin-left: 10px"></span>' +
                '</div>' +
                '<div class="row form-inline">' +
                '<button StartCtrl="imgSrv_delete" type="button" id="' + model.id + '" class="btn btn-default"' +
                'name="deleteImg">Удалить <span class=" text-danger glyphicon glyphicon-remove"></span></button>' +
                '<span class="showSave" id="save' + model.id + '"></span>' +
                '</div>' +
                '<div class="row">&nbsp;</div>' +
                '</div>',[
                    'fadeIn', function(element){$(element).css('opacity', 0).animate({'opacity': 1}, 800);}, true
                ])
        );
    };
    this.viewImgEdit = function () {
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