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
        $('.billing__notice').removeClass('hide');
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


