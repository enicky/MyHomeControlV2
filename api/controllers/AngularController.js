/**
 * AngularController
 *
 * @description :: Server-side logic for managing Angulars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var sugar = require('sugar');
var async = require('async');
var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;


module.exports = {
    getDashboardSensors : function(req, res){
        var sensorsToReturn = [];
        Sensor.find({sort : 'internalid'}).exec(function(err, sensors){
            async.each(sensors, function(sensor, cb){
                sails.log.info('[AngularController:getDashboardSensors] get reading for : ', sensor.internalid);
                sails.log.info('[AngularController:getDashboardSensors] get reading for : ', sensor.sensorId, sensor.deviceId);
                Reading.find({
                    where: {internalId: sensor.internalid},
                    sort: 'createdAt DESC',
                    limit : 1
                }).exec(function(err, reading){
                    sails.log.info("[AngularController:getDashboardSensors] reading : ", reading);
                    sensor.lastReading = reading && reading.length > 0 ? reading[0].value : -1;
                    sensor.lastReadingDate = reading && reading.length > 0 ? reading[0].createdAt : 0;
                    sensorsToReturn.push(sensor);
                    sails.log.info("[AngularController:getDashboardSensors] sensorsToReturn length : ", sensorsToReturn.length);
                    return cb();
                })
            }, function(err){
                sails.log.info("[AngularController:getDasboardSensors] sensorsToReturn : ", sensorsToReturn);
                return res.json(sensorsToReturn);
            })
        })
    },
    toggleSwitch : function(req, res){
        var id = req.param('id');
        sails.log.info('request passed "' +   id + '" as param ... id ');

        var o_id = new ObjectID(req.param('id'));
        Sensor.findOne({id : o_id}).exec(function(err, sensor){
            sails.log('debug','toggle switch : ', sensor);
            MySensorService.toggleSwitch(sensor, function(){
                return res.send({success : true});
            });


        });
    }
};

