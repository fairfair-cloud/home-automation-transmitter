import cp from "child_process";

export default async function (data) {
    try {
        cp.exec(`eval $(ssh-agent) && ssh-add /home/ubuntu/.ssh/support && ssh -NR ${process.env.REVERSE_SSH_LOCAL_PORT}:localhost:22 ubuntu@${data.payload.ip}`);
    } catch (e) {
    }
}