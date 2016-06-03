function ComparePage(userSelect){

    this.select = userSelect;

    var that = this;

    $(this.select.prod).on('click', this.select.prodRemove, function(){
        var id = $(this).closest('[data-product-id]').data('product-id').toString();
        console.log(1, id, typeof id);

        $(this).closest(that.select.prod).fadeOut('slow');
        compare_.remove(id);

    });

    this.remove = function(){
        
    };



}

