$(function() {

    $('body').on('click', ".post-list-group-content .post form", function() {
        var $form = $(this);
        $form.addClass('selected');
    });

});