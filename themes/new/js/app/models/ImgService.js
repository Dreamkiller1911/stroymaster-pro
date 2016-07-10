/**
 * Created by Admin on 08.07.2016.
 */
function ImgService(){
    var _this = this;
    this.prefix = 'imgSrv_';
    this.properties = ['file'];


    this.countImgToPage = function(){
        _this.getProperty();
        console.log(this.p.allOptionsTo());

    };
    this.addAll = function(){
        _this.getProperty();
        var data = _this.p.allPropertiesTo();
         _this.ajax({
         type: "POST",
         url: "/imgServices/saveAll/",
         data: data,
         success: function(data){
         console.log(data);
         }
         });


        /*var data = _this.p;
        console.log(data.file.files[0])
        var fData = new FormData();
        fData.append(data.file.files[0].name, data.file.files[0])
        $.ajax({
            type: "POST",
            url: "/imgServices/saveAll/",
            data: fData,
            contentType: false,
            processData: false,
            success: function(data){
                console.log(data);
            }
        });*/
    }

}
