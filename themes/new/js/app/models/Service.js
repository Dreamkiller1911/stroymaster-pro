/**
 * Created by tazeb on 25.06.2016.
 */
function Service(){
    var _this = this;
    this.statusLoadIndex = true;

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
                    _this.owner.init('Comment', 'start');
                });
            }
        });
    };
    this.loadScroll = function(place, idList){
      _this.ajax({
          type: "POST",
          url: "/services/index/",
          data: {ajax: 'load', id: idList},
          dataType: 'json',
          success: function (data) {
              var newData = document.createElement('div');
              newData.innerHTML = data.data.join('');
              place.appendChild(newData);
              _this.statusLoadIndex = true;
              console.log(_this.owner)
          }
      });
    }
}
