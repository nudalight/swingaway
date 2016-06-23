var homeCrs = $('.home-carousel__items');

$(homeCrs).slick({
    adaptiveHeight: true,
    autoplay: false,
    autoplaySpeed: 2000,
    appendDots: '.home-carousel__pager',
    dots: true,
    pauseOnHover: true,
    prevArrow: '<button class="home-carousel__arrow home-carousel__arrow--prev"></button>',
    nextArrow: '<button class="home-carousel__arrow home-carousel__arrow--next"></button>',
    customPaging: function(slider, i) {
        return $('<button type="button" data-role="none" role="button" tabindex="0" class="home-carousel__pager-butt" />');
    }
});


// adapt item: make center, crop sides

if ($(homeCrs).length) {

    var windowW, itemW, diff;

    var itemContainer = $(homeCrs).find('.home-carousel__item');

    $(window).on('load resize', function(){

        windowW = $(window).innerWidth();

        $(homeCrs).find('.home-carousel__item a').each(function(){

            itemW = $(this).outerWidth();

            console.log(itemW, windowW);

            if (itemW > windowW) {

                diff = (itemW - windowW) / 2  * -1;
                console.warn(diff);

                $(this).find('> *').css({
                    marginLeft: diff + 'px'
                });

            } else {

                $(this).find('> *').css({
                    marginLeft: ''
                });

            }

        });



    })

}