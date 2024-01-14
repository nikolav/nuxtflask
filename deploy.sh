#!/bin/bash

docker-compose up -d --rm --build pg
# docker exec -it api yarn run db:upsert
