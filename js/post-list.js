post_list = xapp.post_list = {};

$(function() {

    $('body').on('click', ".post-list-group-content .post form", function() {
        var $form = $(this);
        $form.addClass('selected');
    });




    $('body').on('click', '.show-more', function() {
        var $this = $(this);
        var $post = $this.parent();
        var $content = $post.find('.post-content');
        $content.css( {
            'overflow': 'visible',
            'max-height' : 'none'
        } );
    });
});


post_list.callback_add_show_more = function (data) {

    ///;
    $(".post-list-group[page='"+data.in['page']+"']").find('.post').each(function(index, element){
        //console.log(element);
        var $post = $(element);
        var $content = $post.find('.post-content');
        //console.log($content[0].scrollHeight);
        //console.log($content.innerHeight());
        /**
         * if the height of content is over-wrapped.
         */
        if ( $content[0].scrollHeight > $content.innerHeight()) {
            $content.css('background-color', '#efe9e9');
            $content.after("<div class='show-more'>Show More</div>");
        }
    });
    ///;
};
