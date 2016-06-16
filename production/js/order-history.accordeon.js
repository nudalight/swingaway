(function(){

    var triggerButt = '.butt-toggle-order-in-history';
    var activeClass = 'order-in-history-basics--active';
    var altButtText = 'Hide details';
    var defaultButtText = '';

    $(triggerButt).on('click', function(e) {

        var tg = e.target;
        var tgRoot = $(tg).closest('.order-in-history-basics');

        $(tgRoot).toggleClass(activeClass);

        var orderRoot = $(this).closest('[data-order-id]');
        var orderDetails = $(orderRoot).find('.order-in-history-details');

        var aChild = $(this).attr('href');

        $('.panel').each(function (i, v, list) {
            var lookItem = $(v).find(triggerButt);
            var child = $(lookItem).attr('href');

            if (aChild != child) {
                $(v).find('.collapse').collapse('hide');
                $(v).closest('.order-in-history-basics').removeClass(activeClass);
            }

        });
    });


})();