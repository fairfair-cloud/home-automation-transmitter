import fs from "fs";
import isNull from "../util/isNull.js";

function load() {
    global.automation = {
        reactOnState: {},
        other: []
    }

    fs
        .readdirSync("./src/automation/script")
        .forEach(async file => {
            if (file.endsWith(".js")) {
                console.info("Loading script " + file + "...");

                delete require.cache[require.resolve(file)];
                const script = (await import("./script/" + file)).default;

                if (!isNull(script.DEVICE_IEEE_ADDRESS)) {
                    if (isNull(global.automation.reactOnState[script.DEVICE_IEEE_ADDRESS])) {
                        global.automation.reactOnState[script.DEVICE_IEEE_ADDRESS] = [];
                    }

                    global.automation.reactOnState[script.DEVICE_IEEE_ADDRESS].push(script.exec);
                } else {
                    global.automation.other.push(script.exec);
                }
            }
        });
}

export default load;
