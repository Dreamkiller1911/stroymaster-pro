/**
 * Created by tazeb on 25.06.2016.
 */
function Services(){
    this.properties = ['note', 'description'];
    this.prefix = 'srv_';
    this.labels = [];

    this.viewFromId = function (id) {
        var _this = this;
        _this.ajax({
            type: "POST",
            url: "/user/ShowService",
            data: {id:id},
            success: function(data){
                $('#myModal').modal('show');
                $('#myModal').on('shown.bs.modal', function () {
                    $(this).find('.modal-content').html(data);

                    var img = $(this).find('img[class="imgS"]').parent();
                    img.each(function(){
                        $(this).fancybox([]);
                    });
                    _this.start.init('Comment', 'load');
                });
            }
        });
    };
    this.loadData = function (idList){
        if(idList === false){
            return false;
        }
      this.ajax({
          type: "POST",
          url: "/services/AjaxLoad/",
          data: {ajax: 'load', 'id': idList},
          dataType: 'json',
          success: function (data) {
              if(data.result === false){
                  return false;
              }
              return data;
          }
      });
    };
    this.loadBaseData = function(){
        this.ajax({
            type: "POST",
            url: '/services/index',
            data: {getAjaxBase: ''},
            success: function(data){
                return data;
            }
        })
    };
    this.save = function (){
        var _this = this;
        this.ajax({
            type: "POST",
            url: "",
            data: {'Services':this.p.allPropertiesTo('Ajax'), ajax: 'update'},
            dataType: 'json',
            success: function(data){
                if(data.complete === true){
                    _this.errors().showAll();
                    /*this.messages().showOne({
                        label: 'save',
                        text: 'Все ОК'
                    });*/
                    //console.log(data)
                    return true;
                }else {
                    _this.errors().showAll({
                        dataError: data,
                        showMethod: function(text, label){
                            label.style.color = 'red';
                            label.innerHTML = text;
                        },
                        hideMethod: function(label){
                            label.innerHTML  = ''
                        }
                    })
                    return false
                }
            }
        });
    };
    this.viewPhone = function() {
        var pattern = /(\+7)|(8)\-?(\d{3})\-?(\d{3})/
        console.log(pattern.exec(this.phone));
    }
}
