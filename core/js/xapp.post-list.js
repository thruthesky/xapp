if ( typeof xapp == 'undefined' ) var xapp = {};
post_list = xapp.post_list = {};

$(function() {

    var $body = $('body');

    $body.on('click', ".post-list-page-content .post form", function() {
        var $form = $(this);
        $form.addClass('selected');
    });

    $body.on('click', '.show-more', function() {
        var $this = $(this);
        var $post = $this.parent();
        var $content = $post.find('.post-content');
        $content.css( {
            'overflow': 'visible',
            'max-height' : 'none'
        } );
    });

    $body.on('click', '.post-list-page-header button.post', function() {
        if ( element.post_write_form().length ) {
            xapp.alert('POST Writing', 'Post write form is already opened. You must close it first before you post another.');
            return;
        }
        var $this = $(this);
        var $header = $this.closest( '.post-list-page-header' );
        $header.after( markup.get_write_form( $this ) );
    });
    $body.on('click', el.selector_post_write_form() + ' .cancel', function() {
        el.post_write_form().remove();
    });

    $body.on('click', el.selector_post_write_form() + ' .submit', function() {
        var $this = $(this);
        $this.prop('disabled', true);
        var $form = $this.closest('form');
        var url = xapp.server_url + '?' + $form.serialize();
        console.log(url);
        $.post({
            'url' : url,
            'success' : function(re) {
                console.log(re);
                xapp.alert("POST Success", "You just have posted...", xapp.reload);
            },
            'error' : function () {
                $this.prop('disabled', false);
                alert('error on post write form');
            }
        })
    });



});


post_list.callback_add_show_more = function (data) {

    ///;
    $(".post-list-page[page='"+data.in['page']+"']").find('.post-list-page-content').find('.post').each(function(index, element){
        //console.log(index);
        //console.log(element);
        var $post = $(element);
        var $content = $post.find('.post-content');
        //console.log($content[0].scrollHeight);
        //console.log($content.innerHeight());
        /**
         * if the height of content is over-wrapped.
         */
        /**
         * @note innerHeight() 에 +1 을 해야지, 더 잘되는 것 같다.
         *
         */
        if ( $content[0].scrollHeight > $content.innerHeight() + 1) {
            $content.css('background-color', '#efe9e9');
            $content.after("<div class='show-more'>show more ..." +
                "scrollHeight:" + $content[0].scrollHeight +
                "innerHeight:" + $content.innerHeight() +
                "</div>");
        }
    });
    ///;
};
