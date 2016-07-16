xapp.endless_trigger_distance_from_bottom = 300;
xapp.endless_no_more_content = false;
xapp.endless_in_loading = false;
xapp.endless_page = 0;
(function() {
    var $window = $( window );
    var $document = $( document );
    $document.scroll( function() {
        if ( xapp.endless_no_more_content ) xapp.callback_endless_no_more_content();
        if ( xapp.endless_in_loading ) xapp.callback_endless_in_loading();
        var top = $document.height() - $window.height() - xapp.endless_trigger_distance_from_bottom;
        if ($window.scrollTop() >= top) {

            xapp.endless_page ++;

            console.log("xapp.endless.js count:" + xapp.endless_page + ", : " + '');
            xapp.endless_in_loading = true;
            var o = xapp.callback_endless_cache_args( xapp.endless_page );

            console.log( o );

            /**
             *
             * Load more data.
             *
             *      - show loader icon
             *      - get data from server
             *      - display it.
             *      - hide loader icon.
             */
            xapp.cache( o );
        }
    });
}());
