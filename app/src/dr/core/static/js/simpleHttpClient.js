"use strict";

/**
 * Esegue una GET sincrona
 * @param {string} url Endpoint
 */
function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * Esegue una GET asincrona
 * @param {string} url Endpoint
 * @param {function(string)} onSuccess Callback da eseguire se la richiesta termina con successo
 * @param {?function(string)} onFailure Callback (opzionale) da eseguire se la richiesta non va a buon fine
 * @param {?function()} done Callback (opzionale) da eseguire quando termina la richiesta, indipendentemente 
 * dall'esito 
 */
function httpGetAsync(url, onSuccess, onFailure, done)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == XMLHttpRequest.DONE)
        {
            if (xmlHttp.status == 200)
            {
                onSuccess(xmlHttp.responseText);
            }
            else if (xmlHttp.status != 200)
            {
                if(onFailure) onFailure(xmlHttp.responseText);
            }
            
            if(done) done();
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function httpPostAsync(url, onSuccess, extra)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == XMLHttpRequest.DONE)
        {
            if (xmlHttp.status == 200)
            {
                onSuccess(xmlHttp.responseText);
            }
            else if (xmlHttp.status != 200)
            {
                if(extra.onFailure) extra.onFailure(xmlHttp.responseText);
            }
            
            if(extra.done) extra.done();
        }
    }
    xmlHttp.open("POST", url, true);

    if(extra.headers)
    {
        for (var key in extra.headers) {
            if (extra.headers.hasOwnProperty(key)) {
                var element = extra.headers[key];
                xmlHttp.setRequestHeader(key, element);
            }
        }
    }

    xmlHttp.send((extra.data) ? extra.data : null);
}