#!/bin/bash

if [ ! -d "/var/docker-volume/home-automation-transmitter/zigbee2mqtt" ]; then
    sudo mkdir -p "/var/docker-volume/home-automation-transmitter/zigbee2mqtt"
    sudo cp configuration.yaml /var/docker-volume/home-automation-transmitter/zigbee2mqtt/configuration.yaml
fi

sudo rm -Rf /var/docker-volume/home-automation-transmitter/zigbee2mqtt/external_converters
sudo cp -r external_converters /var/docker-volume/home-automation-transmitter/zigbee2mqtt

docker compose up -d