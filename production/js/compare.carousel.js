$('.compare__prods').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="compare-nav compare-nav--prev btn">move left</button>',
    nextArrow: '<button class="compare-nav compare-nav--next btn">move right</button>',
    appendArrows: '.compare__navs',
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 420,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});
