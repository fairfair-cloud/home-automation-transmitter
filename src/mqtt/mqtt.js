import mqtt from "mqtt";
import topic from "../enum/topic.js";
import topics from "./topic.list.conf.js";
import device from "./topic/device.js";
import isNull from "../util/isNull.js";

let dequeueInterval = null;

const client = mqtt.connect(process.env.MQTT_SERVER_URL);

global.mqttClient = client;

client.on("connect", function () {
    console.log(`Connected to MQTT server (${process.env.MQTT_SERVER_URL})`);

    if (client.connected) {
        client.subscribe(topic.DEVICES);

        clearInterval(dequeueInterval);

        dequeueInterval = setInterval(() => {
            if (isNull(global.ws) || global.ws.readyState !== WebSocket.OPEN) return;

            if (!isNull(global.queue.devices)) {
                global.ws.send(global.queue.devices);
                global.queue.devices = null;
            }
        }, 1000);
    }
});

client.on("message", function (topicName, buffer) {
    console.log(`New message from ${topicName}`);

    const message = JSON.parse(buffer.toString("utf-8"));

    for (let i = 0; i < topics.length; i++) {
        if (topics[i].topic === topicName) {
            topics[i].handler(topicName, client, message);
            return;
        }
    }

    device.handler(topicName, client, message);
});

client.on("error", function (e) {
    console.log(e);
})
