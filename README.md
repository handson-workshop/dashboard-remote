# Dashboard remote

Web application per il controllo remoto di qualsiasi dispositivo, TV o monitor 
adibito per la visualizzazione di business dashboard.

## Per iniziare
Clona il progetto in locale

```sh
$ git clone <REPOSITORY-URL>
```

### Prerequisiti
Per eseguire questo progetto è necessario installare Docker.

#### Windows 10
Per Windows 10 è possibile installare l'app 
[Docker for Windows](https://docs.docker.com/docker-for-windows/install/#download-docker-for-windows).

I requisiti per l'installazione sono disponibili [qui](https://docs.docker.com/docker-for-windows/install/#what-to-know-before-you-install)

Per ulteriori dettagli su *Docker for Windows* visita questo 
[link](https://docs.docker.com/docker-for-windows/).
Per una guida pratica su come utilizzare *Docker for Windows* vedi questo 
[video]().

#### Mac
Per Mac è possibile installare l'app 
[Docker for Mac](https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac).

I requisiti per l'installazione sono disponibili [qui](https://docs.docker.com/docker-for-mac/install/#what-to-know-before-you-install)

Per ulteriori dettagli su *Docker for Mac* visita questo 
[link](https://docs.docker.com/docker-for-mac/).
Per una guida pratica su come utilizzare *Docker for Mac* vedi questo 
[video]().

#### Altre versioni
Per le versioni precedenti di Windows e Mac installare la [Docker toolbox](https://www.docker.com/products/docker-toolbox), come componenti aggiuntivi è
necessario installare *VirtualBox*.

Per ulteriori dettagli su *Docker toolbox* visita questo 
[link](https://docs.docker.com/get-started/).
Per una guida pratica su come utilizzare *Docker toolbox* vedi questo 
[video]().

#### Linux
Per Linux installare Docker da [qui](https://docs.docker.com/engine/installation/).

Per ulteriori dettagli su *Docker for Linux* visita questo 
[link](https://docs.docker.com/get-started/).
Per una guida pratica su come utilizzare *Docker for Linux* vedi questo 
[video]().

### Installazione
Configurare il server ed inserire gli host .... in ```ALLOWED_HOST``` nel file *settings.py*
di Django posto in (app/src/dr/settings.py), modificare come segue:

```python
ALLOWED_HOSTS = [
    'localhost',
	'myservername,
]
``` 

Per avviare il server eseguire il comando:

```sh
	$ docker-compose up
```

Ed aprire il browser all'indirizzo: ```http://localhost:8000/dr/remote```

Aprire il browser sul dispositivo su cui eseguire il cast all'indirizzo: ```http://myservername:8000/dr/cast/hellocast```

## Tecnologie utilizzate
Per la realizzazione di questo progetto sono state utilizzate le seguenti
tecnologie:

- Docker
- Python
  - Django
- HTML, CSS e JavaScript
- SQLite

## Contribuire

## Autori

## Licenza