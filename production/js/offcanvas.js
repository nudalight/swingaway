console.log(12);

var opened = 'offcanvas-menu__item--opened';
var openedFix = 'offcanvas-submenu--fix';

// offcanvas-menu__link.offcanvas-menu__link--has-submenu.offcanvas-menu__link--opened

$('a').click(function(e){
    e.preventDefault();
});


$('.offcanvas-menu__item--has-sublist').on('click', function(e){

    var submenu = $(this).find('.offcanvas-submenu');

    if ($(this).hasClass(opened))
        submenu.length && submenu.slideUp(300);
    else
        submenu.slideDown(300);

    $(this).toggleClass(opened);
    $(this).find('.offcanvas-submenu').toggleClass(openedFix);


    console.warn(submenu, submenu.length);
});

$('.offcanvas-auth-choice__link').on('click', function(e){
    e.preventDefault();
    $('.navbar-toggle').click();
    setTimeout((
        $('#auth-modal').modal('show')
    ), 2500)

});