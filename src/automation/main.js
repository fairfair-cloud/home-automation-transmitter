import load from "./loader.js";

load();

try {

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    while (true) {
        global.automation.other.forEach(func => {
            try {
                func()
            } catch (e) {
                console.error(e);
            }
        });

        await sleep(1000);
    }
} catch (e) {
    console.error(e);
}