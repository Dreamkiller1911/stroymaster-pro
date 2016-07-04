$(document).ready(function(){
    var user = new UserAuth();

    $('#in').click(function(){
        event.preventDefault();
        user.trigForm();
    });
    $('body').on('click', '#reg',function(){
        event.preventDefault();
        user.trigForm();
    });
    $('body').on('click', '#loginForm button[name = "Login"]', function (){
        event.preventDefault();
        user.login();
    })
    $('body').on('click', '#regForm button[name = "btnRegUser"]', function (){
        event.preventDefault();
        user.regUser();
    })
});