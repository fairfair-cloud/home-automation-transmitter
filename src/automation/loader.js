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

console.log(global.automation);

const sleep = ms => new Promise(r => setTimeout(r, ms));


while (true) {
    global.automation.other.forEach(func => func());

    await sleep(1000);
}

