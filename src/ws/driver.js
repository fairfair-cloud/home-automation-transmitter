import cp from "child_process";
import isNull from "../util/isNull.js";

let pingInterval = null;

async function onmessage(e) {
    let data = null;

    try {
        data = JSON.parse(e.data);
    } catch (error) {
        console.log(error);
        return;
    }

    try {
        console.info(`[WSS] ${data.path}`);
        (await import("../ws" + data.path + ".js")).default(data);
    } catch (e) {
        console.log(e)
    }
}

function onopen(e) {
    console.info(`Connected to WS server (${process.env.WS_URL})`);

    ping();
}

function onclose(e) {
    console.warn("Connection closed");

    clearInterval(pingInterval);
    retryConnection();
}

function onerror(e) {
    console.log(`Received error : ` + e.message);

    if (global.ws.readyState !== WebSocket.OPEN) {
        clearInterval(pingInterval);
        retryConnection();
    }
}

function ping() {
    pingInterval = setInterval(() => {
        if (global.ws.readyState !== WebSocket.OPEN) {
            return;
        }

        global.ws.send(JSON.stringify({
            path: "/ping"
        }));
    }, 25000);
}

function retryConnection() {
    setTimeout(() => {
        console.info("Trying to reconnect...");
        connect();
    }, 5000);
}

function connect() {
    let sshPublicKey = null;

    try {
        sshPublicKey = cp.execSync("cat /home/ubuntu/.ssh/support.pub");
    } catch (e) {
        console.error(e);
    }

    global.ws = new WebSocket(process.env.WS_URL, {
        headers: {
            ["License-Key"]: "89a325f85045",
            ["Transmitter-Version"]: "1.0.0",
            ["SSH-Public-Key"]: !isNull(sshPublicKey) ? sshPublicKey.toString() : null
        }
    });

    global.ws.onopen = onopen;
    global.ws.onclose = onclose;
    global.ws.onmessage = onmessage;
    global.ws.onerror = onerror;

}

connect();

