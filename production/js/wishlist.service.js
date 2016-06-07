function Wishlist(config, select){
    var that = this;
    this.ls = localStorage;

    this.select = select;
    this.config = config;

    var sk = this.config.storageKey;

    this.parse = function(){
        var sk = this.config.storageKey;
        return this.ls[sk] ? this.ls[sk].split(',') : [];
    };

    this.isAdded = function(id){
        return this.parse().contains(id);
    };

    this.add = function(id){
        var storedData = this.parse();
        storedData.push(id);
        this.ls.setItem(this.config.storageKey, storedData);
    };

    this.remove = function(id){
        console.log('has to be removed: ', id);
        var storedData = this.parse();

        var pos = $.inArray(id,storedData);

        if (pos != -1) {
            storedData.pop(pos);
        }

        this.ls.setItem(sk, storedData);
        console.log(this.parse());
        this.mirror();
    };

    // this.select.addButton
    $(this.select.addButton).on('click', function(e){

        var id = $(this).closest('[data-product-id]').data('product-id').toString();

        !that.isAdded(id) && that.add(id);

        console.log(that.parse(), that.count(), 'wishlist');

        that.mirror();

        that.markControlIcon(e.target);

    });

    this.markControlIcon = function(tg){
        var picon = $(tg).closest('[data-product-id]').find('.control-pad__icon');

        if (picon.length){
            $(tg).addClass('control-pad__icon--in-wishlist')
        }
    };

    this.count = function(){
        return this.parse().length;
    };

    this.mirror = function(){
        $(this.select.mirror).text( this.count() );
    };

    function init(){
        that.mirror();
    }

    init();
}


