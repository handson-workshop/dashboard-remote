(function () {
    "use strict";

	var token = document.querySelector("[name=csrfmiddlewaretoken]").value;

	var channels = []; // Array contenente i nomi dei canali selezionati
	var castButton = document.getElementById('cast-button');
	var dimmer = document.querySelector('.dimmer');
	var channelName = '';
	var urlField = document.getElementById("url-field");
	
	// Gestione dei canali selezionati
	var inputs = document.querySelectorAll(".display input");
	for(var i = 0; i < inputs.length; i++){
		inputs[i].addEventListener('change', function (event) {
			if(this.checked)
				channels.push(this.value);
			else
				channels.splice(channels.indexOf(this.value), 1);

			castButton.disabled = (channels.length === 0) ? true : false;
		});
	}

	urlField.onkeydown = function (event) {
		if(event.which === 13 && channels.length > 0) {
			castUpdate();
		}
	}

    castButton.onclick = function (event) {
		castUpdate();
    };

	// Inizializza l'aggiornamento dei canali
	function castUpdate() {
		var url = urlField.value;
		updateChannels(url);
	}

	// Esegue la POST per l'aggiornamento url del/dei canali selezionati
	function updateChannels(url) {
		var data = new FormData();

		if(document.getElementById("url-field").checkValidity()) {
			// Setto errore
			alert("url error");
			return;
		}

		url = composeUrl(url);

		data.append('url', url);
		data.append('channels', channels.join(","));

		var extra = {};
		extra.headers = [];
		extra.data = data;
		extra.headers["X-CSRFToken"] = token;
		
		var updateChannels_success = function() {
			urlField.value = "";

			for(var i=0; i < channels.length; i++) {
				var frame = document.getElementById('frame-' + channels[i]);
				frame.src=url;
				document.getElementById('channel-' + channels[i]).checked = false;
			}
			channels = [];
			castButton.disabled = true;
		}
		httpPostAsync('cast/_update', updateChannels_success, extra);
    }

	function composeUrl(url)
	{
		if(url.toLowerCase().substr(0, 7) !== 'http://' &&
		   url.toLowerCase().substr(0, 8) !== 'https://') {
			url = 'http://' + url;
		}

		return url;
	}

	// TOOLBAR DISPLAY EVENT
	// Rimozione del canale
	var display = document.querySelectorAll('.display .remove');
	
	for(var i = 0; i < display.length; i++) {
		var item = display[i];
		// Recuperare valore in data-value e far apparire il popup
		item.onclick = function(e) {
			channelName = this.getAttribute('data-value');
			console.log(channelName);

			dimmer.className += ' visible';
			dimmer.querySelector('#remove-channel').className += ' visible';
		};
	}
	
	// POPUP EVENT
	// Conferma rimozione canale
	dimmer.querySelector('#remove-channel button.conf').onclick = function(e) {
		var req = new XMLHttpRequest();
		var data = new FormData();

		data.append('channel', channelName);
		
		var extra = {};
		extra.headers = [];
		extra.data = data;
		extra.headers["X-CSRFToken"] = token;
		
		var updateChannels_success = function() {
			// Rimozione grafica del canale
			document.getElementById('display-' + channelName).remove();
			closePopup('#remove-channel');
		}
		httpPostAsync('cast/_remove', updateChannels_success, extra);
	};

	// Chiudi il popup
	var closeButtons = dimmer.querySelectorAll('.dimmer .canc');
	
	for(var i = 0; i < closeButtons.length; i++) {
		var item = closeButtons[i];
		item.onclick = function(e) {
			closePopup('#remove-channel');
		};
	}

	function closePopup(popupID) {
		dimmer.classList.remove('visible');
		dimmer.querySelector(popupID).classList.remove('visible');
	}

}());