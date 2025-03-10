global.queue = {
    devices: null
}

import "@js-joda/timezone";
import "./src/config/env.js";
import "./src/ws/driver.js";
import "./src/mqtt/mqtt.js";
import "./src/automation/main.js";

console.log("PROCESS STARTED");