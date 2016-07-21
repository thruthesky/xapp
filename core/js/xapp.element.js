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