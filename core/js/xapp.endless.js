if ( typeof xapp == 'undefined' ) var xapp = {};
/**
 * 
 * @type {number}
 */
xapp.endless_trigger_distance_from_bottom = 300;
xapp.endless_page = 0;
xapp.endless_in_loading = function() {
    if ( typeof xapp.endless_in_process_loading == 'undefined' ) {
        xapp.endless_in_process_loading = false;
        return false;
    }
    else return xapp.endless_in_process_loading;
};

xapp.endless_no_more_posts = function () {
    if ( typeof xapp.endless_flag_no_more_posts == 'undefined' ) {
        xapp.endless_flag_no_more_posts = false;
        return false;
    }
    else return xapp.endless_flag_no_more_posts;
};
xapp.endless_set_no_more_posts = function() {
    return xapp.endless_flag_no_more_posts = true;
};

(function() {
    var $window = $( window );
    var $document = $( document );
    $document.scroll( function() {
        if ( xapp.endless_no_more_posts() ) {
            return;
        }
        if ( xapp.endless_in_loading() ) return xapp.callback_endless_in_loading();
        var top = $document.height() - $window.height() - xapp.endless_trigger_distance_from_bottom;
        if ($window.scrollTop() >= top) {

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
        }
    });
}());
