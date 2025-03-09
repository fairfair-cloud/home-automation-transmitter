import isNull from "../../util/isNull.js";

export default {
    handler: function (topicName, mqttClient, message) {
        if (isNull(global.ws) || global.ws.readyState !== WebSocket.OPEN) return;

        const deviceIeeeAddress = topicName.split("/")[1];

        const payload = JSON.stringify({
            path: "/state",
            data: {
                device: deviceIeeeAddress,
                data: message
            }
        });

        global.ws.send(payload);

        global.automation.reactOnState[deviceIeeeAddress].forEach(func => func(message));

    }
}