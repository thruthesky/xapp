/**
 *
 * @file xapp.post-list.js
 *
 */
/**
 *
 */
if ( typeof xapp == 'undefined' ) var xapp = {};
var post_list = xapp.post_list = {};

$(function() {
    var $body = $('body');
    //$body.on('click', ".post-edit-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-delete-button", post_list.post_delete_button_clicked);
    $body.on('click', ".post-vote-button", post_list.post_vote_button_clicked);
    $body.on('click', ".post-report-button", post_list.post_report_button_clicked);
    $body.on('click', ".post-copy-button", post_list.post_copy_button_clicked);
    $body.on('click', ".post-move-button", post_list.post_move_button_clicked);
    $body.on('click', ".post-blind-button", post_list.post_blind_button_clicked);
    $body.on('click', ".post-block-button", post_list.post_block_button_clicked);
    $body.on('click', sl.comment_write_form(), post_list.comment_form_clicked);
    $body.on('click', '.show-more', post_list.show_more_clicked);

    $body.on('click', sl.post_write_button(), post_list.post_write_button_clicked);
    $body.on('click', sl.post_write_form() + ' .cancel', post_list.post_write_form_cancel);
    $body.on('click', sl.post_write_form() + ' .submit', post_list.post_write_form_submit);

    $body.on('click', sl.post_edit_button(), post_list.post_edit_button_clicked);
    $body.on('click', sl.post_edit_form() + ' .cancel', post_list.post_edit_form_cancel);
    $body.on('click', sl.post_edit_form() + ' .submit', post_list.post_edit_form_submit);

});


post_list.comment_form_clicked = function() {
    var $form = $(this);
    $form.addClass('selected');
};

post_list.show_more_clicked = function() {
    var $this = $(this);
    var $post = $this.parent();
    var $content = $post.find('.post-content');
    $content.css( {
        'overflow': 'visible',
        'max-height' : 'none'
    } );
};




post_list.get_post = function ($this) {
    return $this.closest( '.post' );
};

post_list.get_content = function ( post ) {


    if ( post.content_type == 'undefined' ) {

    }
    else if ( post.content_type == 'text/plain'  ) {
        post.post_content = sanitize_content( post.post_content );
    }
    else {

    }

    return post.post_content;

};





post_list.post_edit_button_clicked = function() {
    console.log('post edit button clicked');
    if ( el.post_edit_form().length ) {
        xapp.alert('Cannot edit', 'You are on editing another post now. Please submit or cancel the post edit before you are going to edit this post.');
        return;
    }
    var $this = $(this);
    var $post = post_list.get_post( $this );
    //console.log($post);
    $post.hide();


    var $m = $(markup.post_edit_form( $this ));

    var post_ID = $post.attr('post-id');
    var title = trim($post.find('.post-title').text());
    var content = trim( $post.find('.post-content').text());


    $m.find('[name="post_ID"]').val( post_ID );
    $m.find('[name="title"]').val( title );
    $m.find('[name="content"]').val( content );

    $post.after( $m );

};


post_list.post_delete_button_clicked = function () {
    console.log('post delete button clicked');
    var $this = $(this);
    var $post = post_list.get_post( $this );
};


post_list.post_write_button_clicked =  function() {


    if ( el.post_write_form().length ) {

        xapp.alert('POST Writing', 'Post write form is already opened. You must close it first before you post another.');
        return;
    }

    var $this = $(this);
    var $header = $this.closest( '.post-list-page-header' );
    $header.after( markup.post_write_form( $this ) );
};



xapp.callback_post_add_show_more = function (data) {

    ///;
    $(".post-list-page[page='"+data.in['page']+"']").find('.post-list-page-content').find('.post').each(function(index, element){
        //console.log(index);
        //console.log(element);

        var $post = $(element);
        var $content = $post.find('.post-content');

        // console.log($content);


        //console.log($content[0].scrollHeight);
        //console.log($content.innerHeight());
        /**
         * if the height of content is over-wrapped.
         */
        /**
         * @note innerHeight() 에 +1 을 해야지, 더 잘되는 것 같다.
         *
         */
        //if ( typeof $content[0] != 'undefined' && typeof $content[0].scrollHeight != 'undefined' ) {
            if ( $content[0].scrollHeight > $content.innerHeight() + 1) {
                $content.css('background-color', '#efe9e9');
                $content.after("<div class='show-more'>show more ..." +
                        // "scrollHeight:" + $content[0].scrollHeight +
                        // "innerHeight:" + $content.innerHeight() +
                    "</div>");
            }
        //}
    });
    ///;
};



post_list.post_vote_button_clicked = function () {

};

post_list.post_report_button_clicked = function () {

};
post_list.post_copy_button_clicked = function () {

};
post_list.post_move_button_clicked = function () {

};
post_list.post_blind_button_clicked = function () {

};
post_list.post_block_button_clicked = function () {

};
post_list.post_write_form_cancel = function() {
    el.post_write_form().remove();
};

post_list.post_write_form_submit = function() {
    var $this = $(this);
    $this.prop('disabled', true);
    var $form = $this.closest('form');
    var url = xapp.server_url + '?' + $form.serialize();
    // console.log(url);
    $.post({
        'url' : url,
        'success' : function(re) {
            // console.log(re);
            if ( re.success ) {
                if ( xapp.option.alert.after_post ) xapp.alert("POST Success", "You just have posted...", xapp.reload);
                else xapp.reload();
            }
            else {
                xapp.alert( re.data );
            }
        },
        'error' : function () {
            $this.prop('disabled', false);
            alert('error on post write form');
        }
    });
};

post_list.post_edit_form_cancel = function () {

    var $cancel = $(this);
    var $edit = $cancel.closest( sl.post_edit_form() );

    $edit.remove();
    var post_ID = $edit.find('[name="post_ID"]').val();
    $('.post[post-id="'+post_ID+'"').show();

};
post_list.post_edit_form_submit = function () {
    var $submit = $(this);
    $submit.prop('disabled', true);
    var $edit = $submit.closest( sl.post_edit_form() );
    var post_ID = $edit.find('[name="post_ID"]').val();
    var $post = $('.post[post-id="'+post_ID+'"');
    var url = xapp.server_url + '?' + $edit.find('form').serialize();
    console.log(url);
    $.post({
        'url' : url,
        'success' : function(re) {
            console.log(re);
            if ( re.success ) {
                var title = $edit.find('[name="title"]').val();
                var content = $edit.find('[name="content"]').val();
                $post.find('.post-title').text( title );
                $post.find('.post-content').html( sanitize_content(content) );
                $edit.remove();
                $post.show();
                if ( xapp.option.alert.after_edit ) xapp.alert("EDIT Success", "You just have edited a post.");

            }
            else {
                xapp.alert( 'Post edit failed', xapp.get_error_message(re.data) );
            }
            $submit.prop('disabled', false);
        },
        'error' : function () {
            $submit.prop('disabled', false);
            alert('error on edit write form');
        }
    });

};