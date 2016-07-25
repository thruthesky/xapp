/**
 *
 * @file xapp.endless.js
 * @desc This scripts hold methods for endless related codes.
 *
 */

///
if ( typeof xapp == 'undefined' ) var xapp = {};

/**
 *
 * @note variables
 *
 * @type {number}
 */
xapp.endless_in_process_loading = false;                // if true, it is in loading from server. whether it is in loading.
xapp.endless_no_more_posts = false;                // if true, there is no more post from that forum.
xapp.endless_trigger_distance_from_bottom = 300;
xapp.endless_page = 0;
(function() {
    var $window = $( window );
    var $document = $( document );
    $document.scroll( function() {
        if ( xapp.endless_no_more_posts() ) {
            return;
        }
        if ( xapp.endless_in_loading() ) return xapp.callback_endless_in_loading();
        var top = $document.height() - $window.height() - xapp.endless_trigger_distance_from_bottom;
        if ($window.scrollTop() >= top) xapp.endless_post_load_next_page();
    });
}());


/**
 * Returns xapp.endless_in_process_loading
 *
 * @returns {number|boolean}
 */
xapp.endless_in_loading = function() {
    return xapp.endless_in_process_loading;
};

/**
 * Returns xapp.endless_no_more_posts;
 * @returns {boolean}
 */
xapp.endless_no_more_posts = function () {
    return xapp.endless_no_more_posts;
};
/**
 * Sets there is no more posts from server.
 * @returns {boolean}
 */
xapp.endless_set_no_more_posts = function() {
    return xapp.endless_no_more_posts = true;
};

xapp.endless_post_load_next_page = function() {

    xapp.endless_page ++;

    console.log("xapp.endless.js count:" + xapp.endless_page + ", : " + '');
    var o = xapp.callback_endless_cache_args( xapp.endless_page );


    if ( o ) {
        //console.log( o );

        /**
         *
         * Load more data.
         *
         *      - show loader icon
         *      - get data from server
         *      - display it.
         *      - hide loader icon.
         */

        xapp.callback_endless_begin_loading(); // until cache finishes.
        xapp.cache( o );


    }
    else {

    }
};
