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
    mirror: '.services__compare .services__counter',
    addButton: '.butt-add-to-compare'
});

var wishlist_ = new Wishlist({
    storageKey: 'swingaway__wishlist'
}, {
    mirror: '.services__wishlist .services__counter',
    addButton: '.butt-add-to-wishlist'
});

new ComparePage({
    prod: '.compare-prod',
    prodRemove: '.compare-prod__remove',
    compareContainer: '.compare__container',
    compareEmpty: '.compare__empty'
});


new WishlistPage({
    item: '.wishlist-item',
    itemRemove: '.wishlist-item__remove',
    container: '.wishlist__table',
    empty: '.wishlist__empty'
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