# Hvordan kjøre prosjektet

Sett opp docker og databasen, se lenger ned

Installer avhengigheter

```bash
> pip install -r requirements.txt
```

Kjør applikasjonen

```bash
> gunicorn web_api:app
```



# Hvordan sette opp database lokalt?

Du kan også snakke rett med vår produksjonsinstans, spør Theodor om database urlen.

Installere en klient som kan snakke med databasen

```
$ brew install pgcli #eventuelt installer hele postgresql
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