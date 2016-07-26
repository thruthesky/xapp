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


    $body.on('click', sel(post_edit_button), post_list.post_edit_button_clicked);
    $body.on('click', sel(post_delete_button), post_list.post_delete_button_clicked);
    $body.on('click', ".post-vote-button", post_list.post_vote_button_clicked);
    $body.on('click', ".post-report-button", post_list.post_report_button_clicked);
    $body.on('click', ".post-copy-button", post_list.post_copy_button_clicked);
    $body.on('click', ".post-move-button", post_list.post_move_button_clicked);
    $body.on('click', ".post-blind-button", post_list.post_blind_button_clicked);
    $body.on('click', ".post-block-button", post_list.post_block_button_clicked);
    $body.on('click', '.show-more', post_list.show_more_clicked);

    $body.on('click', sel(post_write_button), post_list.post_write_button_clicked);
    $body.on('click', sel(post_write_form) + ' .cancel', post_list.post_write_form_cancel);
    $body.on('click', sel(post_write_form) + ' .submit', post_list.post_write_form_submit);

    $body.on('click', sel(post_edit_form) + ' .cancel', post_list.post_edit_form_cancel);
    $body.on('click', sel(post_edit_form) + ' .submit', post_list.post_edit_form_submit);



    $body.on('click',
        sel(comment_write_form) + ' textarea, ' + sel(comment_write_form) + ' .fa-camera',
        post_list.comment_form_clicked);
    $body.on('click', sel(comment_write_button), post_list.comment_write_form_submit);
    $body.on('click', sel(comment_cancel_button), post_list.comment_cancel_form_submit);


    $body.on('click', '.' + comment_edit_button, post_list.comment_edit_button_clicked);
    $body.on('click', '.' + comment_edit_form + ' .submit', post_list.comment_edit_form_submit);

    $body.on('click', '.' + comment_edit_form + ' .cancel', post_list.comment_edit_form_cancel);

    $body.on('click', '.'+ comment_delete_button, post_list.comment_delete_button_clicked);





});



post_list.show_more_clicked = function() {
    var $this = $(this);
    var $post = $this.parent();
    var $content = $post.find('.content');
    $content.css( {
        'overflow': 'visible',
        'max-height' : 'none'
    } );
};


/**
 *
 * if obj is not number or string, then it assumes 'obj' as post_ID
 * or, it assumes 'jQuery Object'
 *
 * ( 입력된 글 번호 또는 객체의 가장 가까운 글을 찾는다. )
 *
 *
 * @code
 *      var $post = post_list.get_post( $this );
 *      @endcode
 *
 */
var post = get_post = post_list.get_post = function ( obj ) {
    if ( typeof obj == 'string' || typeof obj == 'number' ) {
        return $('.post[post-id="'+obj+'"]');
    }
    else {
        return obj.closest( '.post' );
    }
};


/**
 *
 * Returns the comment object of 'comment_ID'
 *
 *
 *
 * @code
 post_list.comment_edit_form_cancel = function () {
            var $form = get_comment_edit_form( $(this) );
            get_comment( get_comment_ID( $form ) ).show();
            $form.remove();
        };
 * @endcode
 *
 *
 */
var get_comment = function ( comment_ID ) {
    return $('.comment[comment-id="'+ comment_ID +'"]');
};

/**
 * Returns the nearest comment edit form.
 *
 * @code
        post_list.comment_edit_form_cancel = function () {
            var $form = get_comment_edit_form( $(this) );
            get_comment( get_comment_ID( $form ) ).show();
            $form.remove();
        };
 * @endcode
 *
 */
var get_comment_edit_form = function( $obj ) {
    return $obj.closest( sl(comment_edit_form) );
};

/**
 * Returns comment ID of 'comment edit form'.
 *
 * @param $form - comment edit form.
 * @returns int
 *
 *
 * @code
 post_list.comment_edit_form_cancel = function () {
            var $form = get_comment_edit_form( $(this) );
            get_comment( get_comment_ID( $form ) ).show();
            $form.remove();
        };
 * @endcode
 *
 *
 */
function get_comment_ID($form) {
    return $form.find('[name="comment_ID"]').val();
}


/**
 *
 * Returns content of an post/content object.
 *
 * @code
 *      get_content( post )
 *      get_content( comment )
 * @endcode
 *
 */
var get_content = function ( obj ) {
    var content = '';
    if ( obj.content_type == 'undefined' ) {
        content = obj;
    }
    else if ( obj.content_type == 'text/plain'  ) {
        if ( typeof obj.post_content != 'undefined' ) content = sanitize_content( obj.post_content );
        else if ( typeof obj.comment_content != 'undefined' ) content = sanitize_content( obj.comment_content );
        else content = obj;
    }
    else {
        if ( typeof obj.post_content != 'undefined' ) content =  obj.post_content;
        else if ( typeof obj.comment_content != 'undefined' ) content = obj.comment_content;
        else content = obj.post_content;
    }
    return content;
};





post_list.post_edit_button_clicked = function() {
    // console.log('post edit button clicked');
    if ( ele(post_edit_form).length ) {
        xapp.alert('Cannot edit', 'You are on editing another post now. Please submit or cancel the post edit before you are going to edit this post.');
        return;
    }
    var $this = $(this);
    var $post = post_list.get_post( $this );
    //console.log($post);
    $post.hide();
    var $m = $(markup.post_edit_form( $this ));
    var post_ID = $post.attr('post-id');
    var title = trim($post.find('.title').text());
    var content = trim( $post.find('.content').text());
    $m.find('[name="post_ID"]').val( post_ID );
    $m.find('[name="title"]').val( title );
    $m.find('[name="content"]').val( content );
    $post.after( $m );
};


post_list.post_delete_button_clicked = function () {
    console.log('post delete button clicked');
    var $this = $(this);
    var $post = post_list.get_post( $this );
    var post_ID = $post.attr('post-id');
    var url = xapp.server_url + '?forum=post_delete_submit&response=ajax&session_id=' + xapp.session_id + '&post_ID=' + post_ID;
    console.log(url);
    $.get(url, function(re) {
        if ( re.success  ) {
            xapp.alert("POST deleted", "You have deleted a post.");
            $post.remove();
        }
    } );
};



post_list.post_write_button_clicked =  function() {


    if ( ele(post_write_form).length ) {

        xapp.alert('POST Writing', 'Post write form is already opened. You must close it first before you post another.');
        return;
    }

    var $this = $(this);
    var $header = $this.closest( '.header' );
    $header.after( markup.post_write_form( $this ) );
};



xapp.callback_post_add_show_more = function (data) {

    ///;
    $(".post-list-page[page='"+data.in['page']+"']").find('.post').each(function(index, element){
        //console.log(index);
        //console.log(element);

        var $post = $(element);
        var $content = $post.find('.content');

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
                         //"scrollHeight:" + $content[0].scrollHeight +
                         //"innerHeight:" + $content.innerHeight() +
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
    console.log(url);
    $.post({
        'url' : url,
        'success' : function(re) {
            console.log(re);
            if ( typeof re.success ) {
                if ( re.success ) {
                    if ( xapp.option.alert.after_post ) xapp.alert("POST Success", "You just have posted...", xapp.reload);
                    else xapp.reload();
                }
                else {
                    xapp.alert( "Error on posting", re.data.message );
                }
            }
            else {
                xapp.alert("Server error", "Cannot parse response. There might be an error inside the server. ( Maybe it's a script error. )");
            }
            $this.prop('disabled', false);
        },
        'error' : function () {
            $this.prop('disabled', false);
            xapp.alert("Post query error", "Error occurs on post query.");
        }
    });
};

post_list.post_edit_form_cancel = function () {

    var $cancel = $(this);
    var $edit = $cancel.closest( sel(post_edit_form) );

    $edit.remove();
    var post_ID = $edit.find('[name="post_ID"]').val();
    $('.post[post-id="'+post_ID+'"').show();

};
post_list.post_edit_form_submit = function () {
    var $submit = $(this);
    $submit.prop('disabled', true);
    var $edit = $submit.closest( sel(post_edit_form) );
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
                $post.find('.title').text( title );
                $post.find('.content').html( sanitize_content(content) );
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


/**
 * This expands comment textarea when user clicks on camera button or textarea on comment box.
 */
post_list.comment_form_clicked = function() {
    var $form = $(this).closest( sel(comment_write_form) );
    console.log('comment form clicked');
    if  ( $form.hasClass('selected') ) {
        // console.log('and it has .selected already.');
    }
    else {
        $form.addClass('selected');
        // console.log('adding .selected');
    }
};


post_list.comment_write_form_submit = function () {

    var $submit = $(this);
    $submit.prop('disabled', true);
    var $comment_form = $submit.closest( sel(comment_write_form) );
    var post_ID = $comment_form.find('[name="post_ID"]').val();
    var $post = $('.post[post-id="'+post_ID+'"');
    var url = xapp.server_url + '?' + $comment_form.find('form').serialize();
    console.log( url );

    $.post({
        'url' : url,
        'success' : function(re) {
            console.log(re);
            function post_comment_list(post_ID) {
                return post( post_ID ).find('.comment-list');
            }

            if ( re.success ) {
                //var content = $edit.find('[name="content"]').val();
                //$post.find('.content').html( sanitize_content(content) );

                if ( xapp.option.alert.after_edit ) xapp.alert("Comment post success", "You just have just posted a comment.");
                post_list.close_comment_write_form( $comment_form );
                var comment = markup.comment( re.data.comment );
                var post_ID = re.data.comment.comment_post_ID;
                post_comment_list( post_ID ).prepend( comment );

                comments_meta_count( post_ID ).html( markup.get_comments_meta_count( get_comments_meta_count(post_ID) + 1 ) );
            }
            else {
                xapp.alert( 'Comment write failed', xapp.get_error_message(re.data) );
            }
            $submit.prop('disabled', false);
        },
        'error' : function () {
            $submit.prop('disabled', false);
            alert('error on comment write');
        }
    });


};
post_list.comment_cancel_form_submit = function () {
    var $cancel = $(this);
    var $form = $cancel.closest( 'form' ).parent();
    post_list.close_comment_write_form( $form );
};

post_list.close_comment_write_form = function ( $form ) {
    $form.find('textarea').val('');
    $form.removeClass('selected');
};


post_list.comment_edit_form_submit = function () {

};

post_list.comment_edit_form_cancel = function () {
    var $form = get_comment_edit_form( $(this) );
    get_comment( get_comment_ID( $form ) ).show();
    $form.remove();
};







post_list.comment_edit_button_clicked = function () {
    console.log('comemnt edit button clicked');
    var $any_comment_edit_form = el(comment_edit_form);
    if ( $any_comment_edit_form.length ) {
        xapp.alert('Cannot edit', 'You are on another comment editing form. Please submit or cancel the comment editing form before you are going to edit another.');
        return;
    }
    var $button = $(this);
    var $comment = $button.closest( '.comment' );
    //console.log($post);
    $comment
        .hide()
        .after( markup.comment_edit_form( $comment ) );
};


post_list.comment_delete_button_clicked = function () {

};

