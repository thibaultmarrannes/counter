# intro

This repo is the API server and database for controlling a smiirl custom counter (https://www.smiirl.com/en/counter/category/custom)

The goals is to be able to scan an NFC chip and use this as a trigger for adding or subtracting from the counter

# Project Setup

This project uses docker, docker-compose, npm, postgres, PGadmin and most of all Smiirl. If you have difficulties starting this project it might be because of those base dependencies.

To use this repository, create a `.env` file in the root with the following variables:

```
# .env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
COUNTER_MAC = 
COUNTER_TOKEN = 
```

Replace `POSTGRES_USER` etc with the actual variable names and their corresponding values. You can fill in whatever you want, only the COUNTER_MAC and ther COUNTER_TOKEN are actual values that you need to get from Smiirl. Visit their help article on more info on how to get that information: https://help.smiirl.com/article/292-how-can-i-get-my-counter-id-and-token-for-zapier-api


To actually run the project do the following:

```
Run docker-compose up --build
```


- you should be able to access the express server on port 3000
- you should be able to acces the PG Admin interface on port 8080, log in using the credentials from the .env file. To link the database 


To be able to fully use this project you will need to host this project somewhere. Personally I just host it on a Synology NAS and link a domain name to it with Cloudflare zero trust tunnels. Plenty of info on Youtube if you're interested in it. 