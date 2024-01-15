#!/bin/bash

docker-compose up -d --build pg flaskapi nuxtapp
# docker exec -it api yarn run db:upsert
