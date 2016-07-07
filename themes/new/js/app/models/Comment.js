/**
 * Created by tazeb on 17.06.2016.
 */
function Comment() {
    var _this = this;
    this.properties = ['id_user', 'text', 'first_name', 'email', 'service_id'];
    this.prefix = 'com_';

    this.getAll = function (text) {
        var data = {'weq': '23'};
        _this.ajax({
            type: 'get',
            url: '/comments/getAll/',
            data: {name: text},
            success: function (data) {
                document.getElementById('com').innerHTML = data;

            }

        });
    };
    this.getForm = function () {
        _this.ajax({
            type: "GET",
            url: '/comments/getForm/',
            success: function (data) {
                var test = document.getElementById('com');
                test.innerHTML = data;
                _this.owner.init('Comment', 'start');
            }
        });
    };
    this.saveForm = function () {
        var data = {
            Comments: {
                text: _this.p.text.value,
                first_name: _this.p.first_name.value,
                email: _this.p.email.value,
                service_id: _this.p.service_id.value
            }
        };
        var comList = document.getElementById('commentList');
        _this.ajax({
            type: "POST",
            url: "/comments/add/",
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.complete != true) {
                    _this.errors().showAll({
                        dataError: data,
                        errorPattern: {ID: 'Comments_{{prop}}_em_'},
                        showMethod: function(text, label){
                            $(label).css('opacity', 0).html(text).animate({'opacity': 1}, 1000)

                       },
                        hideMethod: function(label){
                            label.innerHTML  = ''
                        }
                    });

                } else {
                    setTimeout(function () {
                        var tmpDiv = document.createElement('div');
                        tmpDiv.innerHTML = data.comment;
                        comList.appendChild(tmpDiv.childNodes[0]);
                    }, 2000);
                }
            },
            beforeSend: function (HMLHttpRequest) {
                var pr = _this.progress({
                    type: 'ajax1'
                });
                comList.appendChild(pr);


            }
        });
    }
}
