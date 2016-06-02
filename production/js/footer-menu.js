$('.footer-nav').on('click', function(e){
    var that = this;

    var selectHead = '.footer-nav__head';
    var selectNav = '.footer-nav__body';
    var openClass = 'footer-nav--opened';

    function hideNav(){
        $(selectNav).slideUp('fast');
        $(selectHead).text('+ Links');
    }

    function showNav(){
        $(selectNav).slideDown('fast');
        $(selectHead).text('- Links');
    }


    if ($(this).hasClass(openClass)) {
        hideNav();
    } else {
        showNav();
    }

    $(this).toggleClass(openClass);

});

