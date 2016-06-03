var cart_ = new Cart({
    mirrorCart: '.services__cart .services__counter'
});

new CartPage({
    item: '.cart-a__item',
    cartEmpty: '.cart-a__empty',
    cartContainer: '.cart-a__container',
    itemRemove: '.cart-a__item-remove',
    subtotal: '.cart-a__item-subtotal-amout',
    sumSubtotal: '.cart-summary__submotal-amount',
    sumShipping: '.cart-summary__shipping-amount',
    sumTotal: '.cart-summary__total-amount',
    itemPrice: '.cart-a__item-price',
    itemAmount: '.cart-a__item-sum-amount'
});

var compare_ = new Compare({
    storageKey: 'swingaway__compare'
}, {
    mirror: '.services__compare .services__counter'
});

new ComparePage({
    prod: '.compare-prod',
    prodRemove: '.compare-prod__remove'
});

// good, but old
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
};