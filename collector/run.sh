#!/bin/bash

cp zigbee2mqtt-data/configuration-default.yaml zigbee2mqtt-data/configuration.yaml

docker compose up

sudo rm zigbee2mqtt-data/configuration.yaml
sudo rm zigbee2mqtt-data/coordinator_backup.json
sudo rm zigbee2mqtt-data/database.db
sudo rm zigbee2mqtt-data/database.db.backup
sudo rm zigbee2mqtt-data/state.json
sudo rm -Rf zigbee2mqtt-data/log

