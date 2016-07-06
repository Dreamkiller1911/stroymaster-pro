/**
 * Created by tazeb on 07.04.2016.
 */

function Resume (place)
{
    var _this = this;
    this.place = $('#'+place)
    this.submitB;

    this.id;
    this.id_user;
    this.note;
    this.description;
    this.date_create;
    this.last_update;
    this.status;
    this.end_time;



    const PR = 'Services';

    this.init = function(){
        if(_this.place.length > 0){

            _this.submitB = _this.place.find('input[type=submit]')
            if(_this.submitB.length > 0){
                _this.submitB.attr({'type': 'button', 'value': 'Сохранить'})
            }
            _this.id = _this.submitB.attr('id');
            if(_this.id.length > 0 && !isNaN(_this.id)){

            }else {_this.id = null}
            _this.note = _this.place.find('input[name*="note"]');
        }
    };

    this.saveData = function(){
        _this.description = CKEDITOR.instances['Services[description]'].getData();
        data = {'Services':{
            'id': _this.id,
            'note': _this.note.val(),
            'description': _this.description,
        }}
        $.ajax({
            cache: false,
            url: '/services/save',
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(data){
                if(data.success == true) {
                    showMessage(data.message, 'green');
                }else if(data.error == true){
                    showMessage(data.message, 'red');
                }
            }

        })
    }

    var showMessage = function(message, color){
        $('#msg').stop().remove();
        var style = '' +
            'position: absolute; display: block;' +
            'bottom: 10px; left: -300px; color: transparent;' +
            'text-shadow: 0 0 5px ' + color + '; font-size: 16pt; font-weight: bold; text-transform: uppercase';
        var div = '<div id="msg" style="' + style + '">' + message + '</div>'
        $(div).appendTo(_this.place).stop().animate({'left': '350px'}, 550, function(){
            $(this).animate({'left': '400px'}, 2000, function(){
                $(this).css({'color': 'transparent', 'text-shadow': '0 0 5px '+ color , 'opacity': '0.5'}).animate({'left': '700px', 'opacity': 0}, 400, function(){
                    $(this).remove();
                })
            }).css({'color': color, 'text-shadow': 'none'})
        });
    }

}