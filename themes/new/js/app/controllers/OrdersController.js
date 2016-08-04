/**
 * Created by Admin on 04.08.2016.
 */
function OrdersController(){

    this.createAction = function(){
        var content = document.getElementById('formCreate');
        var btnCheck = this.getControls('check')
        this.if(function(){
            this.render('FormCreate');
        })
            .then(function(result){
                result.if.append(content)
            })
            .end()
    };
    this.indexAction = function(){
        alert('грузим index')
    }
}