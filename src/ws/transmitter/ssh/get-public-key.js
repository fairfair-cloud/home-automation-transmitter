import {spawn} from 'child_process';


export default async function (data) {
    let result = "";

    const process = spawn('cat', ["/home/ubuntu/.ssh/support.pub"]);

    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.stderr.on('data', (data) => {
        result += data.toString();
    });

    process.on('close', (code) => {
        global.ws.send(JSON.stringify({
            path: "/result-get-public-key",
            payload: result
        }));
    });
}