if ( typeof xapp == 'undefined' ) var xapp = {};
xapp.layout = {};
var layout = xapp.layout;

layout.main = function() {
    return $(".page-content-main");
};


var el = element = xapp.element = {};


el.selector_post_write_form = function() {
    return '.post-write-form';
};

element.post_write_form = function() {
    return $( el.selector_post_write_form() );
};


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