
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

### Installazione
Configurare il server ed inserire gli hostname o l'Ip del server in
```ALLOWED_HOST``` nel file *settings.py* di Django posto in 
(app/src/dr/settings.py), modificare come segue:

```python
ALLOWED_HOSTS = [
    'localhost',
	'myservername',
	'192.xxx.xxx.xxx'
]
``` 

Prima di avviare il server è necessario effetuuare una migrazione del database eseguendo il seguente comando:
```sh
$ docker-compose run --rm app python manage.py migrate --no-input
```

Per avviare il server eseguire il comando:

```sh
$ docker-compose up
```

Aprire il browser all'indirizzo: ```http://localhost:8000/dr/remote```

Aprire il browser sul dispositivo su cui eseguire il cast all'indirizzo: ```http://myservername:8000/dr/cast/hellocast```

É possibile eseguire ilserver ed il cast sulla stessa macchina, in questo caso 
eseguire il cast digitando l'indirizzo: ```http://localhost:8000/dr/cast/localhostcast```

## Tecnologie utilizzate
Per la realizzazione di questo progetto sono state utilizzate le seguenti
tecnologie:

- Docker
- Python
  - Django
- HTML, CSS e JavaScript
- SQLite

## Licenza
Dashboard Remote è rilasciato sotto licenza MIT.
