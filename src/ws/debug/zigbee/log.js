import {spawn} from 'child_process';

const CONTAINER_NAME = "zigbee2mqtt";

export default async function (data) {
    let result = "";

    const process = spawn('docker', ["container", "logs", CONTAINER_NAME, "-t"]);

    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.stderr.on('data', (data) => {
        result += data.toString();
    });

    process.on('close', (code) => {
        global.ws.send(JSON.stringify({
            path: "/result-zigbee-logs",
            payload: result
        }));
    });
}