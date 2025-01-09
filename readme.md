# intro

This project is made to track habits and give them points. The total score can then be displayed on a Smiirl split flap counter. 


V1: 

- ability to scan goals (both positive and negative) which then stores that event in the database and updates the smiirl counter. 

Backlog

- Send weekly recap mails with past activity
- 


# Project Setup

This project uses docker, docker-compose, npm, postgres, PGadmin and most of all Smiirl. If you have difficulties starting this project it might be because of those base dependencies.

To use this repository, create a `.env` file in the root with the following variables:

```
# Postgres configuration
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# PGAdmin configuration
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

# Smiirl configuration
COUNTER_MAC=
COUNTER_TOKEN=

# Sendgrid configuration
SENDGRID_API_KEY=

# Ports configuration
LOCAL_PORT=3011
DB_PORT=4234
PGADMIN_PORT=5043

```

Replace `POSTGRES_USER` etc with the actual variable names and their corresponding values. You can fill in whatever you want, only the COUNTER_MAC and ther COUNTER_TOKEN are actual values that you need to get from Smiirl. Visit their help article on more info on how to get that information: https://help.smiirl.com/article/292-how-can-i-get-my-counter-id-and-token-for-zapier-api

If you want to stay updated via mail, you can also add a (free) Sendgrid API key. 


To actually run the project run the following command from within the root folder:

```
docker-compose up --build
```


- you should be able to access the express server on the port you filled in in the .env
- OPTIONAL: you should be able to acces the PG Admin interface on the pgadmin port from the .env, log in using the credentials from the .env file. To link the database 
- OPTIONAL: When you're logged in to PG admin, you can then add the database so you can see the values it.


To be able to fully use this project you will need to host this project somewhere. Personally I just host it on a Synology NAS and link a domain name to it with Cloudflare zero trust tunnels. Plenty of info on Youtube if you're interested in it. 