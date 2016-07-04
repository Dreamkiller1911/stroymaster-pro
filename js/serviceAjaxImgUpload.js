function myAddImg(input, id, tre) {
    var _this = this;
    this.input = input.files;
    this.place = $('#imgList');
    this.file = new FormData();

    var i = 0;
    while (i != _this.input.length) {
        _this.file.append('imgServices[]', _this.input[i]);
        i++;
    }
    _this.file.append('id_service', id);
    _this.file.append('add', 'true');

    $.ajax({
        cache: false,
        type: "POST",
        url: '/ImgServices/save',
        data: _this.file,
        processData: false,
        contentType: false,
        success: function (data) {
            var pars = JSON.parse(data);
           if($(_this.place).text().length == 122){
               $(_this.place).empty();
           }
           for (var i = 0; i < pars.length; i++) {

                $.when(
                        $(pars[i]).appendTo(_this.place).css('opacity', 0).animate({'opacity': '+1'}, 500)
                ).then(
                    function(){
                        var il = new imgLimit();
                        var currentImg = _this.place.children().length;
                        il.checkLimit(currentImg);
                    }
                );
            }
        }
    });
}

function imgLimit() {
    var _this = this;
    this.numImg = $('.myIMGBlock').length;
    this.place = $('#recImg');
    this.viewLimit = $('#numOst');

    this.checkLimit = function(num){
        var x = num;
        if(x == 5){
            this.place.animate({'opacity' : 0}, 400, function(){$(this).css('display', 'none')});
        }else {
            this.place.animate({'opacity' : 1}, 400, function(){$(this).css('display', 'block')});
        }
        rfrForm(x)
    };
    var rfrForm = function(col){
        _this.viewLimit.html(5 - col);
        _this.place.find('input').val("");
    }

}

function deleteImg(getBtnClass) {
    var _this = this;
    this.btn = $(getBtnClass);
    this.init = function () {
        var id = new FormData();
        id.append('id', $(_this.btn).attr('id'));
        $.ajax({
            cache: false,
            type: "POST",
            url: '/services/DeleteImg',
            data: id,
            processData: false,
            contentType: false,
            success: function (data) {
                var pars = JSON.parse(data);
                $.when(_this.btn.parents().eq(2).animate({'height': '-0', 'opacity': '-0'}, 500, function () {
                    $(this).css('display', 'none').remove();

                })).then(
                    (function() {
                        var il = new imgLimit();
                        var currentImg = $('#imgList').children().length -1 ;;
                        il.checkLimit(currentImg);
                    }())
                );
            }
        });
    };
}







