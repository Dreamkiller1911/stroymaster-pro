$(document).ready(function(){
    var user = new UserAuth();

    $('#in').click(function(event){
        $e = event || window.event;
        $e.preventDefault();
        user.trigForm();
    });
    $('body').on('click', '#reg',function(event){
        $e = event || window.event;
        $e.preventDefault();
        $e.preventDefault();
        user.trigForm();
    });
    $('body').on('click', '#loginForm button[name = "Login"]', function (event){
        $e = event || window.event;
        $e.preventDefault();
        $e.preventDefault();
        user.login();
    })
    $('body').on('click', '#regForm button[name = "btnRegUser"]', function (event){
        $e = event || window.event;
        $e.preventDefault();
        $e.preventDefault();
        user.regUser();
    })
});