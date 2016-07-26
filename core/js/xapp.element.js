if ( typeof xapp == 'undefined' ) var xapp = {};
xapp.layout = {};
var layout = xapp.layout;

layout.main = function() {
    return $(".page-content-main");
};


var sl = sel = function ( cls ) {
    return '.' + cls;
};
var el = ele = function ( cls ) {
    return $('.' + cls);
};


var post_write_form = 'post-write-form';
var post_write_button = 'post-write-button';
var post_edit_form = 'post-edit-form';
var post_edit_button = 'post-edit-button';
var post_delete_button = 'post-delete-button';
var comment_write_form = 'comment-write-form';

var comment_write_button = 'comment-write-button';
var comment_cancel_button = 'comment-cancel-button';


comment_edit_form = 'comment-edit-form';

comment_edit_button = 'comment-edit-button';
comment_delete_button = 'comment-delete-button';
comment_vote_button = 'comment-vote-button';
comment_report_button = 'comment-report-button';
comment_copy_button = 'comment-copy-button';
comment_move_button = 'comment-move-button';
comment_blind_button = 'comment-blind-button';
comment_block_button = 'comment-block-button';






var register_form_message = function() {
    return $( '.user-register-form-message' );
};


var register_form = function() {
    return $('.user-register-form');
};



var login_form_message = function() {
    return $( '.user-login-form-message' );
};


var user_login_form = function () {
    return $('.user-login-form');
};


/**
 * Returns jQuery object of 'comment count'. It is the '.count' node.
 * @param post_ID
 * @returns {*|{}}
 */
var comments_meta_count = function( post_ID ) {
    return post( post_ID ).find('.comments .meta .count');
};

/**
 * Returns the no of count.
 *
 * @param post_ID
 * @returns int
 */
var get_comments_meta_count = function ( post_ID ) {
    var m = comments_meta_count( post_ID );
    var $m = $( m );
    if ( $m.find('.no-comment').length ) {
        return 0;
    }
    else {
        return parseInt( $m.find('.no').text() );
    }
};





