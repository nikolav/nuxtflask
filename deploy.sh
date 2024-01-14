#!/bin/bash

docker-compose up -d --build pg
# docker exec -it api yarn run db:upsert
