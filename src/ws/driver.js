let pingInterval = null;

async function onmessage(e) {
    let data = null;

    try {
        data = JSON.parse(e.data);
    } catch (error) {
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
    global.ws = new WebSocket(process.env.WS_URL, {
        headers: {
            ["License-Key"]: "89a325f85045",
            ["Transmitter-Version"]: "1.0.0"
        }
    });

    global.ws.onopen = onopen;
    global.ws.onclose = onclose;
    global.ws.onmessage = onmessage;
    global.ws.onerror = onerror;

}

connect();

