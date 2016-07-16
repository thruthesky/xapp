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
 *
 * @param data
 */
xapp.convert_posts_into_list_group_custom_content = function ( data ) {
    var category = data.category;
    var posts = data.posts;
    if ( _.isEmpty(posts) ) return xapp.endless_no_more_posts();
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
