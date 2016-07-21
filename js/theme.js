/**
 *
 *
 *
 * @file theme.js
 * @desc Edit this script for the needs of each site.
 * @note This is not part of 'xapp'.
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

    xapp.server_url = "http://wordpress46b1.org/";

    //xapp.server_url = "http://dev.withcenter.com/wordpress/";

    xapp.cacheOptions.expire = 1;

    xapp.start();

    console.log('index.js $(function() { ... }); finished.');




    /// TEST ...
    auto_show_write_forum();

});


function auto_show_write_forum() {
    setTimeout(function(){
        $('.post-list-page-header .post').click();
    }, 1000);
}
