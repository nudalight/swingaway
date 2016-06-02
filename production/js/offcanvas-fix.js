$('.navbar-toggle').on('click', function(){
    setTimeout((function(){
            $('.offcanvas').css({
                left: 0
            });
        }
    ), 250);
});