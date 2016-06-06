$('.carousel-upsell-accessories').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="upsell-grid__nav upsell-grid__nav-prev"></button>',
    nextArrow: '<button class="upsell-grid__nav upsell-grid__nav-next"></button>',
    responsive: [
        {
            breakpoint: 1120,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2
            }

        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }

        }
    ]
});


$('.carousel-upsell-parts').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="upsell-grid__nav upsell-grid__nav-prev"></button>',
    nextArrow: '<button class="upsell-grid__nav upsell-grid__nav-next"></button>',
    responsive: [
        {
            breakpoint: 1120,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2
            }

        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }

        }
    ]
});