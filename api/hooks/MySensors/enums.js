/**
 * Created by NicholasE on 3/06/2014.
 */

var Enum = require('enum');

function MySensorEnums() {}
MySensorEnums.prototype.SensorCommand = new Enum({
    C_PRESENTATION: 0,
    C_SET: 1,
    C_REQ: 2,
    C_INTERNAL: 3,
    C_STREAM: 4
});

MySensorEnums.prototype.SensorSensor = new Enum({
    S_DOOR: 0,
    S_MOTION: 1,
    S_SMOKE: 2, // Smoke sensor
    S_LIGHT: 3, // Light Actuator (on/off)
    S_DIMMER: 4, // Dimmable device of some kind
    S_COVER: 5, // Window covers or shades
    S_TEMP: 6, // Temperature sensor
    S_HUM: 7, // Humidity sensor
    S_BARO: 8, // Barometer sensor (Pressure)
    S_WIND: 9, // Wind sensor
    S_RAIN: 10, // Rain sensor
    S_UV: 11, // UV sensor
    S_WEIGHT: 12, // Weight sensor for scales etc.
    S_POWER: 13, // Power measuring device, like power meters
    S_HEATER: 14, // Heater device
    S_DISTANCE: 15, // Distance sensor
    S_LIGHT_LEVEL: 16, // Light sensor
    S_ARDUINO_NODE: 17, // Arduino node device
    S_ARDUINO_REPEATER_NODE: 18, // Arduino relaying node device
    S_LOCK: 19, // Lock device
    S_IR: 20, // Ir sender/receiver device
    S_WATER: 21, // Water meter
    S_AIR_QUALITY: 22,
    S_CUSTOM: 23,
    S_DUST: 24,
    S_SCENE_CONTROLLER: 25
});

MySensorEnums.prototype.SensorData = new Enum({
    V_TEMP: 0, // Temperature
    V_HUM: 1, // Humidity
    V_LIGHT: 2, // Light status. 0:off 1:on
    V_DIMMER: 3, // Dimmer value. 0-100%
    V_PRESSURE: 4, // Atmospheric Pressure
    V_FORECAST: 5, // Whether forecast. One of "stable", "sunny", "cloudy", "unstable", "thunderstorm" or "unknown"
    V_RAIN: 6, // Amount of rain
    V_RAINRATE: 7, // Rate of rain
    V_WIND: 8, // Windspeed
    V_GUST: 9, // Gust
    V_DIRECTION: 10, // Wind direction
    V_UV: 11, // UV light level
    V_WEIGHT: 12, // Weight (for scales etc)
    V_DISTANCE: 13, // Distance
    V_IMPEDANCE: 14, // Impedance value
    V_ARMED: 15, // Armed status of a security sensor. 1:Armed, 0:Bypassed
    V_TRIPPED: 16, // Tripped status of a security sensor. 1:Tripped, 0:Untripped
    V_WATT: 17, // Watt value for power meters
    V_KWH: 18, // Accumulated number of KWH for a power meter
    V_SCENE_ON: 19, // Turn on a scene
    V_SCENE_OFF: 20, // Turn of a scene
    V_HEATER: 21, // Mode of header. One of "Off", "HeatOn", "CoolOn", or "AutoChangeOver"
    V_HEATER_SW: 22, // Heater switch power. 1:On, 0:Off
    V_LIGHT_LEVEL: 23, // Light level. 0-100%
    V_VAR1: 24, // Custom value
    V_VAR2: 25, // Custom value
    V_VAR3: 26, // Custom value
    V_VAR4: 27, // Custom value
    V_VAR5: 28, // Custom value
    V_UP: 29, // Window covering. Up.
    V_DOWN: 30, // Window covering. Down.
    V_STOP: 31, // Window covering. Stop.
    V_IR_SEND: 32, // Send out an IR-command
    V_IR_RECEIVE: 33, // This message contains a received IR-command
    V_FLOW: 34, // Flow of water (in meter)
    V_VOLUME: 35, // Water volume
    V_LOCK_STATUS: 36, // Set or get lock status. 1:Locked, 0=Unlocked },
    V_DUST_LEVEL: 37,
    V_VOLTAGE: 38,
    V_CURRENT: 39
});

MySensorEnums.prototype.SensorInternal = new Enum({
    I_BATTERY_LEVEL: 0,
    I_TIME: 1,
    I_VERSION: 2,
    I_ID_REQUEST: 3,
    I_ID_RESPONSE: 4,
    I_INCLUSION_MODE: 5,
    I_CONFIG: 6,
    I_FIND_PARENT: 7,
    I_FIND_PARENT_RESPONSE: 8,
    I_LOG_MESSAGE: 9,
    I_CHILDREN: 10,
    I_SKETCH_NAME: 11,
    I_SKETCH_VERSION: 12,
    I_REBOOT: 13,
    I_GATEWAY_READY: 14
});

MySensorEnums.prototype.SensorStream = new Enum({
    ST_FIRMWARE_CONFIG_REQUEST: 0,
    ST_FIRMWARE_CONFIG_RESPONSE: 1,
    ST_FIRMWARE_REQUEST: 2,
    ST_FIRMWARE_RESPONSE: 3,
    ST_SOUND: 4,
    ST_IMAGE: 5
})

MySensorEnums.prototype.SensorPayload = new Enum({
    P_STRING: 0,
    P_BYTE: 1,
    P_INT16: 2,
    P_UINT16: 3,
    P_LONG32: 4,
    P_ULONG32: 5,
    P_CUSTOM: 6,
    P_FLOAT32: 7
})

module.exports = MySensorEnums;
