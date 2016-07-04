/**
 * Created by NoName on 09.05.2016.
 */
(function ($) {
    var messager = new Messager();


    $.fn.vendorOptions = function (method, options) {
        var settings = $.extend({
            RequestType: undefined
        }, options);

        var methods = {
            preview: function () {
                this.each(function () {
                    $(this).mouseover(function () {
                        var _this = $(this);
                        var id_advt = $(this).attr('opt');
                        $.ajax({
                            type: "POST",
                            url: "/Advertising/view/",
                            data: {ajax: 'advt', id: id_advt},
                            dataType: "html",
                            success: function (data) {
                                messager.time = setInterval(function () {
                                    if (_this.is(':hover')) {
                                        $('#placeData').empty();
                                        $('<div class="col-sm-10 col-sm-offset-1 BlockData">' + data + '</div>').appendTo($('#placeData'));
                                    }
                                }, 500);
                            },
                            beforeSend: function (XMLHttpRequest) {
                                $('#placeData').empty();
                                clearInterval(messager.time);
                                messager.progressLine('#placeData');
                            }
                        });
                    });
                    $(this).mouseout(function () {
                        clearInterval(messager.time);
                        $('#placeData').empty();
                    });
                });
            },
            getOption: function () {
                this.each(function () {
                    $(this).click(function () {
                        var id_advt = $(this).attr('opt');
                        var block = $(this).parents('div[rel="optionsBlock"]');
                        $.ajax('', {
                            type: "POST",
                            data: {ajax: 'getOptions', id_advt: id_advt},
                            dataType: "html",
                            success: function (data) {
                                setTimeout(function () {
                                    block.html(data).vendorOptions('getForm');
                                }, 1000)
                            },
                            beforeSend: function (XMLHttpRequest) {
                                var ms = new Messager();
                                ms.progressLineAnime(block);
                            }
                        })
                    });
                });
            },
            getDataWidgetOption: function () {
                this.click(function () {
                    var block = $(this).parents('div[rel="optionsBlock"]');
                    $.ajax({
                        type: "POST",
                        data: {ajax: 'getDataWidgetOption'},
                        dataType: "html",
                        success: function (data) {
                            setTimeout(function(){
                                var tmp = block.html(data);
                                tmp.find('span.preview').vendorOptions('preview');
                                tmp.find('span.options').vendorOptions('getOption');
                                $('#placeData').empty();
                            }, 900);
                        },
                        beforeSend: function(XMLHttpRequest){
                            var ms = new Messager();
                            ms.progressLineAnime(block);
                        }
                    });
                });
            },
            getForm: function () {
                var _this = this;
                this.find('button[act="getForm"]').each(function () {
                    $(this).click(function () {
                        var tr = $(this).attr('typeRequest');
                        var baseId = $(this).attr('advt');
                        opt = new userOptions();
                        opt.getForm(tr, baseId);
                    });
                });
                this.find('button[act="return"]').each(function () {
                    $(this).vendorOptions('getDataWidgetOption');
                });
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
})(jQuery);