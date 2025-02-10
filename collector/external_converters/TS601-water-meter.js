const {} = require('zigbee-herdsman-converters/lib/modernExtend');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');


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

        // Need to fix this month and daily consumption - currently shows as JSON
        e.numeric('month_consumption', ea.STATE).withDescription('month consumption'),
        e.numeric('daily_consumption', ea.STATE).withDescription('daily consumption'),

        // Not sure what this does or how to change it
        e.numeric('month_and_daily_frozen_set', ea.STATE).withDescription('Month Daily Frozen Set'),

        //  I can't seem to get this to work - when i try to change the value i get an error in zigbee2mqtt, stuck on 1 Hour
        e.enum('report_period', ea.STATE_SET, ['1h', '2h', '3h', '4h', '6h', '8h', '12h', '24h']).withDescription('Temperature Report interval'),

        // These are attempts at getting the valve open/closed switch and the autoclean switch working together.
        // Valve Open/Close -  (Name isnt correct in Zigbee2MQTT)
        // e.switch().setAccess('state', ea.STATE_SET).withDescription('Valve Open / Close'),
        // tuya.exposes.switch().withDescription('Valve Open / Close'),
        e.binary('state', ea.STATE_SET, 'ON', 'OFF').withDescription('Valve position'),

        // Autoclean switch - deactivated because I dont know how to get it working independently to the valve open/close switch
        e.binary('auto_clean', ea.STATE_SET, 'ON', 'OFF').withDescription('Auto Clean'),

        // e.switch().setAccess('state', ea.STATE_SET).withDescription('Auto Clean'),
        // tuya.exposes.switch().withDescription('Auto Clean'),

        e.text('meter_id', ea.STATE).withDescription('Meter ID (ID of device)'),
        // Reverse consumption and instantaneous flow are appearing as JSON, in tuya they are a Base 64 but I dont know how to get it to show correctly
        e.numeric('reverse_water_consumption', ea.STATE).withDescription('reverse water flow'),
        //e.numeric('instantaneous_flow_rate', ea.STATE).withDescription('Inst flow rate'),
        e.numeric('instantaneous_flow_rate', ea.STATE).withDescription('Inst flow'),

        e.temperature().withDescription('Water Temperature'),
        //Voltage works but doesnt show as the battery voltage in Z2M - no doubt something i havent understood
        e.numeric('battery_voltage', ea.STATE).withDescription('battery voltage'),
    ],

    meta: {
        tuyaDatapoints: [
            [1, 'water_consumed', tuya.valueConverter.raw],  // dtype number
            [2, 'month_consumption', tuya.valueConverter.raw],   // dtype 0 - raw
            [3, 'daily_consumption', tuya.valueConverter.raw],   // dtype 0 - raw
            [4, 'report_period', tuya.valueConverterBasic.lookup({
                '1h': tuya.enum(0), '2h': tuya.enum(1), '3h': tuya.enum(2),
                '4h': tuya.enum(3), '6h': tuya.enum(4), '8h': tuya.enum(5),
                '12h': tuya.enum(6), '24h': tuya.enum(7)
            })],   // dtype 4 - enum
            [6, 'month_and_daily_frozen_set', tuya.valueConverter.raw],  // dtype 0 - raw
            [13, 'state', tuya.valueConverter.onOff],   // Bool   VALVE OPEN CLOSE
            [14, 'auto_clean', tuya.valueConverter.onOff],   // Bool   AUTOCLEAN SW -  DISABLED  UNTILL I CAN FIGURE IT OUT
            [16, 'meter_id', tuya.valueConverter.raw],  //dtype 3 - raw   METER ID
            [18, 'reverse_water_consumption', tuya.valueConverter.raw],   // dtype 0 - raw
            [21, 'instantaneous_flow_rate', tuya.valueConverter.divideBy100], // dtype 0 - raw
            [22, 'temperature', tuya.valueConverter.divideBy100],
            [26, 'battery_voltage', tuya.valueConverter.divideBy100],
        ],
    },
};
module.exports = definition;