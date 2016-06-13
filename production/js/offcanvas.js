var opened = 'offcanvas-menu__item--opened';


$('.offcanvas-menu__item--has-sublist').on('click', function(e){

    var submenu = $(this).find('.offcanvas-submenu');

    if ($(this).hasClass(opened)){
        submenu.length && submenu.slideUp(300);
    }

    else
        submenu.slideDown(300);

    $(this).toggleClass(opened);

    console.log(222);

});

$('.offcanvas-auth-choice__link').on('click', function(e){
    e.preventDefault();

    $('.navbar-toggle').click();

    setTimeout(function() {
        $('#auth-modal').modal('show');
    }, 400)

});