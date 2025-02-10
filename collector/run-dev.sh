#!/bin/bash

sudo mkdir -p "/var/docker-volume/home-automation-transmitter/zigbee2mqtt"
sudo chown -Rf $USER /var/docker-volume/home-automation-transmitter/zigbee2mqtt
cp configuration.yaml /var/docker-volume/home-automation-transmitter/zigbee2mqtt/configuration.yaml

#cp configuration.yaml ./zigbee2mqtt-data/configuration.yaml

docker compose up

sudo rm -Rf /var/docker-volume/home-automation-transmitter/zigbee2mqtt

