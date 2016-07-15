/**
 * @file index.js
 */

/**
 *      D E F A L U L T  Variables
 */

var url_wordpress= 'http://wordpress46b1.org/index.php';






/**
 *      START SCRIPT
 */
$(function(){

    /*
     xapp.wp_query({
     'slug' : 'its',
     'posts_per_page': 3
     });
     */

    xapp.wp_get_categories({
        'expire' : 86400 * 7,
        'success' : function( re ) {
            console.log(re);
        },
        'failure' : function( re ) {
            alert('ERROR on getting categories');
        }
    });


    console.log('index.js $(function() { ... }); finished.')
});