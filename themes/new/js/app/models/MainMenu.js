/**
 * Created by Admin on 02.08.2016.
 */
function MainMenu(){

    this.getData = function(){
        this.ajax({
            type: "POST",
            url: '/site/MainMenuGenerate/',
            data: {},
            dataType: "json",
            success: function(data) {
               return data;
            }
        });
    }
}