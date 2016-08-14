/**
 * Created by tazeb on 24.07.2016.
 */
function ServiceView() {
    this.tic = 0;

    this.viewService = function (model, user, images) {
        var _this = this;
        var imgBlock = ' ';
        if(images.length > 0){
            var i = 0, tmpData = [], element = '', p = window.location.origin;
            for ( ; i < images.length; i++){
                images[i].description = images[i].description != null ? images[i].description : '';
                element = '<a rel="my_img_' + images[i].id_service + '" href="' + p + images[i].url +'" title="' + images[i].description + '">' +
                    '<img src="' + p + images[i].simple_url + '" height="50px"></a>';
                tmpData.push(element);
            }
            imgBlock = tmpData.join('');
        }
        console.log(images);
        return this.show(
            this.addEffect('service', '<div class="col-lg-4 col-sm-6 content">',[
                ['init', function(element){

                    $(element).css({'opacity': 0, 'margin-left': -500});
                    _this.start.init('Service', 'viewModal')
                }, true],
                ['show', function(element){
                    _this.tic++;
                   setTimeout(function(){
                       $(element).css('opacity', 0).animate({'opacity': 1, 'margin-left': 0 }, 300)
                   }, 100 * _this.tic)
                }, true]
            ]) +
            '<div class="row">' +
            '<div class="col-sm-12">' +
            '<div class="body">' +
            '<div StartCtrl="Service_viewModal" class="note" id="' + model.id + '">' +
            '<p>' + model.note + '</p>' +
            '</div>' +
            '<div class="text">' +
            '<p>' + model.description + '</p>' +
            '</div>' +
            '<div class="imgList">' +
            '<div style="overflow: hidden; bottom: 0; position: static">' +
                this.addEffect('imgBlock', imgBlock, [
                    ['init', function(element){
                        $(element).each(function () {
                            $(this).css('opacity', 0).fancybox([]);
                            $(this).mouseover(function(){
                                $(this).stop().animate({'margin-left': 15});
                            })
                            $(this).mouseleave(function(){
                                $(this).stop().animate({'margin-left': 0});
                            })
                        })
                    }, true],
                    ['show', function(element){
                        _this.tic = 0;
                        $(element).each(function () {
                            _this.tic++;
                            console.log(_this.tic)
                            var elem = this;
                            setTimeout(function(){
                                $(elem).animate({'opacity': 1}, 300);
                            }, 250 * _this.tic);
                        })
                    }, true]
                ]) +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-12 ">' +
            '<div class="row userInfo">' +
            '<div class="col-sm-12"><span' +
            'class="glyphicon glyphicon-user">' + user.first_name + ' ' + user.second_name + '</span>' +
            '</div>' +
            '<div class="col-sm-12"><span' +
            'class="glyphicon glyphicon-phone"> ' + user.phone + '</span>' +
            '</div>' +
            '<input id="' + model.id + '" class="btn btn-default btn-block btn-sm"' +
            'StartCtrl="Service_viewModal"' +
            'value="Подробнее"' +
            'type="button">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

}
