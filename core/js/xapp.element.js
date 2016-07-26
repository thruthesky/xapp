if ( typeof xapp == 'undefined' ) var xapp = {};
xapp.layout = {};
var layout = xapp.layout;

layout.main = function() {
    return $(".page-content-main");
};


var cl = xapp.classes = {};                 // class name only
var sl = selector = xapp.selector = {};     // selector only.
var el = element = xapp.element = {};       // select element.





cl.post_write_form = function() { return 'post-write-form'; };
sl.post_write_form = function() { return '.' + cl.post_write_form(); };
el.post_write_form = function() { return $( sl.post_write_form() ); };


cl.post_write_button = function() { return 'post-write-button'; };
sl.post_write_button = function () { return '.' + cl.post_write_button(); };
el.post_write_button = function () { return $( sl.post_write_button() ); };



cl.post_edit_form = function() { return 'post-edit-form'; };
sl.post_edit_form = function() { return '.' + cl.post_edit_form(); };
el.post_edit_form = function() { return $( sl.post_edit_form() ); };


cl.post_edit_button = function() { return 'post-edit-button'; };
sl.post_edit_button = function () { return '.' + cl.post_edit_button(); };
el.post_edit_button = function () { return $( sl.post_edit_button() ); };


cl.comment_write_form = function() { return 'comment-write-form'; };
sl.comment_write_form = function () { return '.' + cl.comment_write_form(); };
el.comment_write_form = function () { return $( sl.comment_write_form() ); };




cl.post_delete_button = function() { return 'post-delete-button'; };
sl.post_delete_button = function () { return '.' + cl.post_delete_button(); };
el.post_delete_button = function () { return $( sl.post_delete_button() ); };



var register_form_message = el.register_form_display = function() {
    return $( '.user-register-form-message' );
};


var register_form = el.user_register_form = el.register_form = function() {
    return $('.user-register-form');
};



var login_form_message = el.login_form_display = function() {
    return $( '.user-login-form-message' );
};


el.user_login_form = function () {
    return $('.user-login-form');
};