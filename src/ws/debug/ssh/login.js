import {spawn} from 'child_process';

export default async function (data) {
    let result = "";

    const process = spawn('ssh', [
        "-NR",
        "-o", "\"IdentitiesOnly=yes\"",
        "-o", "\"StrictHostKeyChecking=no\"",
        `${process.env.REVERSE_SSH_LOCAL_PORT}:localhost:22 remote@${data.ip}`
    ]);

    process.stdout.on('data', (data) => {
        console.log(data);
    });

    process.stderr.on('data', (data) => {
        console.log(data);
    });

    process.on('close', (code) => {
        console.log("SSH connection closed");
    });
}