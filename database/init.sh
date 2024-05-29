#!/bin/bash

MONGO_HOST="localhost"
MONGO_PORT="27017"
MONGO_DB="hp_api"
MONGO_COLLECTION="players"
DATA_FILE="sample-data.json"

mongosh ${MONGO_DB} --eval "db.${MONGO_COLLECTION}.drop()"

mongoimport --host $MONGO_HOST --port $MONGO_PORT --db $MONGO_DB --collection $MONGO_COLLECTION --file $DATA_FILE --jsonArray --upsertFields _id

mongosh ${MONGO_DB} --eval "db.${MONGO_COLLECTION}.createIndex({ 'id': 1 }, { unique: true })"
