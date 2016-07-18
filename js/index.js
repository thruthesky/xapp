/**
 *
 *
 * This is not part of 'xapp'.
 *
 *
 * @file index.js
 *
 *
 *
 *
 */






/*
function display_action() {
    var query = {
        url: xapp.server_url + '?forum=api&' + xapp.query,
        posts_per_page : 4,
        page : 1,
        expire : 0,
        success : function( re ) {
            console.log( re );
            var m = xapp.convert_posts_into_list_group_custom_content( re.data );
            layout.main().prepend( m );
        },
        'failure' : function ( re ) {
            alert('ERROR on failre');
        }
    };
    xapp.wp_query( query );
}
*/
/**
 *      D E F A L U L T  Variables
 */
$(function(){

    xapp.server_url = "http://work.org/wordpress/";
    //xapp.server_url = "http://dev.withcenter.com/wordpress/";

    xapp.server_url = "http://wordpress46b1.org/";


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
    xapp.callback_post_list = function( re ) { // Callback for display post data on device.
        console.log( re );
        var m = xapp.convert_posts_into_list_group_custom_content( re.data );
        layout.main().append( m );
    };
    /**
     * (해당 게시판에서) Endless 로 데이터를 전송 받았는데, 게시물이 더 이상 존재 하지 않을 때 호출 된다.
     */
    xapp.endless_no_more_posts = function () {
        layout.main().append( "<h2>No more posts</h2>");
    };
    /**
     * No more data left on server.
     *      - display no more data on bottom.
     */
    xapp.callback_endless_no_more_content = function () {

    };
    xapp.callback_endless_in_loading = function () {

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
    xapp.start();



    console.log('index.js $(function() { ... }); finished.')
});