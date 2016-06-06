var currentSlide;
$('.image-gallery__preview').on('click', 'img', function(e){

    currentSlide = $('.slider-for').slick('slickCurrentSlide');

    $('#product-gallery-modal').modal({
        show: true
    });

    console.log(5, currentSlide);

    /*
        1. click on the element
        2. build modal
        3. append modal to DOM
        3.1 launch slick
        4. appedd slides to modal from image-gallery
        5. scroll modal slider to currentSlide
     */
});