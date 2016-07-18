/**
 *
 * @file xapp.markup.js
 * @type {{}}
 */




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
    var category = data.category;
    var posts = data.posts;
    var page = data.in['page'];
    if (_.isEmpty( page )) page = 1;
    if ( _.isEmpty(posts) ) {
        xapp.endless_set_no_more_posts();
        return xapp.callback_endless_no_more_posts();
    }
    var m = '';
    m += '<div class="post-list-group" page="'+page+'">';

    m += '  <div class="post-list-group-meta">';
    m += '      <h4 class="list-group-item-heading">' + category['cat_name'] + '</h4>';
    m += '      <p class="list-group-item-text">' +
        '           <div class="meta">Page: '+page+', No. of Posts : '+ category['count'] +'</div>' +
        '           <div class="description">'+category['category_description']+'</div>' +
        '           <div class="buttons">[TOP] [WRITE]</div>' +
        '       </p>';
    m += '  </div>';

    m += '  <div class="post-list-group-content">';

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
