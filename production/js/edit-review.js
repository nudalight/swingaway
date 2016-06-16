$('.butt-edit-review').on('click', function(){

    var
        modal = $('#edit-review-modal');
        review = $(this).closest('[data-review-id]');

        text = $(review).find('.my-review__text').text();
        reviewId = $(review).data('review-id');

        conclusion = $(review).find('.my-review__recommned-test').text().trim();
        starred = +$(review).find('[name="starred"]').val();


    $(modal).find('.edit-review-modal__message').val(text);
    $(modal).find('[name="edit-review-id"]').val(reviewId);

    $(modal).find('.edit-review-modal__opt').each(function(i, v, list){
        var
            label = $(v).find('label'),
            cond = $(label).text().trim() == conclusion,
            input = $(v).find('input');

        cond && $(input).trigger('click');
    });

    $(modal).find('.stars__star').each(function(i, v, list){
        if (i + 1 == starred) {
            $(this).trigger('click');
            console.log('starred true: ', i);
        } else {
            console.log('starred false: ', i);
        }
    });


    $(modal).modal('show');
});