(function () {
    "use strict";

    var get_cast_url = function() {
        var url = document.body.dataset.url;
        var frame = document.getElementById('frame');
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() { 
            if (req.readyState == 4 && req.status == 200) {
                var response = JSON.parse(req.responseText);
                console.log(response);
                if(frame.src !== response.url)
                {
                    console.log('Reload');
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
