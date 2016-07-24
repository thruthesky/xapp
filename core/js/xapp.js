if ( typeof xapp == 'undefined' ) var xapp = {};
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
 *
 */


var db = Lockr;
xapp.bootstrap = {};
xapp.bs = xapp.bootstrap;


xapp.local_url = 'index.html?';
xapp.query = '';
xapp.qv = {};
//xapp.debug = true;          // true 이면 디버깅 모드를 실행한다.

xapp.option = {};
xapp.option.alert = {};
xapp.option.cache = {};
xapp.option.alert.after_post = true;        // if true, it shows alert box before refresh (after post). if not, just refresh. (글 등록 후 알림창을 표시하고 페이지 reload 할 지, 그냥 reload 할지 결정.)
xapp.option.alert.after_edit = true;
xapp.option.alert.after_comment = true;     //
xapp.option.cache.front_page_expire = 1200;
xapp.option.cache.post_list_expire = 1200;
xapp.option.cache.post_list = true;         // if true, it caches post-list page.




xapp.start = function () {
    if ( this.isFront() ) {
        xapp.callback_front_page();
    }
    else if ( this.isPostList() ) {
        var query = xapp.post_list_query_args( 0 );
        //xapp.wp_query( query );
        xapp.endless_post_load_next_page();
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

/**
 * Returns true if current page is 'front' page.
 *
 */
xapp.isFront = function() {
    var action = xapp.in('action');
    return _.isEmpty( action );
};

/**
 * Returns true if current page is 'post_list' page.
 * @returns {boolean}
 */
xapp.isPostList = function() {
    return xapp.in('action') == 'post_list';
};

xapp.move = function( api ) {
    location.href = xapp.local_url + api;
};
xapp.reload = xapp.refresh = function () {
    location.reload( true );
};


/**
 *
 * @note Current page url is always like "?action=post_list&slug=its".
 *
 *  ( 현재 접속 주소는 항상 "?action=post_list&slug=its" 와 같다. 왜냐하면 웹 페이지에서 링크가 그냥 이렇게 걸리기 때문이다. )
 *
 * @note Set this.query with current url and put query key/values into this.qv
 *
 *  ( 현재 접속 주소 전체를 this.query 에 집어 넣고, 그것을 파싱하여 키/값 형태로 된 것을 this.qv 에 집어 넣는다. )
 *
 *
 *
 *
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
    //console.log('xapp.get() : ' + url);
    $.ajax( {
        url: url,
        // async: true,
        cache: false,
        success: success,
        error: error
    } );
};


/**
 *
 *
 * @code
 *
 *      xapp.alert("POST Success", "You just have posted...", xapp.reload); // with a callback
 *
 *      xapp.alert("EDIT Success", "You just have edited a psot.");     // without callback
 *
 * @endcode
 *
 */
xapp.alert = function( title, content, callback ) {

    var m = '' +
        '<div class="xapp-alert modal fade" tabindex="-1" role="dialog" aria-labelledby="ModalLabeled" aria-hidden="true">' +
        '   <div class="modal-dialog modal-sm">' +
        '       <div class="modal-content">' +
        '           <div class="modal-header">' +
        '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '               <h4 class="modal-title" id="gridModalLabel">'+title+'</h4>' +
        '           </div>' +
        '           <div class="modal-body">' +
            content +
        '           </div>' +
        '           <div class="modal-footer">' +
        '               <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>' +
        '';
    $('body').append( m );
    $('.xapp-alert').modal('show');
    function handler_xapp_alert_close(e) {
        $('.xapp-alert').remove();
        if ( typeof callback == 'function' ) callback();
                //$('.xapp-alert').off('hidden.bs.modal', handler_xapp_alert_close);
        // console.log("un-bind for close() .... " + (new Date).toString() );
    }
    $('.xapp-alert').on('hidden.bs.modal', handler_xapp_alert_close);

};




xapp.get_error_message = function (data) {
    var code = data.code;
    var message = data.message;
    return "ERROR(" + code + ") " + message;
};

