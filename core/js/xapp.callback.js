/**
 *
 * @file xapp.callback.js
 * @desc This script holds default callback routines. You can overwrite this as your need.
 */


/**
 *
 * 게시판의 게시물이 로드된 경우 이 함수가 호출된다.
 *
 * - Endless 호출은 오직 게시물 뿐이다. 다른 어떤 정보도 endless 방식으로 데이터를 로드하지 않는다.
 * - Endless 로 데이터가 서버로 부터 전달되면, 이 함수가 호출되고 화면에 맨 아래에 추가하면 된다.
 *
 * @note This is a callback function. This callback is called when there is new post list data from server.
 *
 * @param re
 */
xapp.callback_endless_post_list = function( re ) { // Callback for display post data on device.
    console.log( re );
    var m = xapp.convert_posts_into_list_group_custom_content( re.data );
    layout.main().append( m );
    setTimeout(function() {
        xapp.callback_endless_finish_loading();
        post_list.callback_add_show_more(re.data);
    }, 20);
};


xapp.callback_endless_begin_loading = function() {
    layout.main().append('<i class="post-list-loader fa fa-spinner fa-pulse fa-3x fa-fw"></i>');
    xapp.endless_in_process_loading = true;
};

xapp.callback_endless_finish_loading = function() {
    layout.main().find('.post-list-loader').remove();
    xapp.endless_in_process_loading = false;
};

/**
 * (해당 게시판에서) Endless 로 데이터를 전송 받았는데, 게시물이 더 이상 존재 하지 않을 때 호출 된다.
 */
xapp.callback_endless_no_more_posts = function () {
    layout.main().append( "<h2>No more posts</h2>");
};

xapp.callback_endless_in_loading = function () {
    console.log("callback_endless_in_loading");
};
/**
 *
 * Must return the parameta of xapp.cache() to get data from server.
 *
 *
 *
 */
xapp.callback_endless_cache_args = function ( page ) {
    if ( this.isFront() ) return xapp.post_list_query_args_for_front( page );
    else if ( this.isPostList() ) return xapp.post_list_query_args( page );
    else return null;
};


/**
 *
 * 첫번째 페이지를 endless 방식으로 표시하고자 할 경우 이 함수를 사용 할 수 있다.
 *
 * - 이 함수가 null 을 리턴하면, xapp.endless.js 에서 서버로 request 를 하지 않는다.
 */
xapp.post_list_query_args_for_front = function ( page ) {

};

/**
 * 첫번째 페이지를 표시한다.
 *
 * - xapp.start() 에 의해서 첫번째 페이지로 인식되면 이 메소드가 호출된다.
 * - 첫번째 페이지 표시에 대한 모든 것을 출력 하면된다.
 * - 추가적으로 endless 에 대한 내용을 출력하고자 한다면, post_list_query_args_for_front() 를 참고한다.
 *
 * @note It displays front page.
 *
 */
xapp.callback_front_page = function ( ) {
    xapp.wp_get_categories({
        'expire' : 86400 * 7,
        'success' : function( re ) {
            // console.log(re);
            var m = xapp.bootstrap.list_group_linked_items( {
                'title' : 'Forum list',
                'lists' : xapp.convert_categories_into_list_group_item( re.data )
            } );
            // console.log(m);
            layout.main().prepend(m);
        },
        'failure' : function( re ) {
            alert('ERROR on getting categories');
        }
    });
};
