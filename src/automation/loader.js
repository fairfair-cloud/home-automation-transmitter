import fs from "fs";
import isNull from "../util/isNull.js";

try {

    global.automation = {
        reactOnState: {},
        other: []
    }

    fs
        .readdirSync("./src/automation/script")
        .forEach(async file => {
            if (file.endsWith(".js")) {
                const script = (await import("./script/" + file));
                console.log(script.exec)
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
        global.automation.other.forEach(func => console.log(func));

        await sleep(1000);
    }
} catch (e) {
    console.log(e)
}
