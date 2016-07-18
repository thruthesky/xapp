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
    if ( this.isFront() ) xapp.callback_front_page();
    else if ( this.isPostList() ) {
        var query = xapp.post_list_query_args( 0 );
        xapp.wp_query( query );
    }
    else {
        alert("No route to go");
    }

};
xapp.init = function() {
    xapp.parse_query_string();
    xapp.bind_api();
};
$(function() {
    xapp.init();        // call xapp.init when DOM is ready.
});

xapp.isFront = function() {
    var action = xapp.in('action');
    return _.isEmpty( action );
};
xapp.isPostList = function() {
    return xapp.in('action') == 'post_list';
};
/**
 *
 * 게시판의 글을 서버로 부터 추출한다.
 *
 * - 이 함수는 정형화(활용도가 고정)되어져 있어서 따로 커스터마이징을 할 필요가 없다.
 *
 *
 * @param page - page no. what page of content ( post ) should be displayed?
 */
xapp.post_list_query_args = function ( page ) {
    var id = xapp.query + '_' + page;
    page = parseInt( page ) + 1;
    var query = {
        'id' : id,
        url: xapp.server_url + '?forum=api&' + xapp.query + '&page=' + page + '&posts_per_page=4',
        expire : 60,
        success : this.callback_endless_post_list,
        'failure' : function ( re ) {
            alert('ERROR on failre');
        }
    };
    return query;
};

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

