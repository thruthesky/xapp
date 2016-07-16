/**
 *
 *
 * This is not part of 'xapp'.
 *
 *
 * @file index.js
 *
 *
 *
 *
 */




function display_forum_list() {

    xapp.wp_get_categories({
        'expire' : 86400 * 7,
        'success' : function( re ) {
            // console.log(re);
            var m = xapp.bootstrap.list_group_linked_items( {
                'title' : 'Forum list',
                'lists' : xapp.convert_categories_into_list_group_item( re.data )
            } );
            // console.log(m);
            layout.main().prepend(m);
        },
        'failure' : function( re ) {
            alert('ERROR on getting categories');
        }
    });

}
/*
function display_action() {
    var query = {
        url: xapp.server_url + '?forum=api&' + xapp.query,
        posts_per_page : 4,
        page : 1,
        expire : 0,
        success : function( re ) {
            console.log( re );
            var m = xapp.convert_posts_into_list_group_custom_content( re.data );
            layout.main().prepend( m );
        },
        'failure' : function ( re ) {
            alert('ERROR on failre');
        }
    };
    xapp.wp_query( query );
}
*/
/**
 *      D E F A L U L T  Variables
 */
$(function(){

    xapp.server_url = "http://work.org/wordpress/";
    xapp.callback_post_list = function( re ) {
        console.log( re );
        var m = xapp.convert_posts_into_list_group_custom_content( re.data );
        layout.main().prepend( m );
    };
    xapp.start();


    var action = xapp.in('action');

    if ( ! action ) {
        display_forum_list();
        //display_action();
    }
    else {
        //display_forum_list();
    }


    console.log('index.js $(function() { ... }); finished.')
});