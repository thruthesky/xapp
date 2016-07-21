
$(function(){
    var $body = $('body');
    $body.on('click', '.login-button', xapp.callback_login_button_clicked );
    $body.on('click', '.login-form .submit', xapp.callback_login_form_submitted);
});
xapp.callback_login_button_clicked = function () {
    var m = markup.get_login_form();
    layout.main().prepend( m );
};
xapp.callback_login_form_submitted = function () {
    var $form = $(this).closest( 'form' );
    var url = xapp.server_url + '?' + $form.serialize();
    console.log(url);
};