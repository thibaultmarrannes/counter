# intro

This repo is the API server and database for controlling a smiirl custom counter (https://www.smiirl.com/en/counter/category/custom)

The goals is to be able to scan an NFC chip and use this as a trigger for adding or subtracting from the counter

# Project Setup

To use this repository, create a `.env` file with the following variables:

```
# .env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

Replace `VARIABLE_NAME` and `ANOTHER_VARIABLE` with the actual variable names and their corresponding values.

Run docker-compose up --build

you should be able to access the express server on port 3000