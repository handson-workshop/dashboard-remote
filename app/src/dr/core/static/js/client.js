(function (window) {
    "use strict";

    var lasturl = "";
    var frame = document.getElementById('stream');
    var url = document.body.dataset.url;
    
    window.DEBUG = true;

    var get_cast_url_success = function(response)
    {
        var response = JSON.parse(response);
        if(DEBUG) console.log("Get cast url success: ", response);
        if(lasturl !== response.url)
        {
            if(DEBUG) console.log('Update URL');
            lasturl = response.url;
            frame.src = response.url;
        }
    }

    var get_cast_url_failure = function(response)
    {
        alert("Errore imprevisto");
        if(DEBUG) console.log('Get cast url error: ', response);
    }

    var get_cast_url_done = function()
    {
        if(DEBUG) console.log("Request new url");
        setTimeout(get_cast_url, 5000);
    }

    var get_cast_url = function() {
        httpGetAsync(url, 
                     get_cast_url_success,
                     get_cast_url_failure,
                     get_cast_url_done);
    };

    get_cast_url();
}(window));
