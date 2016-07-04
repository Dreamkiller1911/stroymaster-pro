$('document').ready(function(){
    $('#gallery-works').on('click', 'a', function () {
        var servicesView = new Services();
        servicesView.showService(this);

    });
    /*$('body').on('click.senComm', '#sendComment', function(){
        var servicesView = new Services(this);
        servicesView.sendComment();
    })*/


    $('body').on('click.close', '#back > span', function(){
        var servicesView = new Services(this);
        servicesView.closePreview();
    })

    /*$('body').on('click', '#back a[rel]', function(){
        $(this).fancybox([]);
    });*/
});