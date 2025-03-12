import load from "../../../automation/loader.js";
import fs from "fs";

const SCRIPT_DIR = "/home/ubuntu/home-automation-transmitter/src/automation/script";

export default async function (data) {

    try {
        await fs.unlinkSync(`${SCRIPT_DIR}/${data.payload.filename}`);
        load();
    } catch (e) {
        console.error(`Unable to uninstall script ${data.payload.filename}`);
    }
}
