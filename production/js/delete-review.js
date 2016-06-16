$('.butt-delete-review').on('click', function(){

    var modal = $('#delete-review-modal');
    var reviewId = +$(this).closest('[data-review-id]').data('review-id');

    $(modal).find('[name="delete-review-id"]').val(reviewId);

    $(modal).modal('show');

});