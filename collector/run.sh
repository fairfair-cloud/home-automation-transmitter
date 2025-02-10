#!/bin/bash

cp configuration.yaml /var/docker-volume/home-automation-transmitter/configuration.yaml

docker compose up

sudo rm /var/docker-volume/home-automation-transmitter/configuration.yaml
sudo rm /var/docker-volume/home-automation-transmitter/coordinator_backup.json
sudo rm /var/docker-volume/home-automation-transmitter/database.db
sudo rm /var/docker-volume/home-automation-transmitter/database.db.backup
sudo rm /var/docker-volume/home-automation-transmitter/state.json
sudo rm -Rf /var/docker-volume/home-automation-transmitter/log

