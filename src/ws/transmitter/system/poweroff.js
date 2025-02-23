import * as child_process from "child_process";

export default async function (data) {
    child_process.exec("sudo poweroff", function (callback) {
        console.log(callback);
    });
}