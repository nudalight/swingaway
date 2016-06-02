function CartPage(cl){
    var that = this;

    this.select = cl;

    var items = $('.cart-a__item');

    this.items = items; 

    $(items).each(function(i, item, list){
        $(item).find('.cart-a__item-input').on('change', function(e){
            var itemRoot = $(e.target).closest('.cart-a__item');
            var itemQty = +$(this).val();
            var itemPrice = +$(itemRoot).find('.cart-a__item-price').text();
            var itemSum = $(itemRoot).find('.cart-a__item-sum-amount');
            var calculated = (itemQty * itemPrice).toFixed(2);
            $(itemSum).text(calculated);
            that.recalc();
            
            cart_.setQty(item, itemQty);
        });
    });

    $(this.select.itemRemove).on('click', function(e){
        var tg = $(e.target).closest(that.select.item);
        $(tg).fadeOut(200, function(){
            $(this).remove();
            cart_.remove(tg);
            that.recalc();
        });
    });

    console.log(111);

    this.recalc = function(){
        var sum = 0;

        $(this.select.item).each(function(i, item, list){
            sum += +$(item).find(that.select.itemAmount).text();
        });

        var subtotal = +sum.toFixed(2);

        this.lookForEpty(subtotal);

        $(this.select.subtotal).text(subtotal);
        $(this.select.sumSubtotal).text(subtotal);

        var shipping = +$(this.select.sumShipping).text();
        var total = (subtotal + shipping).toFixed(2);
        $(this.select.sumTotal).text(total);
    };

    this.lookForEpty = function(subtotal){
        if (subtotal == 0) {
            $(this.select.cartEmpty).removeClass('hide');
            $(this.select.cartContainer).addClass('hide');
            console.log('EMPTY')
        } else {
            $(this.select.cartEmpty).addClass('hide');
            $(this.select.cartContainer).removeClass('hide');
            console.log('NOT EMPTY');
        }

    };


    function init(){
        that.recalc();
    }

    init();
}
