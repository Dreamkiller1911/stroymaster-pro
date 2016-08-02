/**
 * Created by Admin on 02.08.2016.
 */
function MainMenuView (){
    this.prefix = 'MM';
    this.interval = 1;

    this.viewMenu = function(model){
        var _this = this;
        if(model.visible === false){
            return false
        }
        return this.show(
            '' +
            this.addEffect('label',
                '<li><a href="' +model.url[0] + '">' +
                model.label +
                '</a></li>',
            [
                ['in', function(element){$(element).css('opacity', 0).stop(); setTimeout(function(){
                    $(element).animate({'opacity': 1}, 300);
                    console.log(_this.interval)
                    _this.interval ++;
                }, 500 * _this.interval)}, true]
            ]
            ) +
                ''
        )
    }
}