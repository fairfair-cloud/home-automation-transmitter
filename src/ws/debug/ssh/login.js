import cp from "child_process";

export default async function (data) {
    try {
        const sh = cp.execSync(`eval $(ssh-agent) && ssh-add /home/ubuntu/.ssh/support && ssh -R ${process.env.REVERSE_SSH_LOCAL_PORT}:localhost:22 ubuntu@${data.payload.ip}`);
        console.log(`cm1 stderr: ${sh.stderr}`);
        console.log(`cm1 stdout: ${sh.stdout}`);
    } catch (e) {

    }
}