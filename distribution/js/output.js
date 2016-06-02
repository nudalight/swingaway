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
    }

});


function Validate(){
    var that = this;

    this.validate = function(tg){
        var result = true;
        switch (tg.dataset.validateAs){
            case 'text': result = v_.asText(tg);  break;
            default: result = v_.asText(tg);
        }
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
    };

    this.setValid = function(tg){
        var tgLink = $(tg).closest('.form-group');
        $(tgLink).addClass('has-success');
        $(tgLink).removeClass('has-error');
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

    init();
}








$('.butt-add-to-cart').on('click', function(){
    cart.increment(this);




    // console.log(1);
    // записать в куки







    // вывести из куки в блок
});
$('.footer-nav').on('click', function(e){
    var that = this;

    var selectHead = '.footer-nav__head';
    var selectNav = '.footer-nav__body';
    var openClass = 'footer-nav--opened';

    function hideNav(){
        $(selectNav).slideUp('fast');
        $(selectHead).text('+ Links');
    }

    function showNav(){
        $(selectNav).slideDown('fast');
        $(selectHead).text('- Links');
    }


    if ($(this).hasClass(openClass)) {
        hideNav();
    } else {
        showNav();
    }

    $(this).toggleClass(openClass);

});


$('.navbar-toggle').on('click', function(){
    setTimeout((function(){
            $('.offcanvas').css({
                left: 0
            });
        }
    ), 250);
});
console.log(12);
// Шаги алгоритма ECMA-262, 5-е издание, 15.4.4.17
// Ссылка (en): http://es5.github.io/#x15.4.4.17
// Ссылка (ru): http://es5.javascript.ru/x15.4.html#x15.4.4.17
if (!Array.prototype.some) {
    Array.prototype.some = function(fun/*, thisArg*/) {
        'use strict';

        if (this == null) {
            throw new TypeError('Array.prototype.some called on null or undefined');
        }

        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(thisArg, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}
$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});

$('.slider-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    vertical: true,
    centerMode: true,
    focusOnSelect: true,
    prevArrow: '<button class="image-gallery__nav image-gallery__nav-prev"></button>',
    nextArrow: '<button class="image-gallery__nav image-gallery__nav-next"></button>',
    responsive: [
        {
            breakpoint: 600,
            settings: {
                centerMode: false,
                adaptiveHeight: true,
                slidesToShow: 1,
                vertical: false
            }
        }
    ]
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
                // dots: true,
                // arrows: false,
                // dotsClass: 'upsell-grid__dots',
                // customPaging: function(slider, i) {
                //     return $('<button type="button" data-role="none" role="button" tabindex="0" class="upsell-grid__dot" />');
                // }
            }

        }
    ]
});

});