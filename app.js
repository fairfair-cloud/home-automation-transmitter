global.queue = {
    devices: null
}

import "./src/config/env.js";
import "./src/ws/driver.js";
import "./src/mqtt/mqtt.js";
import "./src/automation/loader.js";

console.log("PROCESS STARTED");