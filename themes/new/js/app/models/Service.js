/**
 * Created by tazeb on 25.06.2016.
 */
function Service(){
    var _this = this;
    this.properties = ['note', 'description'];
    this.prefix = 'srv_';
    this.labels = [];

    this.viewFromId = function (id) {
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
    this.loadScroll = function (place, idList){
      _this.ajax({
          type: "POST",
          url: "/services/index/",
          data: {ajax: 'load', id: idList},
          dataType: 'json',
          success: function (data) {
              var newData = document.createElement('div');
              newData.innerHTML = data.data.join('');
              if(place.appendChild(newData)){
                  if(data.nextId.length > 0){
                      _this.ctrl.statusLoadIndex = true;
                      _this.start.init('Service', 'indexLoad', {Id:data.nextId});
                  }
                  _this.start.init('Service', 'viewModal');
              }


          }
      });
    };
    this.save = function (){
        _this.ajax({
            type: "POST",
            url: "",
            data: {'Services':_this.p.allOptionsTo('Ajax'), ajax: 'update'},
            dataType: 'json',
            success: function(data){
                if(data.complete === true){
                    _this.errors().showAll();

                    _this.messages().showOne({
                        label: 'save',
                        text: 'Все ОК'
                    });
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
                }
            }
        });
    };
}
