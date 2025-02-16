export default async function (data) {
    mqttClient.publish(data.payload.topic, JSON.stringify(data.payload.payload));
}