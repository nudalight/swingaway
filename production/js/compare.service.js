function Compare(config, select){
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
        var compareData = this.parse();
        compareData.push(id);
        this.ls.setItem(this.config.storageKey, compareData);
    };

    this.remove = function(id){
        var compareData = this.parse();

        var pos = $.inArray(id,compareData);

        if (pos != -1) {
            compareData.pop(pos);
        }


        this.ls.setItem(sk, compareData);
        console.log(this.parse());
        this.mirror();
    };


    $('.butt-add-to-compare').on('click', function(e){

        var id = $(this).closest('[data-product-id]').data('product-id').toString();

        !that.isAdded(id) && that.add(id);

        console.log(that.parse(), that.count());

        that.mirror();

        that.markControlIcon(e.target);
    });

    this.markControlIcon = function(tg){
        var picon = $(tg).closest('[data-product-id]').find('.control-pad__icon');

        console.warn(333, tg);
        if (picon.length){
            $(tg).addClass('control-pad__icon--in-compare')
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