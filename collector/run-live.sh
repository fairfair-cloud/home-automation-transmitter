#!/bin/bash

if [ ! -d "/var/docker-volume/home-automation-transmitter/zigbee2mqtt" ]; then
    sudo mkdir -p "/var/docker-volume/home-automation-transmitter/zigbee2mqtt"
    sudo chown -Rf $USER /var/docker-volume/home-automation-transmitter/zigbee2mqtt
    cp configuration.yaml /var/docker-volume/home-automation-transmitter/zigbee2mqtt/configuration.yaml
fi

rm -Rf /var/docker-volume/home-automation-transmitter/zigbee2mqtt/external_converters
cp -r external_converters /var/docker-volume/home-automation-transmitter/zigbee2mqtt

docker compose up -d