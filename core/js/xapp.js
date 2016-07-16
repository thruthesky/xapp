/**
 *
 * XAPP Mini Framework
 *
 *      This mini framework has only a few functions. DON'T DO TOO MUCH THINGS.
 *
 * @note  What it does
 *
 *  - Ajax Query to Wordpress through XForum API.
 *      => list, view, posting, editing, EndLess listing.
 *
 *
 *
 *
 *
 * @note  External Libraries
 *
 *      - jQuery
 *      - underscore
 *      - underscore.string
 *      - bootstrap v4
 *      - font-awesome
 *
 *
 *
 *
 * @file xapp.js
 *
 * @type {{}}
 */

var xapp = {};
var db = Lockr;
xapp.bootstrap = {};
xapp.bs = xapp.bootstrap;



xapp.start = function () {
    var action = xapp.in('action');
    if ( action == 'post_list' ) {
        var query = {
            url: xapp.server_url + '?forum=api&' + xapp.query,
            posts_per_page : 4,
            page : 1,
            expire : 0,
            success : this.callback_post_list,
            'failure' : function ( re ) {
                alert('ERROR on failre');
            }
        };
        xapp.wp_query( query );
    }
};
xapp.init = function() {
    xapp.parse_query_string();
    xapp.bind_api();
};
$(function() {
    xapp.init();        // call xapp.init when DOM is ready.
});


xapp.move = function( api ) {
    location.href = 'index.html?' + api;
};

/**
 *
 */
xapp.parse_query_string = function () {
    this.qv = {};
    this.query = '';
    var splits = location.href.split('?');
    if ( splits.length > 1 ) {
        this.query = splits[1];
        parse_str( this.query, this.qv);
    }
    //console.log(this.qv);
};
/**
 * Returns the $_GET variable.
 * @param name
 */
xapp.in = function( name ) {
    if (_.isEmpty( this.qv ) ) return null;
    if ( typeof this.qv[ name ] == 'undefined' ) return null;
    return this.qv[ name ];
};


xapp.process_api = function ( api_query ) {

    var qs = {};
    parse_str( api_query, qs );

    if ( qs.action == 'post_list' ) {
        xapp.move( api_query );
    }
    else if ( qs.action == 'post_view' ) {

    }
    else {
        xapp.move( api_query );
    }

};

xapp.bind_api = function () {

    $('body').on('click', '[api]', function(e) {
        e.preventDefault();
        var $this = $(this);


        xapp.process_api( $this.attr('api') );

    } );
};

xapp.get = function ( url, success, error ) {
    console.log('xapp.get() : ' + url);
    $.ajax( {
        url: url,
        async: true,
        success: success,
        error: error
    } );
};

