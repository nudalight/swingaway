$('[data-scroll-to]').on('click', function(){
    
    var to = $(this).data('scroll-to');
    var clickAfter = $(this).data('click-after-scroll');


    $('html, body').animate({
        scrollTop: $(to).offset().top
    }, 400, function(){
        $(clickAfter).click();
    });

});

