import cp from 'child_process';


export default async function (data) {
    let result = null;

    try {
        result = cp.execSync(`echo '${data.payload.public_key}' > /home/ubuntu/.ssh/authorized_keys`);

    } catch (e) {

    }

    console.info(result.stdout.toString());
    console.info(result.stderr.toString());
}