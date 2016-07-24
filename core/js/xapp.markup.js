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
 * Returns HTML (markup) for post list page.
 *
 * @note post wrapper must be a tag for seo purpose.
 *
 * @param data
 */
markup.post_list_page = function ( data ) {
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
        //console.log(post);
        var url = post.guid;
        var item = '' +
            '<div class="post" post-id="'+post.ID+'">';
        item += '       <a href="'+url+'" api="action=post_view" class="post-title">';
        item += '          ' + post.post_title + '';
        item += '       </a>';
        item += '       <span class="meta">' +
            '               <span class="author-caption">author:</span><span class="author">'+post.author_name+'</span>' +
            '               <span class="buttons">' +

            '                   <span class="post-edit-button">Edit</span>' +
            '                   <span class="post-delete-button">Delete</span>' +
            '                   <span class="post-vote-button">Vote</span>' +
            '                   <span class="post-report-button">Report</span>' +
            '                   <span class="post-copy-button">Copy</span>' +
            '                   <span class="post-move-button">Move</span>' +
            '                   <span class="post-blind-button">Blind</span>' +
            '                   <span class="post-block-button">Block</span>' +

            '               </span>' +
            '           </span>';
        item += '       <section class="post-content">' + post.post_content + '</section>';
        item += markup.comment_write_form();

        item += '</div>';

        m += item;
    }
    m += '  </div>';


    m += '</div>';
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
        '               <button class="'+cl.post_write_button()+' btn btn-secondary">POST</button>' +
        '               <button class="top btn btn-secondary">TOP</button>' +
        '           </div>' +
        '       </p>';
    m += '  </div>';
    return m;
};


markup.post_write_form = function ( $this ) {
    var $header = $this.closest( '.post-list-page-header' );
    var $page = $header.parent();
    var page_no = $page.attr('page');
    var slug = $page.attr('slug');
    var m = '' +
        '<div class="'+cl.post_write_form()+'" page-no="'+page_no+'">' +
        '   <form>' +
        '       <input type="hidden" name="do" value="post_edit_submit">' +
        '       <input type="hidden" name="response" value="ajax">' +
        '       <input type="hidden" name="slug" value="'+slug+'">' +
        '       <input type="hidden" name="session_id" value="'+xapp.session_id+'">' +
        '       <input type="text" name="title" value="" placeholder="Input title">' +
        '       <div>' +
        '           <textarea name="content"></textarea>' +
        '       </div>' +
        '       <button type="button" class="submit btn btn-secondary btn-sm">SUBMIT</button>' +
        '       <button type="button" class="cancel btn btn-secondary btn-sm">CANCEL</button>' +
        '   </form>' +
        '</div>';
    return m;
};

markup.post_edit_form = function ( $post ) {

    var m = '' +
        '<div class="'+cl.post_edit_form()+'">' +
        '   <form>' +
        '       <input type="hidden" name="do" value="post_edit_submit">' +
        '       <input type="hidden" name="response" value="ajax">' +
        '       <input type="hidden" name="post_ID" value="">' +
        '       <input type="hidden" name="session_id" value="'+xapp.session_id+'">' +
        '       <input type="text" name="title" value="" placeholder="Input title">' +
        '       <div>' +
        '           <textarea name="content"></textarea>' +
        '       </div>' +
        '       <button type="button" class="submit btn btn-secondary btn-sm">SUBMIT</button>' +
        '       <button type="button" class="cancel btn btn-secondary btn-sm">CANCEL</button>' +
        '   </form>' +
        '</div>';

    return m;

};




markup.comment_write_form = function() {
    var m = '<div class="'+cl.comment_write_form()+'">' +
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
        '</div>';
    return m;
};




markup.user_login_form = function( ) {
    var m = '' +
    '<div class="user-login-form">' +
    '   <form>' +
    '       <input type="hidden" name="forum" value="user_login_check">' +
        '       <input type="text" name="user_login" value="" placeholder="Input User ID">' +
        '       <input type="password" name="user_pass" value="" placeholder="Input Password">' +

        '       <div class="user-login-form-message"></div>' +

        '   <div class="button">' +
    '          <button type="button" class="submit btn btn-secondary btn-sm">SUBMIT</button>' +
    '          <button type="button" class="cancel btn btn-secondary btn-sm">CANCEL</button>' +
        '   </div>' +
    '   </form>' +
    '</div>';

    return m;
};



markup.user_register_form = function( ) {
    var m = '' +
        '<div class="user-register-form">' +
        '   <form>' +
        '       <input type="hidden" name="forum" value="user_register">' +
        '       <input type="text" name="user_login" value="" placeholder="Input User Login ID">' +
        '       <input type="password" name="user_pass" value="" placeholder="Input Password">' +
        '       <input type="text" name="user_email" value="" placeholder="Input Email">' +
        '       <input type="date" name="birthday" value="">' +
        '       <input type="text" name="gender" value="">' +
        '       <div class="user-register-form-message"></div>' +
        '       <div class="buttons">' +
        '          <button type="button" class="submit btn btn-secondary btn-sm">REGISTER</button>' +
        '          <button type="button" class="cancel btn btn-secondary btn-sm">CANCEL</button>' +
        '       </div>' +
        '   </form>' +
        '</div>';

    return m;
};




var get_loader = markup.get_loader = function () {
    return '' +
        '<div>' +
        '   <i class="fa fa-spin fa-spinner"></i>' +
        '   Loading ...' +
        '</div>' +
        '';
};




markup.user_account_form = function() {
    return '' +
        '<div class="user-account-form">' +
        '   <div class="user-logout-button btn btn-primary">Logout</div>' +
        '' +
        '' +
        '' +
        '' +
        '</div>';
};


