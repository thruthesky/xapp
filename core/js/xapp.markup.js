if ( typeof xapp == 'undefined' ) var xapp = {};
/**
 *
 * @file xapp.markup.js
 * @type {{}}
 */

var markup = xapp.markup = {};





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
 * @note post wrapper must be a tag for seo purpose.
 *
 * @param data
 */
xapp.convert_posts_into_list_group_custom_content = function ( data ) {
    var posts = data.posts;
    var page = get_page_no(data.in['page']);
    if ( _.isEmpty(posts) ) {
        xapp.endless_set_no_more_posts();
        return xapp.callback_endless_no_more_posts();
    }
    var slug = data.in['slug'];
    var m = '';
    m += '<div class="post-list-page" slug="'+slug+'" page="'+page+'">';

    // template
    m += markup.get_post_list_page_header(data);


    m += '  <div class="post-list-page-content">';

    for ( var i in posts ) {
        var post = posts[i];

        var url = post.guid;
        var item = '' +
            '<div class="post">';
        item += '       <a href="'+url+'" api="action=post_view" class="post-title">';
        item += '          <h4>' + post.post_title + '</h4>';
        item += '       </a>';
        item += '       <section class="post-content">' + post.post_content + '</section>';
        item += xapp.markup_comment_form();

        item += '</div>';

        m += item;
    }
    m += '  </div>';


    m += '</div>';
    return m;

};


xapp.markup_comment_form = function() {
    var m = '' +
        '<form>' +
        '' +
        '' +
        '   <table>' +
        '       <tr valign="top">' +
        '           <td>' +
        '' +
        '               <i class="fa fa-camera fa-2x"></i>' +
        '           </td>' +
        '           <td width="99%">' +
        '               <textarea></textarea>' +
        '           </td>' +
        '       </tr>' +
        '       <tr>' +
        '           <td></td>' +
        '           <td class="buttons">' +
        '               <input type="submit" value="Submit">' +
        '               <button type="button">Cancel</button>' +
        '           </td>' +
        '       </tr>' +
        '   </table>' +
        '' +
        '' +
        '</form>' +
        '';
    return m;
};


markup.get_post_list_page_header = function ( data ) {
    var category = data.category;
    var page = get_page_no(data.in['page']);
    var m = '';
    m += '  <div class="post-list-page-header">';
    m += '      <h4 class="list-group-item-heading">' + category['cat_name'] + '</h4>';
    m += '      <p class="list-group-item-text">' +
        '           <div class="meta">Page: '+page+', No. of Posts : '+ category['count'] +'</div>' +
        '           <div class="description">'+category['category_description']+'</div>' +
        '           <div class="buttons">' +
        '               <button class="post btn btn-secondary">POST</button>' +
        '               <button class="top btn btn-secondary">TOP</button>' +
        '           </div>' +
        '       </p>';
    m += '  </div>';
    return m;
};


markup.get_write_form = function ( $this ) {

    var $header = $this.closest( '.post-list-page-header' );
    var $page = $header.parent();
    var page_no = $page.attr('page');
    var slug = $page.attr('slug');

    var m = '' +
        '<div class="post-write-form" page-no="'+page_no+'">' +
        '   <form>' +
        '       <input type="hidden" name="do" value="post_edit_submit">' +
        '       <input type="hidden" name="response" value="ajax">' +
        '       <input type="hidden" name="slug" value="'+slug+'">' +
        '       <input type="hidden" name="session_id" value="">' +
        '       <input type="hidden" name="session_password" value="">' +
        '       <input type="text" name="title" value="" placeholder="Input title">' +
        '       <div>' +
        '           <textarea name="content"></textarea>' +
        '       </div>' +
        '       <button type="button" class="submit btn btn-secondary btn-sm">SUBMIT</button>' +
        '       <button type="button" class="cancel btn btn-secondary btn-sm">CANCEL</button>' +
        '   </form>' +
        '' +
        '' +
        '' +
        '';

    return m;
};