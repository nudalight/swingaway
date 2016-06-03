$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    responsive: [
        {
            breakpoint: 600,
            settings: {
                arrows: true,
                prevArrow: '<button class="image-gallery__nav image-gallery__nav--prev"></button>',
                nextArrow: '<button class="image-gallery__nav image-gallery__nav--next"></button>'
            }
        }
    ]
});

$('.slider-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    vertical: true,
    centerMode: true,
    focusOnSelect: true,
    prevArrow: '<button class="image-gallery__nav image-gallery__nav-prev"></button>',
    nextArrow: '<button class="image-gallery__nav image-gallery__nav-next"></button>',
    responsive: [
        {
            breakpoint: 600,
            settings: {
                centerMode: false,
                adaptiveHeight: true,
                slidesToShow: 3,
                vertical: false
            }
        }
    ]
});