import cp from "child_process";

export default async function (data) {
    try {
        const sh = cp.exec(`eval $(ssh-agent) && ssh-add /home/ubuntu/.ssh/support && ssh -NR ${process.env.REVERSE_SSH_LOCAL_PORT}:localhost:443 ubuntu@${data.payload.ip} &`);
    } catch (e) {

    }
}