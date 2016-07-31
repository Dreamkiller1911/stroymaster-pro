/**
 * Created by Admin on 08.07.2016.
 */
function ImgService() {

    var _this = this;
    this.prefix = 'imgSrvF_';
    this.properties = ['file', 'numOst', 'description'];
    this.labels = ['id', 'id_service', 'url', 'simple_url', 'description'];


    this.countImgToService = function (id) {
        _this.getProperty();
        console.log(this.p.allOptionsTo());

    };
    this.getAllFromIdService = function (id_service) {
        var _this = this;
        this.ajax({
            type: "POST",
            url: '/imgServices/getAll/',
            data: {'id_service': id_service},
            dataType: 'json',
            success: function(data) {
                var i, model = new Array;
                for (i = 0; i < data.length; i++) {
                    model[i] = _this.newModel('ImgService');
                    model[i].setAttributes(data[i]);
                }
                return model;
            }
        });
    };
    this.addAll = function () {
        var _this = this;
        this.getProperties();
        var data = this.p.allPropertiesTo();
        data.append('root', 'master');
        this.ajax({
            type: "POsT",
            url: "/imgServices/saveAll/",
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.complete) {
                    _this.p.numOst.style.background = 'red';
                    _this.p.numOst.innerHTML = data.imgBalance;
                    return data.img
                }
                console.log(data);
            }
        });
    };
    this.delete = function (id) {
        var _this = this;
        this.ajax({
            type: "POST",
            url: "/imgServices/delete/",
            data: {'deleteImg': {id: id}},
            dataType: 'json',
            success: function (data) {
                if(data.complete === true){
                    if(_this.p){
                        _this.p.numOst.innerHTML = Number(_this.p.numOst.innerHTML) + 1;
                    }else {
                        _this.getProperties();
                        _this.p.numOst.innerHTML = Number(_this.p.numOst.innerHTML) + 1;
                    }
                    console.log(_this.p.numOst)
                    return true;
                }else {
                    console.log(333)
                    return false;
                }
            }
        });
    };
    this.getOne = function(id){
        this.ajax({
            type: "POST",
            url: "/imgServices/getOne/",
            data: {'id': _this.id},
            dataType: 'json',
            success: function(data){
                _this.getProperties();
                var img = _this.newModel('ImgService');
                img.setAttributes(data);
                img.description = '2';
                img.save();
                console.log(img)

            }
        })
    }
    this.save = function(){
        var _this = this;
        this.ajax({
            type: "POST",
            url: '/imgServices/saveOne/',
            data: {id: _this.id, descroption: _this.description},
            success: function(data){
                console.log(data);
            }
        });
    }

}
