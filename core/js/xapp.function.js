if ( typeof xapp == 'undefined' ) var xapp = {};
function get_page_no( no ) {
    if (_.isEmpty( no )) no = 1;
    return no;
}

function trim(text) {
    return s(text).trim().value();
}

