$(window).on('load resize', function(){

    var compareProds = '.compare__prods';
    var compareProd = '.compare-prod';
    var heights = [];

    setTimeout(res, 500);

    function res(){
        // define products cell heights
        $(compareProd).each(function(i, v, list){


            $(v).children('.compare-prod__cell').each(function(i, v, list){
                $(v).height('auto');

                var cellH = $(v).height();
                heights[i] = heights[i] > cellH ? heights[i] : cellH;
            });


        });

        $(compareProd).each(function(i, v, list){
            $(v).children('.compare-prod__cell').each(function(i, v, list){
                $(v).height(heights[i]);
            });
        });

        $('.compare-attr__cell').each(function(i, v, list){
            $(v).height(heights[i]);
        });

        $('.compare').animate({ opacity: 1 }, 350);

        heights = [];
    }


    // carousel items width fix

    setTimeout(function(){

        var q = $(compareProd).length;

        if (q > 5) return false;

        var l = (100 / q) || 1;

        $(compareProds).find('.slick-list').css({ width: '100%' });
        $(compareProds).find('.slick-track').css({ width: '100%' });
        $(compareProds).find(compareProd).css({ width: l + '%' });

    }, 350);


});