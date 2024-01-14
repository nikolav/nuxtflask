#!/bin/bash

docker-compose up -d --build pg flaskapi
# docker exec -it api yarn run db:upsert
