import topic from "../../enum/topic.js";
import isNull from "../../util/isNull.js";

export default {
    topic: topic.DEVICES,
    handler: function (topicName, mqttClient, message) {
        for (let i = 0; i < message.length; i++) {
            const device = message[i];

            if (device.type === "Coordinator") {
                continue;
            }

            mqttClient.subscribe(topic.DEVICE.replace(":ieee_address", device.ieee_address));
        }

        const payload = JSON.stringify({
            path: "/devices",
            data: message
        });

        if (isNull(global.ws) || global.ws.readyState !== WebSocket.OPEN) {
            if (isNull(global.queue)) global.queue = {};

            global.queue.devices = payload;
            return;
        }

        global.ws.send(payload);
    }
}