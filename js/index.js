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




/**
 *      D E F A L U L T  Variables
 */

$(function(){

    xapp.server_url = "http://work.org/wordpress/";

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


    console.log('index.js $(function() { ... }); finished.')
});