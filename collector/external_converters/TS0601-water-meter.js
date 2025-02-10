const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const REPORT_PERIOD = {
    '1h': tuya.enum(0),
    '2h': tuya.enum(1),
    '3h': tuya.enum(2),
    '4h': tuya.enum(3),
    '6h': tuya.enum(4),
    '8h': tuya.enum(5),
    '12h': tuya.enum(6),
    '24h': tuya.enum(7)
}

const definition = {
    fingerprint: [
        {
            modelID: 'TS0601',
            manufacturerName: '_TZE200_vuwtqx0t',
        },
    ],
    model: 'TS0601',
    vendor: 'TuYa',
    description: 'Tuya water meter with valve',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime,
    configure: tuya.configureMagicPacket,
    exposes: [
        e.numeric('water_consumed', ea.STATE).withUnit('L').withDescription('Total water consumed'),
        e.enum('report_period', ea.STATE_SET, Object.keys(REPORT_PERIOD)).withDescription('Temperature Report interval'),
        e.binary('state', ea.STATE_SET, 'ON', 'OFF').withDescription('Valve position'),
        e.binary('auto_clean', ea.STATE_SET, 'ON', 'OFF').withDescription('Auto Clean'),
        e.temperature().withDescription('Water Temperature'),
        e.numeric('battery_voltage', ea.STATE).withDescription('Battery voltage'),
    ],
    meta: {
        tuyaDatapoints: [
            [1, 'water_consumed', tuya.valueConverter.raw],
            [4, 'report_period', tuya.valueConverterBasic.lookup(REPORT_PERIOD)],
            [13, 'state', tuya.valueConverter.onOff],
            [14, 'auto_clean', tuya.valueConverter.onOff],
            [22, 'temperature', tuya.valueConverter.divideBy100],
            [26, 'battery_voltage', tuya.valueConverter.divideBy100],
        ],
    },
};
module.exports = definition;