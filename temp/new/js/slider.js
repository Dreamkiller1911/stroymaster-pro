/**
 * Created by tazeb on 05.04.2016.
 */

function Slider(id)
{
    var _this = this;

    this.sliderBlock = $('#'+id);//Блок корневой для слайда
    this.l = 250;//Длинна картинки
    this.imgList;
    this.previosSlide;
    this.nextSlide;
    this.currentSlide;
    const ID_IMG = 'slideIMG_'


    this.run = function () {
        getImgList();
        setInterval(function(){
            onSlide();
        }, 8000)
    };

   var getImgList = function(){
     var list = _this.sliderBlock.find('img');
       if(list.length > 1){
           var t = 1;
           $(list).each(function(){
               if (t == 1) {

                   $(this).attr('id', ID_IMG + t);
                   $(this).parent().css('display', 'block');
                   _this.l = $(this).css('width').replace('px', '');
                   $(this).parent().css({'width': _this.l});
                   $('#imgBox').css({'width': _this.l*4, 'overflow': 'hidden', 'height': $(this).css('height')});
               }else{
                   $(this).parent().css('display', 'block');
                   $(this).attr('id', ID_IMG + t);
                   $(this).parent().css({'width': _this.l});
               }
               t++
           });
       }
       _this.imgList = _this.sliderBlock.find('img');
   };

    var onSlide = function(){
        var img = $(_this.imgList);
        var tmp = img.css('margin-left').replace('px', '');
        var x = $(_this.imgList).length;
        if(tmp == -_this.l * (x-1)){
            img.animate({'margin-left': 0}, 300);
        }else {
            img.animate({'margin-left': (tmp - _this.l)}, 600);
        }

    }



    var generateSlider = function(data){
        var slideList = '';
        $(data).each(function(){

        })
        return firstSlide;
    }
    var createImg = function(pos){
        $(pos).appendTo('#slider').css('width', $('#slider').css('width'))
        $('#slider').css('height', $(pos).css('height'))
    }
}