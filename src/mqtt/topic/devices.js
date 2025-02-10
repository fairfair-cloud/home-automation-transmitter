import topic from "../../enum/topic.js";

export default {
    topic: topic.DEVICES,
    handler: function (topicName, mqttClient, message) {
        for (let i = 0; i < message.length; i++) {
            const device = message[i];

            if (device.type === "Coordinator") {
                continue;
            }

            mqttClient.subscribe(topic.DEVICE.replace(":ieee_address", device.ieee_address));
            mqttClient.subscribe(topic.DEVICE.replace(":ieee_address", device.ieee_address));
        }
    }
}