/**
 *
 * This is not part of 'xapp'.
 *
 *
 * @file index.js
 */

var url_wordpress;


$(function(){

    xapp.server_url = "http://work.org/wordpress/index.php";

    $.get("http://dev.withcenter.com/wordpress/?forum=api&action=get_categories", function(re){
console.log(re);
    });

});