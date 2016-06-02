$('.home-carousel__items').slick({
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