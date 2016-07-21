# XAPP

A framework which has some fundamental functions to serve for app(web-app) with the backend of xforum. 




# IMPORTANT THING TO KNOW / TO CONSIDER

* It only works with xforum.

* see "### ONE PAGE APP" in xforum README.md

* Try to put 'a' tag as much possible. Even though search bots cannot understand javascript and they are not able to load more on endless page, it is worth to give a link.



# ITS

* see 'housemaid' its on http://dev.withcenter.com



# TODO

* see - https://docs.google.com/document/d/1xObimH0kQsx1ixUGRT7HTVKIL27l0bEjIKpNa16_mFc/edit
* xapp.markup_xxxx 을 markup = xapp.markup 으로 하고, 함수를 분리한다.
* Facebook Login API is for web for now. It uses cookie. it wouldn't work on app since it is web app and using cookie.
    * you need to get it for app version.
    


# INSTALLATION

* Add cors for 'font-awesome font' in nginx.conf ( nginx 에 아래를 추가해서 cors 를 모두 무시하도록 한다. )


    	location / {
    		add_header 'Access-Control-Allow-Origin' '*';
    		add_header 'Access-Control-Allow-Credentials' 'true';
    		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    		add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
    	}


* Check if css.php and js.php works with gzip or deflate.




# HOW TO

* access the index.html with "file://" scheme like "file:///C:/work/www/wordpress46b1/wp-content/plugins/xforum/tmp/xapp/index.html"
 

# Coding Guide

## CSS & Javascript loading

* xapp loads CSS & JS thru PHP and gets the benefits of mixing CSS & JS & PHP. ( php 로 CSS 와 JS 를 로딩해서 compile 이나 304 not modified 등에 활용한다. )

    * the purpose of using this is to manage css & js files easy to use.


### How to use it.

* try css.php and js.php in web browser with the options.
* when "?debug=true", it does not do '304 test'. ( debug=true 이면, "304 not modified" 를 사용하지 않는다. 즉, 수정하는 즉시 바로 웹브라우저에 반영된다.)
* when "?compile=true", it compiles all the (css/js) files into one. ( compile=true 이면, 하나의 파일로 묶어서 리턴한다. 이 값을 지정하지 않으면 각각의 자바스크립트가 로드된다.)
* when "?version=xxxxxx", it delivers the version tag to its (css/js files). By using tag version, it will update the browser cache and server cache.
    * try something like "http://work.org/xapp/core/js.php?version=2016072102&debug=true&compile=true" and change option values and see what is happening.

* IMPORTANT : One thing you have to remember is that, when you don't compile all css into one file, it is JAVASCRIPT which will load all the css files using add_css() function.
    * So, USE when '<link ...>' WHEN 'compile=true'
    * USE '<script src="...."></script>' tag WHEN 'compile' is not 'true' !!

* IMPORTANT : Since javascript css/js loading needs 'body' tag loaded first, IF you are going to load css/js with add_css()/add_javascript() function, you must put it inside 'body' tags.

    * which means, css.php with 'compile=true' can be put inside '<head>' tag.
    * css.php without 'compile=true' must be put inside '<body>' since it uses 'add_css()'.
    * 'js.php' should be put at the bottom of '<body>' tag. ( right before '</body>' )
    

i.e.) for development mode, <script src="http://work.org/xapp/core/css.php?version=201607215&debug=true"></script>
i.e.) for production mode, <link rel="stylesheet" href="http://work.org/xapp/core/css.php?version=201607210001&debug=true&compile=true" />

        


* NOTE: For development, the best use is "?version=xxx&debug=true&compile=false", For production "?version=xxx&compile=true".

* WARNING : Javascript lading with 'compile=false' ( or without compile=true ) is not working at the time.

    * There is dependency problem. it looks like all javascript files are really loaded in async.
    
        * one solution may be compile all xapp  js files into one.

    * Use individual js link for development.
    
        * Use 'compile=true' for production mode.
        
    



## CALLBACKS AND Overriding


* By using callbacks, you can separate and capsulise code blocks.

    * For instance, you can put all the layout works in layout.js using callbacks.
    

* You can also override the default callbacks.

    * theme.js is the best place you can override the defaults( functions, variables, etc )


## Overriding

* You can overrides not only callbacks but also all the classes and functions.

    * try to override xapp.get_post_list_header() on theme.js
    


## Template & Layout

* There is only one (1) HTML file which is 'index.html'

* There is no ajax content load which MEANS 'view page' of a post or content MUST BE redirected to (or reload) index.html

    with different query vars.
    
    * see


* The PROTOCOL is exactly the same as "## PROTOCOLS" in "xforum README.md"

    Just redirect to (or reload) index.html with the PROTOCOL



## Cache

If you have no 'id' in parameter, then it is just the same as xapp.get()

    xapp.cache( { 'url' : '...' } );

It just does the same as $.get()




# Cycle

xapp.start() ==> if is front page()
 
    yes ==>
    
    no ==> xapp.wp_query() ==> xapp.cache() ==> 
    
    