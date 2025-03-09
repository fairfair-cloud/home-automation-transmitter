import fs from "fs";
import isNull from "../util/isNull.js";

global.automation = {
    reactOnState: {},
    other: []
}

fs
    .readdirSync("./script")
    .forEach(async file => {
        if (file.endsWith(".js")) {
            const script = (await import("./script/" + file));

            if (!isNull(script.DEVICE_IEEE_ADDRESS)) {
                global.automation.reactOnState[script.DEVICE_IEEE_ADDRESS] = script.exec;
            } else {
                global.automation.other.push(script.exec);
            }
        }
    });


const sleep = ms => new Promise(r => setTimeout(r, ms));

function callScripts() {
    global.automation.other.forEach(func => func());
}

while (true) {
    callScripts();

    await sleep(1000);
}

