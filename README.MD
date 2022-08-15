# Hvordan kjøre prosjektet

Sett opp docker og databasen, se lenger ned

Installer avhengigheter

```bash
mr-salami> pip install -r requirements.txt
mr-salami> cd frontend
mr-salami/frontend> npm install
```

Kjør applikasjonen på port 8080
Husk å source venvet ditt, står det ikke "(venv)" på starten av prompten din har du ikke aktivert den

```bash
mr-salami> source venv/bin/activate
(venv) mr-salami> source env.sh && gunicorn web_api:app -b :8080
```

Kjøre frontend
```bash
mr-salami/frontend> npm start
```


# Hvordan sette opp database lokalt?

Du kan også snakke rett med vår produksjonsinstans, spør Theodor om database urlen.

Installere en klient som kan snakke med databasen

```
$ brew install postgres
```

Starte databasen
```
docker run --name mydb -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

Koble til databasen
```
psql -h localhost -U postgres --password
```
Det vil komme en prompt hvor du legger inn passordet "password"

Populere databasen med data
Filen ligger på [drive](https://drive.google.com/file/d/1Z0xOdDjZLqWo47UxYHsHqdF0_cEXUTZy/view?usp=sharing)

```
psql -h localhost -U postgres --password < pizzabot_dump.sql
```
Oppdater databaseskjemaene med våre endringer
```
psql -h localhost -U postgres --password < db/migration1.sql
```

## Environemnt variabler
Vi trenger noen miljøvariabler for å kjøre applikasjonen:
* ADMIN_USERNAME - admin-brukernavnet for innlogging
* ADMIN_PASS - admin-passordet for innlogging
* DATABASE_URL - url til databasen, men den bruker vi kun i prod. Den trenger ikke å settes. 

