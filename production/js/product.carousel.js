$('.product-gallery__previews').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-gallery__shortcuts',
    prevArrow: '<button class="product-gallery__previews-nav product-gallery__previews-nav--prev"></button>',
    nextArrow: '<button class="product-gallery__previews-nav product-gallery__previews-nav--next"></button>',
    responsive: [
        {
            breakpoint: 1100,
            settings: {
                arrows: true
            }
        },
        {
            breakpoint: 920,
            settings: {
                arrows: false
            }
        },
        {
            breakpoint: 620,
            settings: {
                arrows: true
            }
        }
    ]
});

$('.product-gallery__shortcuts').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.product-gallery__previews',
    vertical: true,
    centerMode: true,
    focusOnSelect: true,
    prevArrow: '<button class="product-gallery__shortcuts-nav product-gallery__shortcuts-nav--prev"></button>',
    nextArrow: '<button class="product-gallery__shortcuts-nav product-gallery__shortcuts-nav--next"></button>',
    responsive: [
        {
            breakpoint: 620,
            settings: {
                centerMode: false,
                adaptiveHeight: true,
                slidesToShow: 3,
                vertical: false
            }
        }
    ]
});