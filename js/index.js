

$(function(){
    var url = 'http://work.org/tmp/4-secs.php';
    console.log('going to load:  ' + url);
    var count = 1;
    setInterval(function(){
        //console.log(count++);
    }, 1000);

    //console.log( db.getCache( 'test4' ) );



    xapp.cache( {
        'url' : url,
        'id' : 'test4',
        'expire' : 60 * 60,
        'success' : function( re ) {
            console.log(re);
            $('#main').prepend( re );
        },
        'failure' : function( re ) { console.log('failure', re); }
    } );

});