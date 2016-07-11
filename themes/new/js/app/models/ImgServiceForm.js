/**
 * Created by Admin on 08.07.2016.
 */
function ImgServiceForm() {
    var _this = this;
    this.prefix = 'imgSrvF_';
    this.properties = ['file', 'description'];


    this.countImgToPage = function () {
        _this.getProperty();
        console.log(this.p.allOptionsTo());

    };
    this.addAll = function () {
        _this.getProperty();
        var data = _this.p.allPropertiesTo();
        data.append('root', 'master');
        _this.ajax({
            type: "POST",
            url: "/imgServices/save/",
            data: data,
            dataType: "json",
            success: function (data) {
                console.log(data);
            }
        });
    }

}
