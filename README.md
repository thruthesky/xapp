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
* see - 


# HOW TO

* access the index.html with "file://" scheme like "file:///C:/work/www/wordpress46b1/wp-content/plugins/xforum/tmp/xapp/index.html"
 

# Coding Guide


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


