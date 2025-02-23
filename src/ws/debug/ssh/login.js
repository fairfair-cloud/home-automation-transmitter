import * as cp from 'child_process';

export default async function (data) {

    const sh = cp.execSync('ssh', [
        "-NR",
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