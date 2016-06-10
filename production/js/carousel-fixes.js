// fixes slider shrink
setTimeout(function(){
    var sli = $('.slider-slick');
    $(sli).slick('slickPrev');
    $(sli).slick('slickNext');
}, 200);


// fixes sliders in hidden bootstap tabs-content
$('.nav-tabs').on('click', '[data-toggle="tab"]', function(e){

    var brokenClass = 'child-slider-broken';
    var broken = $(this).closest('.wrap').find('.' + brokenClass);

    $(broken).each(function(i, v, list){
        $(v).removeClass(brokenClass);
        $(v).slick('slickPrev');
        $(v).slick('slickNext');
    });
});