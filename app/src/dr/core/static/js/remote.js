(function () {
    "use strict";

    document.getElementById("cast-button").onclick = function (event) {
		var url = document.getElementById("url-field").value;
		var channels = [];
		
		document.querySelectorAll(".display input:checked").forEach(function (e) {
			channels.push(e.value);
		});
		console.log(url, channels);

		// Fai una bella POST ad una nuova view che aggiorna i Channel nel db
		updateChannels(url, channels);

		// BONUS POINTS: Blocca il pulsante se non sono selezionati canali

		// BONUS POINTS: Fallo funzionare anche con il tasto "Invio" della tastiera
    };

	function updateChannels(url, channels) {
		var token = document.querySelector("[name=csrfmiddlewaretoken]").value;
        var req = new XMLHttpRequest();
		var data = new FormData();

		if(url.toLowerCase().substr(0, 4) !== 'http') {
			url = 'http://' + url;
		}

		data.append('url', url);
		data.append('channels', channels.join(","));
        req.open("POST", 'cast/_update', true);
		req.setRequestHeader("X-CSRFToken", token);

		req.onreadystatechange = function() {
			if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
				document.getElementById("url-field").value = "";

				for(var i=0; i < channels.length; i++) {
					var frame = document.getElementById('frame-' + channels[i]);
					frame.src=url;
				}
			}
		}

        req.send(data);
    }
}());