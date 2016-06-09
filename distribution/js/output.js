$(document).ready(function(){

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
    container: '.wishlist__container',
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
var v_ = new Validate();


$('.billing__form').on('blur', '.form-control', function(e){
    v_.validate(e.target);
});


$('.billing__submit').on('click', function(e){
    var billingForm = $('.billing__form');

    if ($(billingForm).hasClass('form-is-valid')) {
        // send data to server
        console.log('data is ready to send to server');
    } else {
        e.preventDefault();
        v_.validateForm($(billingForm));
        $('.billing__form-error').removeClass('hide');
    }

});


function Validate(){
    var that = this;

    this.validate = function(tg){
        var result = true;
        switch (tg.dataset.validateAs){
            case 'text': result = v_.asText(tg);  break;
            case 'select': result = v_.asSelect(tg);  break;
            default: result = v_.asText(tg);
        }
        return result;
    };

    this.asSelect = function(tg){
        var result = $(tg).val().trim() != 'placeholder';
        this.handleResult(tg, result);
        return result;
    };

    this.asText = function(tg){
        var result = $(tg).val().trim().length > 4;
        this.handleResult(tg, result);
        return result;
    };

    this.asEmail = function(tg){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = re.test($(tg).val().trim());
        this.handleResult(tg, result);
        return result;
    };

    this.setInvalid = function(tg){
        var tgLink = $(tg).closest('.form-group');
        $(tgLink).addClass('has-error');
        $(tgLink).removeClass('has-success');

        this.setFormInvalid($(tg).closest('form'));

        var x = $(tgLink).find('[class*="error"]');

        console.warn(x);

        $(tgLink).find('[class*="error"]').removeClass('hide');
    };

    this.setValid = function(tg){
        var tgLink = $(tg).closest('.form-group');
        $(tgLink).addClass('has-success');
        $(tgLink).removeClass('has-error');

        $(tgLink).find('[class*="error"]').addClass('hide');
    };

    this.handleResult = function(tg, isValid){
        isValid ? this.setValid(tg) : this.setInvalid(tg);
    };

    this.validateForm = function(formNode){
        var isFailed = true;
        $(formNode).find('.form-control').each(function(i, v, list){
             if (that.validate(v)) {
                 isFailed = false;
             }
        });
    };

    this.setFormValid = function(formNode){
        formNode.addClass('form-is-valid');
        formNode.removeClass('form-is-invalid');
    };

    this.setFormInvalid = function(formNode){
        formNode.addClass('form-is-invalid');
        formNode.removeClass('form-is-valid');
    };
}



$('.home-carousel__items').slick({
    adaptiveHeight: true,
    autoplay: false,
    autoplaySpeed: 2000,
    appendDots: '.home-carousel__pager',
    dots: true,
    pauseOnHover: true,
    prevArrow: '<button class="home-carousel__arrow home-carousel__arrow--prev"></button>',
    nextArrow: '<button class="home-carousel__arrow home-carousel__arrow--next"></button>',
    customPaging: function(slider, i) {
        return $('<button type="button" data-role="none" role="button" tabindex="0" class="home-carousel__pager-butt" />');
    }
});
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








function Stars(node){
    var that = this;
    this.root = node;
    this.els = $(this.root).find('.stars__star');

    var starred = '.stars__star--red';

    this.colorTo = function(n){
        $(this.els).each(function(i, v, list){
            if (i <= n) {
                $(v).addClass('stars__star--red');
            } else {
                $(v).removeClass('stars__star--red');
            }
        });
    };

    $('.choose-from-stars').on('mouseover', '.stars__star', function(e){

        var pos = that.getPos(e.target);

        that.colorTo(pos);
    });

    $('.choose-from-stars').on('mouseout', '.stars__star', function(e){

        var pos = +$(that.root).find('.stars__starred').val();

        that.colorTo(pos);
    });

    $('.choose-from-stars').on('click', '.stars__star', function(e){

        var pos = that.getPos(e.target);

        $(that.root).find('.stars__starred').val(pos);
    });

    this.getPos = function(tg){
        var pos = 0;
        $(that.els).each(function(i, v, list){
            console.log(i, v);
            if (v == tg) {
                pos = i;
            }
        });
        return pos;
    };

    this.uncolorAll = function(){
        $(this.els).each(function(i, v, list){
            $(v).removeClass('stars__star--red');
       });
    };

    function init(){
        that.uncolorAll();
    }

    init();

}

new Stars( $('.choose-from-stars .stars') );
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


$(window).on('load resize', function(){

    var compareProds = '.compare__prods';
    var compareProd = '.compare-prod';
    var heights = [];

    setTimeout(res, 500);

    function res(){
        // define products cell heights
        $(compareProd).each(function(i, v, list){


            $(v).children('.compare-prod__cell').each(function(i, v, list){
                $(v).height('auto');

                var cellH = $(v).height();
                heights[i] = heights[i] > cellH ? heights[i] : cellH;
            });


        });

        $(compareProd).each(function(i, v, list){
            $(v).children('.compare-prod__cell').each(function(i, v, list){
                $(v).height(heights[i]);
            });
        });

        $('.compare-attr__cell').each(function(i, v, list){
            $(v).height(heights[i]);
        });

        $('.compare').animate({ opacity: 1 }, 350);

        heights = [];
    }


    // carousel items width fix

    setTimeout(function(){

        var q = $(compareProd).length;

        if (q > 5) return false;

        var l = (100 / q) || 1;

        $(compareProds).find('.slick-list').css({ width: '100%' });
        $(compareProds).find('.slick-track').css({ width: '100%' });
        $(compareProds).find(compareProd).css({ width: l + '%' });

    }, 350);


});
$('.compare__prods').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="compare-nav compare-nav--prev btn">move left</button>',
    nextArrow: '<button class="compare-nav compare-nav--next btn">move right</button>',
    appendArrows: '.compare__navs',
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 420,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

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
var footerNav = '.footer-nav';

$(footerNav).on('click', function(e){
    var that = this;

    var navHead = '.footer-nav__head',
        navBody = '.footer-nav__body',
        openClass = 'footer-nav--opened',
        plusText = '+ Links',
        minusText = '- Links';

    function hideNav(){
        $(navBody).slideUp('fast');
        $(navHead).text(plusText);
    }

    function showNav(){
        $(navBody).slideDown('fast');
        $(navHead).text(minusText);
    }


    if ($(this).hasClass(openClass)) {
        hideNav();
    } else {
        showNav();
    }

    $(this).toggleClass(openClass);

    $(window).on('resize', function(e){
        var w = $(window).width();
        if (w >= 420) {
            $('.footer-nav__body').css({ display: ''});
            $(navHead).text(plusText);
            $(footerNav).removeClass(openClass);
        }
    });
    
});


var opened = 'offcanvas-menu__item--opened';


$('.offcanvas-menu__item--has-sublist').on('click', function(e){

    var submenu = $(this).find('.offcanvas-submenu');

    if ($(this).hasClass(opened))
        submenu.length && submenu.slideUp(300);
    else
        submenu.slideDown(300);

    $(this).toggleClass(opened);

});

$('.offcanvas-auth-choice__link').on('click', function(e){
    e.preventDefault();

    $('.navbar-toggle').click();

    setTimeout(function() {
        $('#auth-modal').modal('show');
    }, 400)

});
$('.product-gallery__previews').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-gallery__shortcuts',
    prevArrow: '<button class="product-gallery__previews-nav product-gallery__previews-nav--prev"></button>',
    nextArrow: '<button class="product-gallery__previews-nav product-gallery__previews-nav--next"></button>',
    responsive: [
        {
            breakpoint: 1100,
            settings: {
                arrows: true
            }
        },
        {
            breakpoint: 920,
            settings: {
                arrows: false
            }
        },
        {
            breakpoint: 620,
            settings: {
                arrows: true
            }
        }
    ]
});

$('.product-gallery__shortcuts').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.product-gallery__previews',
    vertical: true,
    centerMode: true,
    focusOnSelect: true,
    prevArrow: '<button class="product-gallery__shortcuts-nav product-gallery__shortcuts-nav--prev"></button>',
    nextArrow: '<button class="product-gallery__shortcuts-nav product-gallery__shortcuts-nav--next"></button>',
    responsive: [
        {
            breakpoint: 620,
            settings: {
                centerMode: false,
                adaptiveHeight: true,
                slidesToShow: 3,
                vertical: false
            }
        }
    ]
});
$('.search__submit').on('click', function(){
    $(this).closest('form').submit();
});
$('[data-scroll-to]').on('click', function(){
    
    var to = $(this).data('scroll-to');
    var clickAfter = $(this).data('click-after-scroll');


    $('html, body').animate({
        scrollTop: $(to).offset().top
    }, 400, function(){
        $(clickAfter).click();
    });

});


$('.carousel-upsell-accessories').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="upsell-grid__nav upsell-grid__nav-prev"></button>',
    nextArrow: '<button class="upsell-grid__nav upsell-grid__nav-next"></button>',
    responsive: [
        {
            breakpoint: 1120,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2
            }

        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }

        }
    ]
});


$('.carousel-upsell-parts').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="upsell-grid__nav upsell-grid__nav-prev"></button>',
    nextArrow: '<button class="upsell-grid__nav upsell-grid__nav-next"></button>',
    responsive: [
        {
            breakpoint: 1120,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2
            }

        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }

        }
    ]
});
$('')
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




});