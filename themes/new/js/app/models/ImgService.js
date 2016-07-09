/**
 * Created by Admin on 08.07.2016.
 */
function ImgService(){
    var _this = this;
    this.prefix = 'imgSrv_';
    this.properties = ['file'];


    this.countImgToPage = function(){
        _this.getProperty();
        this.p.allOptionsTo();

    }

}
