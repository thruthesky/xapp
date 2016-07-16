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

    console.log('xapp.get() : ' + url);
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
    //console.log( 'xapp.doCache() : Going to CACHE for ' + o.id + ' URL: ' + o.url  );
    //console.log( o );
    console.log( 'xapp.doCache() : ', o);
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
 * @attention 2016-07-15, 'expire' is set to 0.
 *
 *
 */
xapp.cache = function ( o ) {

    var defaults = {
        'expire': 0,
        'success' : function() {},
        'failure' : function() {}
    };


    o  = $.extend( defaults, o );

    if ( typeof o.id == 'undefined' || o.id == '' ) {
        this.get( o.url, o.success, o.failure );
    }
    else {
        if ( o.expire == 0 ) {
            xapp.doCache( o );
        }
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
        url : this.server_url + '?forum=api&action=get_categories',
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
    var defaults = {
        url : this.server_url,
        forum : 'api'
    };
    o = $.extend( defaults, o );
    //console.log(o);
    xapp.cache( o );
};



xapp.bootstrap = {};
xapp.bs = xapp.bootstrap;
/**
 *
 * Returns 'Bootstrap' list group markup.
 *
 * @use when you want to display list-group data.
 * @param data - boostrap list group data.
 *      - data.title is the title of the list-group
 *      - data.lists is the list of the list-group.
 *          Each of lists must have text and href.
 */
xapp.bs.list_group_linked_items = function ( data ) {

//    console.log( data );

    var m = '' +
        '<div class="list-group">' +
        '   <a class="list-group-item active" href="javascript:;">' + data.title + '</a>' +
        '';

    if ( typeof data.lists != 'undefined' && data.lists.length ) {
        for ( var i in data.lists ) {
            var item = data.lists[i];
            m += '<a class="list-group-item" api="'+item.api+'" href="'+item.href+'">'+item.text+'</a>';
        }
    }

    m += '</div>';

    return m;
};

/**
 *
 * Gets categories data and convert it into 'list-group-item'.
 *
 * @use when you want to display xforum into a list group.
 *
 * @param data
 * @returns {Array}
 */
xapp.convert_categories_into_list_group_item = function ( data ) {
    var lists = [];

    for ( var i in data ) {
        var item = {};
        item.text = data[i].cat_name;
        item.href = this.server_url + '?forum=list&slug=' + data[i].slug;
        item.api = "action=post_list&slug=" + data[i].slug;
        lists.push( item );
    }

    return lists;
};


/**
 *
 *
 * Returns bootstrap list-group markup.
 *
 *
 * @param data
 */
xapp.convert_posts_into_list_group_custom_content = function ( data ) {
    var category = data.category;
    var posts = data.posts;
    var m = '';
    m += '<div class="list-group">';
    m += '<a href="#" class="list-group-item active">';
    m += '  <h4 class="list-group-item-heading">' + category['cat_name'] + '</h4>';
    m += '  <p class="list-group-item-text">' +
            '<div class="posts">'+ category['count'] +'</div>' +
            '<div class="description">'+category['category_description']+'</div>' +
            '</p>';
    m += '</a>';
    for ( var i in posts ) {
        var post = posts[i];
        var item = '';
        var url = post.guid;
        item += '<a href="'+url+'" api="action=post_view" class="list-group-item">';
        item += '   <h4 class="list-group-item-heading">' + post.post_title + '</h4>';
        item += '   <p class="list-group-item-text">' + post.post_content + '</p>';
        item += '</a>';
        m += item;
    }
    m += '</div>';
    return m;


};
