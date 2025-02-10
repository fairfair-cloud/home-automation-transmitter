#!/bin/bash

sudo mkdir -p "/var/docker-volume/home-automation-transmitter/zigbee2mqtt"
sudo chown -Rf $USER /var/docker-volume/home-automation-transmitter/zigbee2mqtt
cp configuration.yaml /var/docker-volume/home-automation-transmitter/zigbee2mqtt/configuration.yaml
cp -r external_converters /var/docker-volume/home-automation-transmitter/zigbee2mqtt

docker compose up

sudo rm -Rf /var/docker-volume/home-automation-transmitter/zigbee2mqtt