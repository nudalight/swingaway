$('.butt-toggle-order-history-item').on('click', function(e){
   console.log('11)');

    var orderRoot = $(this).closest('[data-order-id]');
    var orderDetails = $(orderRoot).find('.order-in-history-details');

   
});