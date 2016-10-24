/**
 * Created by Admin on 02.08.2016.
 */
function MainMenuView() {
    this.prefix = 'MM';

    this.viewMenu = function () {
        this.if(function(){
            this.show({effects:{
                item: [
                    ['outLeft', function(element){
                        var self = this.parent;
                        var res = this.result();
                        var count = $(element).length;
                        self.eqOut = 0;
                        self.eqExitOut = 0;

                        $(element).each(function(){
                            var el = this;
                            var currentWidth = Number($(this).css('width').replace(/px|pt|%/i, ''));
                            self.eqOut++;
                            var time = 10 * self.eqOut;
                            setTimeout(function(){
                                $(el).animate({'opacity': 0},{'queue': false, 'duration': 80 * self.eqOut});
                                $(el).animate({'margin-left': -(300 + currentWidth)}, 300 + 160 *  self.eqOut, function(){
                                    self.eqExitOut++;
                                    if(self.eqExitOut === count){
                                        return true;
                                    }
                                });
                            }, time)
                        })
                    }, false],
                    ['showRight', function(element){}, false],
                ]
            }});
        }).then(function(res){
            return res.if;
        }).end();
    }

}