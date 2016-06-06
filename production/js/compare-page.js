function ComparePage(select){

    this.select = select;

    var that = this;

    $(this.select.prod).on('click', this.select.prodRemove, function(){
        var id = $(this).closest('[data-product-id]').data('product-id').toString();
        console.log(1, id, typeof id);

        $(this).closest(that.select.prod).fadeOut('slow');
        compare_.remove(id);

        that.lookForEmpty();

        console.log('len: ', !!compare_.count(), typeof compare_.count());
        console.warn($(that.select.compareContainer))

    });

    this.remove = function(){
        
    };

    this.lookForEmpty = function(){
        if (!compare_.count()) {
            $(this.select.compareContainer).addClass('hide');
            $(this.select.compareEmpty).removeClass('hide');
        } else {
            console.info('COUNT IS NOT FALSE: ', compare_.count())
        }
    };

    function init(){
        that.lookForEmpty();
    }

    init();
}

