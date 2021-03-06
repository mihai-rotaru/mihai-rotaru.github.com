/* Author:
*/
$(function() {
    // adapted from: http://blog.rootsmith.ca/jquery/how-to-make-jquery-ui-tabs-linkable-or-bookmarkable/
    console.info("Executing...")
    var tabIndex = { 'home' : 0, 'projects' : 1, 'blog' : 2, 'contact' : 3 }
    var re = /#\w+$/;
    var match = re.exec( document.location.toString() );
    if( match != null ) var anchor = match[0].substr(1);
    for( key in tabIndex ) {
        if( anchor == key ) {
            selectedTab = tabIndex[key];
            break;
        }
	else selectedTab = 0;
    }

    function get_tabindex_str( tab_i ) {
        for( key in tabIndex ) {
            if( tabIndex[key] == tab_i ) {
                return key;
            }
        }
        return -1;
    }
        
    function get_fragment( url ) {
        url = url || location.href;
        return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
    };

    $("#tabs").delegate("ul > li > a", "click", function() {
        window.location.hash = $(this).attr("href");
        hash = window.location.hash;
        console.info( 'click on a: hash: ' + hash );
        return false;
    });

    var tabs = $("#tabs");
    tabs.tabs( { selected: selectedTab } );

    $(window).bind('hashchange', function(){
    
        var newHash = window.location.hash.substring(1);
        console.info('hashchange; newHash: ' + newHash );
        
        if (newHash) {
            selectedTab = tabIndex[ newHash ];
            console.info('selectedTab: ' + selectedTab );
            if( selectedTab != -1 ) {
                $("#tabs").tabs( { selected: selectedTab } );
            }
        };
        
    });
    
    $(window).trigger('hashchange');

    window.hashchange
});
