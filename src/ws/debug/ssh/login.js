import {spawn} from 'child_process';

export default async function (data) {

    console.log(data)
    const sh = spawn('ssh', [
        "-NR",
        //"-o \"IdentitiesOnly=yes\"",
        //"-o \"StrictHostKeyChecking=no\"",
        `${process.env.REVERSE_SSH_LOCAL_PORT}:localhost:22`,
        `remote@${data.payload.ip}`
    ]);

    sh.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    sh.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    sh.on('close', (code) => {
        console.log("SSH connection closed");
    });
}