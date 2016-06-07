function WishlistPage(select){
    var that = this;
    this.select = select;
    this.items = $(this.select.prod);

    $(this.select.itemRemove).on('click', function(e){
        var it = $(e.target).closest(that.select.item);
        var id = $(it).data('product-id').toString();

        $(it).slideUp(200, function(){
            $(this).remove();
            wishlist_.remove(id);
            that.lookForEpty();
        });
    });

    this.lookForEpty = function(subtotal){
        if (!wishlist_.count()) {
            $(this.select.empty).removeClass('hide');
            $(this.select.container).addClass('hide');
        }
    };


    function init(){
        that.lookForEpty();
    }

    init();
}
