import isNull from "../../util/isNull.js";

export default {
    handler: function (topicName, mqttClient, message) {
        if (isNull(global.ws) || global.ws.readyState !== WebSocket.OPEN) return;

        const payload = JSON.stringify({
            path: "/state",
            data: message
        });

        global.ws.send(payload);

    }
}