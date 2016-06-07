var footerNav = '.footer-nav';

$(footerNav).on('click', function(e){
    var that = this;

    var navHead = '.footer-nav__head',
        navBody = '.footer-nav__body',
        openClass = 'footer-nav--opened',
        plusText = '+ Links',
        minusText = '- Links';

    function hideNav(){
        $(navBody).slideUp('fast');
        $(navHead).text(plusText);
    }

    function showNav(){
        $(navBody).slideDown('fast');
        $(navHead).text(minusText);
    }


    if ($(this).hasClass(openClass)) {
        hideNav();
    } else {
        showNav();
    }

    $(this).toggleClass(openClass);

    $(window).on('resize', function(e){
        var w = $(window).width();
        if (w >= 420) {
            $('.footer-nav__body').css({ display: ''});
            $(navHead).text(plusText);
            $(footerNav).removeClass(openClass);
        }
    });
    
});

