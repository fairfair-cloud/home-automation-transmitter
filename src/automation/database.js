import isNull from "../util/isNull.js";
import {ZonedDateTime, ZoneId} from "@js-joda/core";

const MAX_HISTORY_SECONDS = 60 * 60 * 24;

if (isNull(global.database)) {
    global.database = {};
}

function add(deviceIeeeAddress, data) {
    if (isNull(global.database[deviceIeeeAddress])) {
        global.database[deviceIeeeAddress] = {};
    }

    global.database[deviceIeeeAddress][ZonedDateTime.now(ZoneId.of("Europe/Paris"))] = data;

    const dates = Object.keys(global.database[deviceIeeeAddress]);
    const length = dates.length;
    const nowEpochSeconds = ZonedDateTime.now(ZoneId.of("Europe/Paris")).toEpochSecond();

    for (let i = 0; i < length; i++) {
        if (nowEpochSeconds - MAX_HISTORY_SECONDS > ZonedDateTime.parse(dates[i]).toEpochSecond()) {
            delete global.database[deviceIeeeAddress][dates[i]];
        }
    }
}

export default {add};