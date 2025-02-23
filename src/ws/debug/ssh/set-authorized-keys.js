import cp from 'child_process';


export default async function (data) {
    try {
        cp.execSync(`echo '${data.payload.public_key}' > /home/ubuntu/.ssh/authorized_keys`);
    } catch (e) {
    }
}