import load from "../../../automation/loader.js";
import fs from "fs";

const SCRIPT_DIR = "/home/ubuntu/home-automation-transmitter/src/automation/script";

export default async function (data) {
    try {
        await fs.writeFileSync(`${SCRIPT_DIR}/${data.payload.filename}`, data.payload.content);
        load();
    } catch (e) {
        console.error(`Unable to install script ${data.payload.filename}`);
    }
}