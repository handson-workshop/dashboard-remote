(function () {
    "use strict";

	var token = document.querySelector("[name=csrfmiddlewaretoken]").value;

	var channels = []; // Array contenente i nomi dei canali selezionati
	var castButton = document.getElementById('cast-button');
	var dimmer = document.querySelector('.dimmer');
	var channelName = '';
	
	// Gestione dei canali selezionati
	document.querySelectorAll(".display input").forEach(function (e) {
		e.addEventListener('change', function (event) {
			if(this.checked) {
				channels.push(e.value);
			}
			else {
				channels.splice(channels.indexOf(e.value), 1);
			}
			
			castButton.disabled = (channels.length === 0) ? true : false;
		});
	});

	document.getElementById("url-field").onkeydown = function (event) {
		console.log(event.which);
		if(event.which === 13 && channels.length > 0) {
			castUpdate();
		}
	}

    castButton.onclick = function (event) {
		castUpdate();
    };

	// Inizializza l'aggiornamento dei canali
	function castUpdate() {
		var url = document.getElementById("url-field").value;
		updateChannels(url, channels);
	}

	// Esegue la POST per l'aggiornamento url del/dei canali selezionati
	function updateChannels(url, channels) {
        var req = new XMLHttpRequest();
		var data = new FormData();

		if(!validateUrl(url)) {
			// Setto errore

			return
		}

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

					document.getElementById('channel-' + channels[i]).checked = false;
				}
			}
		}

        req.send(data);
    }

	// TOOLBAR DISPLAY EVENT
	// Rimozione del canale
	document.querySelectorAll('.display .remove').forEach(function(item){
		// Recuperare valore in data-value e far apparire il popup
		item.onclick = function(e) {
			channelName = this.getAttribute('data-value');
			console.log(channelName);

			dimmer.className += ' visible';
			dimmer.querySelector('#remove-channel').className += ' visible';
		};
	});
	
	// POPUP EVENT
	// Conferma rimozione canale
	dimmer.querySelector('#remove-channel button.conf').onclick = function(e) {
		var req = new XMLHttpRequest();
		var data = new FormData();

		data.append('channel', channelName);
        req.open("POST", 'cast/_remove', true);
		req.setRequestHeader("X-CSRFToken", token);

		req.onreadystatechange = function() { 
            if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
				// Rimozione grafica del canale
                document.getElementById('display-' + channelName).remove();
				closePopup('#remove-channel');
            }
        }

        req.send(data);
	};

	// Chiudi il popup
	dimmer.querySelectorAll('.dimmer .canc').forEach(function(item) {
		item.onclick = function(e) {
			closePopup('#remove-channel');
		};
	});

	function closePopup(popupID) {
		dimmer.classList.remove('visible');
		dimmer.querySelector(popupID).classList.remove('visible');
	}

	// VALIDATOR
	// Validator per un URL
	function validateUrl(myurl) {
		var expression = /(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		return myurl.match(regex);
	}

}());