$(window).on('load resize', function(){

    var selectCompareProd = '.compare-prod';
    var heights = [];

    setTimeout(res, 500);

    function res(){
        // define products cell heights
        $(selectCompareProd).each(function(i, v, list){


            $(v).children('.compare-prod__cell').each(function(i, v, list){
                $(v).height('auto');

                var cellH = $(v).height();
                heights[i] = heights[i] > cellH ? heights[i] : cellH;
            });


        });

        $(selectCompareProd).each(function(i, v, list){
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

});