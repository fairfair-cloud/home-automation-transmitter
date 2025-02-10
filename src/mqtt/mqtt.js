import mqtt from "mqtt";
import topic from "../enum/topic.js";
import topics from "./topic.list.conf.js";
import device from "./topic/device.js";

const client = mqtt.connect(process.env.MQTT_SERVER_URL);

client.on("connect", function () {
    console.log(`Connected to MQTT server (${process.env.MQTT_SERVER_URL})`);

    if (client.connected) {
        client.subscribe(topic.DEVICES);
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
