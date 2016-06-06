// add | remove | increment | decrement

function Cart(userConfig){
    var that = this;
    var ls = localStorage;
    var cartName = 'swingaway__cart';

    var config = userConfig;

    this.getProductId = function(target){
        return $(target).closest('[data-product-id]').data('product-id');
    };

    function put(id, qty) {
        var cartData = parse();

        var countData;

        if (isAdded(id)){
            // increment
            cartData.forEach(function(v, i, list){
                if (list[i].id == id) {
                    countData = list[i].qty = qty;
                }
            });

        } else {
            // add new
            cartData.push({
                id: id,
                qty: qty
            });
            countData = qty;
        }

        // обновляем cart в LS
        ls.setItem(cartName, JSON.stringify(cartData));



        // debug 
        console.log(ls[cartName] ? ls[cartName] : []);

        mirror(countAll());
    }

    function parse(){
        return ls[cartName] ? JSON.parse(ls[cartName]) : [];
    }

    function isAdded(id){
        return parse().some(function(val, i, list){
            return list[i].id == id;
        });
    }

    this.increment = function(target){
        var id = $(target).closest('[data-product-id]').data('product-id');
        put(id, 1);
    };

    this.setQty = function(target, qty){
        var id = $(target).closest('[data-product-id]').data('product-id');
        put(id, qty);
    };

    this.decrement = function(target){

    };

    this.remove = function(target){
        var id = $(target).closest('[data-product-id]').data('product-id');
        var cartData = parse();
        console.info(typeof cartData);

        cartData.forEach(function(v, i, list){
            if (v.id == id){
                cartData.splice(i, 1);
            }
        });


        ls.setItem(cartName, JSON.stringify(cartData));



        mirror(countAll());

        console.info(cartData);
    };


    $('.butt-add-to-cart').on('click', function(e){
        cart_.increment(this);

        var picon = $(e.target).closest('[data-product-id]').find('.control-pad__icon');
        console.log(picon.length, 'OF LENGTH');

        if (picon.length){
            $(e.target).addClass('control-pad__icon--in-cart')
        }

        alert();

    });


    function mirror(v){
        if (config.mirrorCart){
            $(config.mirrorCart).text(v);
        }
    }

    function countAll(){
        var total = 0;
        var op;
        var cartData = parse();
        if (Object.keys(cartData).length > 0){
            console.warn(Object.keys(cartData).length);
            cartData.forEach(function(v, i, list){
                op = list && list[i].qty || 0;
                total += op;
            });
        }
        return total;
    }

    function init(){
        mirror(countAll());
    }
    
    function alert(){
        var alert = $('#alert-modal');
        $(alert).modal('show');

        var msg = 'You have <span>' + countAll() + '</span> products in your cart already! You can either continue shopping or go to checkout';

        $(alert).find('.alert-modal__message').html(msg);

        $(alert).find('.alert-modal__choice-a').text('Continue shopping');
        $(alert).find('.alert-modal__choice-b').text('Go to cart');

        $(alert).find('.alert-modal__choice-a').attr('data-dismiss', 'modal');
        $(alert).find('.alert-modal__choice-b').attr('href', '/cart-a.html');


    }

    init();
}







