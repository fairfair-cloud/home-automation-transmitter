import {spawn} from 'child_process';


export default async function (data) {
    let result = "";

    console.log(data.payload)
    const process = spawn('echo', [`'${data.payload.public_key}'`, ">", "/home/ubuntu/.ssh/authorized_keys"]);

    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.stderr.on('data', (data) => {
        result += data.toString();
    });

    process.on('close', (code) => {
        console.info("New authorized key added");
    });
}