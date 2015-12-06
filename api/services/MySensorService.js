/**
 * Created by enicky on 15/11/2015.
 */
var MySensorNode = require('../hooks/MySensors/mysensors');
var mySensorEnums = require('../hooks/MySensors/enums');
module.exports = {
    mySensorNode : null,
    enums : new mySensorEnums(),
    toggleState : 0,
    initializeMySensors: function(options, cb) {

        sails.log('debug','Starting the Process to poll for the serial port ... ');
        mySensorNode = new MySensorNode(sails);

        mySensorNode.on('sensor.reading', function(data){
            var newSensorValyue = {
                internalId : data.id,
                deviceId : parseInt(data.id.substring(0, data.id.indexOf('/'))),
                sensorId : parseInt(data.id.substring(data.id.indexOf('/') + 1)),
                value : parseFloat(data.value),
                type : data.typeInt,
                deviceTypeString : data.typeString
            };
            Reading.create(newSensorValyue, function(err, saved){
                if(err) sails.log('error','Error saving sensorValue', err);
           //     sails.log('debug','Blasting Sensor Reading ... ');
                sails.sockets.blast('sensor.reading', newSensorValyue);
            })
        });
        mySensorNode.on('device.add', function(data){
            sails.log('debug','device add ... ', data);
        });
        mySensorNode.on('sensor.add', function(data){
            sails.log('debug','sensor add : ', data);
        });
        if(sails.config.mysensorconfig.enabled){
            sails.log('debug','MySensors are enabled. Start Init');
            mySensorNode.init({debug : true, portname : sails.config.mysensorconfig.serialport});
            mySensorNode.openConnection(function(){
                mySensorNode.start();
                return cb();
            });
        }else{
            return cb();
        }
    },
    toggleSwitch : function(sensor, cb){
        var that = this;
        sails.log('debug','[MySensorService:toggleSwitch] Send status switch ... ', sensor, that.toggleState);
        mySensorNode.sendMessage(sensor.internalid, that.enums.SensorCommand.C_SET, that.enums.SensorData.V_LIGHT, that.toggleState.toString());
        that.toggleState = that.toggleState == 1 ? 0 : 1;
        return cb();
    },
    getSwitchStatus : function(sensor, cb){
        var that = this;
        sails.log('debug','Get status of switch for sensor : ', sensor);
        mySensorNode.sendMessage(sensor.internalid, that.enums.SensorCommand.C_REQ, that.enums.SensorData.V_Light, "0" );
        return cb();
    }
};