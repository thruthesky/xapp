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


/**
 *
 * Saves cache data and stamp with the input 'id'.
 *
 *
 * @param id
 * @param data
 * @code
 *      db.setCache( o.id, re );
 * @endcode
 */
db.setCache = function (id, data) {

    db.set( id, data );
    var stamp = Math.floor(Date.now() / 1000);
    db.set( id + '_stamp', stamp );

};


/**
 *
 *
 * Returns the cache data.
 *
 * @note it returns the cached stamp & data of the 'id'.
 *
 * @param id
 * @returns {{stamp, data}}
 *
 * @code
 *      console.log( db.getCache( 'test4' ) );
 * @endcode
 *
 */
db.getCache = function ( id ) {
    var data = db.get( id );
    var stamp = db.get( id + '_stamp' );
    return {
        stamp: stamp,
        data: data
    };
};


/**
 *
 * @param id
 * @param seconds
 * @returns {boolean}
 *
 *      - returns false when there is no id + '_stamp' key exists. ( which means the data was never saved ).
 */
db.expired = function( id, seconds ) {
    var old_stamp = db.get( id + '_stamp', 0 );
    var new_stamp = Math.floor(Date.now() / 1000);
    old_stamp = parseInt( old_stamp ) + seconds;



    if ( isNaN(old_stamp) || old_stamp < new_stamp ) {
        console.log( id + ' has expired' );
        return true;
    }
    else {
        // console.log( id + ' has cached until: ' + new Date( old_stamp * 1000 ).toString());
        return false;
    }
};


xapp.get = function ( url, success, error ) {

    $.ajax( {
        url: url,
        async: true,
        success: success,
        error: error
    } );

    /*
    var xhr = $.get( url );


    //noinspection JSUnresolvedFunction
    xhr
        .done( function( re ) {
            //console.log('get done');
            success( re );
        })
        .fail ( function( re ) {
            //console.log('get fail');
            failure( re );
        })
        .always( function() {
            //console.log('get always');
        });
        */
};


xapp.doCache = function (o) {

    console.log( 'going to CACHE for ' + o.id + ' URL: ' + o.url  );
    console.log( o );
    this.get( o.url, function(re) {
        db.set ( o.id, re );
        db.setCache( o.id, re );
        o.success( re );
    }, o.failure );
};

/**
 * IF id is NOT given,
 *
 *      It is the same as xapp.get() without id.
 *
 *      - it does not use cache. ( because there is no id. how can it do cache without id )
 *
 *      - get the data from server and call success callback.
 *
 *      - it does not save the data into db. ( because there is no id, how can it save data ).
 *
 *
 * if id is GIVEN
 *
 *      - if expires == 0, then
 *
 *          - it does not use cache. ( but save the result data into db. No need to delete the cache. )
 *
 *          - just get data from server
 *
 *              - save the data.
 *
 *              - and call success callback.
 *
 *      - if expires > 0, then
 *
 *          - Cache Expired ??
 *
 *              - then, it gets data from server and save it. ( it does not fire success callback again. No need to delete the cache. )
 *
 *              - else, just return ( don't do anything else )
 *
 *
 * @param o
 *
 *
 * @code cache without id
 *
    xapp.cache( {
        'url' : url,
        'success' : function( re ) { console.log('success', re); },
        'failure' : function( re ) { console.log('failure', re); }
    } );
 *
 * @endcode
 *
 *
 *
 * @code example 'caching with default expire seconds'
 *
 xapp.cache( {
        'url' : url,
        'id' : 'test4', // <<===================
        'success' : function( re ) {
            console.log(re);
            $('#main').prepend( re );
        },
        'failure' : function( re ) { console.log('failure', re); }
    } );
 *
 * @endcode
 *
 * @code example of '1 hour caching'.
    xapp.cache( {
        'url' : url,
        'id' : 'test4', // <<==========================
        'expire' : 60 * 60, // <<==========================
        'success' : function( re ) {
            console.log(re);
            $('#main').prepend( re );
        },
        'failure' : function( re ) { console.log('failure', re); }
    } );

 * @endcode
 *
 *
 */
xapp.cache = function ( o ) {

    var defaults = {
        'expire': 600,
        'success' : function() {},
        'failure' : function() {}
    };


    if ( typeof o.id == 'undefined' || o.id == '' ) {
        this.get( o.url, o.success, o.failure );
    }
    else {
        if ( o.expire == 0 ) xapp.doCache( o );
        else {

            // cache expired or not?
            if ( db.expired( o.id, o.expire ) ) {
                xapp.doCache( o );
            }
            else o.success ( db.get( o.id ) );
        }
    }
};


/**
 *
 * @param o
 *
 * @code  Example of getting
 *
 xapp.wp_get_categories({
        'expire' : 86400 * 7,
        'success' : function( re ) {
            console.log(re);
        },
        'failure' : function( re ) {
            alert('ERROR on getting categories');
        }
    });
 *
 * @endcode
 */
xapp.wp_get_categories = function ( o ) {
    var defaults = {
        id : 'wp_get_category',
        url : url_wordpress + '?forum=api&action=get_categories',
        expire : 86400 // cache for a day.
    };
    o  = $.extend( defaults, o );


    xapp.cache( o );
};

/**
 * This method does
 *      1. WP_Query to the server
 *      2. Gets all result of data ( post, comments, meta information, author information, and every ting that related with the post )
 *      3. Pass the data to success callback.
 * @param o
 */
xapp.wp_query = function (o) {

};

