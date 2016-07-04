/**
 * Created by tazeb on 29.03.2016.
 */
function listImg(){
    var _this = this;
    this.list = [];

    this.addImg = function(data){
        _this.list.push(data);
    }
};

var listImg = new listImg();


function readFile(input)
{
    var _this = this;
    this.file = input.files;
    this.f = input;
    this.list = new Array;
    this.prev = $('#prev');
    this.place = $('#listImg');
    this.generateListInput = function(){



    };
    if(listImg.list.length  == 1){
        _this.file[1] = listImg.list[0];
    }
    listImg.addImg(_this.file[0]);


    //console.log(_this.file);
    for (var i = 0; i < _this.file.length; i++){
        console.log(_this.file);
        var reader = new FileReader();

        //console.log(reader);
        reader.readAsDataURL(_this.file[i]);
        reader.onload = function(e){
            var img = new Image;

            img.src = e.target.result;
            img.onload = function() {
                var prevImg = '<img id= src=""  height="150px" width="150px">';
                var inp = '<input type="file" name="file[]">';
                $(prevImg).appendTo(_this.place).attr('src', this.src);


            }
        }
    }

}
