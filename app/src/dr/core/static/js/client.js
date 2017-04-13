(function () {
    "use strict";

    var lasturl = "";

    var get_cast_url = function() {
        var url = document.body.dataset.url;
        var frame = document.getElementById('stream');
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() { 
            if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
                var response = JSON.parse(req.responseText);
                console.log(response);
                if(lasturl !== response.url)
                {
                    console.log('Reload');
                    lasturl = response.url;
                    frame.src = response.url;
                }
                setTimeout(get_cast_url, 5000);
            }
        }

        req.open("GET", url, true);
        req.send( null );
    };

    get_cast_url();
}());
