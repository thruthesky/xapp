if ( typeof xapp == 'undefined' ) var xapp = {};
var post_list = xapp.post_list = {};

$(function() {

    var $body = $('body');

    $body.on('click', ".post-edit-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-delete-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-vote-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-report-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-copy-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-move-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-blind-button", post_list.post_edit_button_clicked);
    $body.on('click', ".post-block-button", post_list.post_edit_button_clicked);



    $body.on('click', ".post-list-page-content .post form", function() {
        var $form = $(this);
        $form.addClass('selected');
    });

    $body.on('click', '.show-more', post_list.show_more_clicked);

    $body.on('click', '.post-list-page-header button.post', xapp.post_button_clicked);

    $body.on('click', el.selector_post_write_form() + ' .cancel', function() {
        el.post_write_form().remove();
    });

    $body.on('click', el.selector_post_write_form() + ' .submit', function() {
        var $this = $(this);
        $this.prop('disabled', true);
        var $form = $this.closest('form');
        var url = xapp.server_url + '?' + $form.serialize();
        // console.log(url);
        $.post({
            'url' : url,
            'success' : function(re) {
                // console.log(re);
                if ( xapp.option.alert.after_post ) xapp.alert("POST Success", "You just have posted...", xapp.reload);
                else xapp.reload();
            },
            'error' : function () {
                $this.prop('disabled', false);
                alert('error on post write form');
            }
        })
    });



});

post_list.show_more_clicked = function() {
    var $this = $(this);
    var $post = $this.parent();
    var $content = $post.find('.post-content');
    $content.css( {
        'overflow': 'visible',
        'max-height' : 'none'
    } );
};

post_list.post_edit_button_clicked = function() {
    console.log('post edit button clicked');
};
xapp.post_button_clicked =  function() {
    if ( element.post_write_form().length ) {
        xapp.alert('POST Writing', 'Post write form is already opened. You must close it first before you post another.');
        return;
    }
    var $this = $(this);
    var $header = $this.closest( '.post-list-page-header' );
    $header.after( markup.get_write_form( $this ) );
};



xapp.callback_post_add_show_more = function (data) {

    ///;
    $(".post-list-page[page='"+data.in['page']+"']").find('.post-list-page-content').find('.post').each(function(index, element){
        //console.log(index);
        //console.log(element);

        var $post = $(element);
        var $content = $post.find('.post-content');

        console.log($content);


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
