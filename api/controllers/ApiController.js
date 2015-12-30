/**
 * ApiController
 *
 * @description :: Server-side logic for managing Apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var sugar = require('sugar');
var async = require('async');
var RandomColor = require('just.randomcolor');

module.exports = {
    accountLogin : function(req, res){
        passport.authenticate('local', function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.send({});
            }
            req.logIn(user, function(err) {
                if (err) return res.send({});
                return res.send({account : user});
            });
        })(req, res);

    },

    sensorsIndex : function(req, res){
        Sensor.find().sort({internalid : 'desc'}).exec(function(err, sensors){
            if(err) sails.log('error', 'err : ', err);
            //sails.log('debug','Sensors: ', sensors);
            return res.send(sensors);
        })
    },
    readingsIndex : function(req, res){
        var limit = req.param('limit');
        Reading.find().sort({createdAt:'desc'}).limit(limit).exec(function(err, readings){
            if(err) sails.log('error', 'err : ', err);
            //sails.log('debug','Sensors: ', sensors);
            return res.send(readings);
        })
    },
    latestReadings : function(req, res){
        Sensor.find({deviceTypeString : {'!' : 'S_LIGHT'}}).sort({internalid : 'desc'}).exec(function(err, sensors){
            var sensorReadings = [];

            var processSensor = function(sensor, cb){
                Reading.findOne({internalId : sensor.internalid}).sort({createdAt : 'desc'}).exec(function(err, reading){
                    if(reading == null) return cb();
                    sensorReadings.push(reading);
                    cb();
                });
            };

            async.each(sensors, processSensor, function(err){
                return res.send(sensorReadings);
            })

        });
    },
    getSensorReadingsHourly : function(req, res){
        var deviceId = req.param('deviceid');
        Sensor.find({deviceid : parseInt(deviceId)}).exec(function(err, devices){
            var readingsPerSensorType =[];
            var daysBack = Date.create('1 day ago');
            var getReadings = function(reading, cb){
                Reading.native(function(err, collection){
                    collection.aggregate([
                        {
                            $match : {
                                internalId : reading.internalid,
                                createdAt : {
                                    "$gte" : daysBack
                                }
                            }
                        },
                        {
                            "$project": {
                                "y": {"$year": "$createdAt"},
                                "m": {"$month": "$createdAt"},
                                "d": {"$dayOfMonth": "$createdAt"},
                                "h":{"$hour":"$createdAt"},
                                "tweet": 1,
                                "type": "$deviceTypeString",
                                "val": ("$value"),
                                "created_at": "$createdAt",
                                "sensorid": "$sensorId",
                                "deviceid": "$deviceId"
                            }
                        },
                        {
                            "$group": {
                                "_id": {"year": "$y", "month": "$m", "day": "$d","hour":"$h", "type": "$type"},
                                "value": {"$avg": "$val"},
                                "aantal": {"$sum": 1},
                                "sensorid": {"$first": "$sensorid"},
                                "childid": {"$first": "$deviceid"},
                                "type": {"$first": "$type"}
                            }
                        },
                        {
                            $sort : {
                                "_id.year" : 1,
                                "_id.month" : 1,
                                "_id.day" : 1,
                                "_id.hour" : 1
                            }
                        }
                    ],function (err, result) {
                        //  sails.log('debug','result : ', result);
                        //return cb(err, result);
                        var r = {
                            label : "reading " + reading.internalid,
                            color : "#" + new RandomColor().toHex().value,
                            //sensor : reading,
                            data : []
                        };

                        r.data = result.map(function(m){
                            //console.log('ma = ', m._id.year);
                            var datum = new Date(m._id.year, m._id.month - 1, m._id.day, m._id.hour).getTime();
                            //console.log('datum = ', datum);
                            var data = [];
                            data.push(datum);
                            //DEBUG
                            // data.push(new Date(m._id.year, m._id.month - 1, m._id.day)),
                            data.push(m.value);
                            return data;
                        });
                        r.data.reverse();
                        if(result != null && result.length > 0)
                            readingsPerSensorType.push(r);
                        return cb();
                    })
                })
            };
            async.each(devices, function(reading, cb){
                getReadings(reading, cb);
            },function(){
                return res.send(readingsPerSensorType);
            })
        })
    },
    getSensorReadings : function(req, res){
        var deviceid = req.param('deviceid');
        var limit = req.param('limit');
        if(typeof(limit) == "undefined" || limit == null) limit= 10;
      //  limit = 100;
        Sensor.find({deviceid : parseInt(deviceid)}).exec(function(err, devices){
            //sails.log('debug','Found devicces : ', devices);
            var readingsPerSensorType = [];
            var daysBack = Date.create('7 days ago');
            var getReadings = function(reading, limit, cb){
                Reading.native(function(err, collection){
                    collection.aggregate([
                        {
                            $match : {
                                internalId : reading.internalid,
                                createdAt : {
                                    "$gte" : daysBack
                                }
                            }
                        },
                        {
                            "$project": {
                                "y": {"$year": "$createdAt"},
                                "m": {"$month": "$createdAt"},
                                "d": {"$dayOfMonth": "$createdAt"},
                                //"h":{"$hour":"$createdAt"},
                                "tweet": 1,
                                "type": "$deviceTypeString",
                                "val": ("$value"),
                                "created_at": "$createdAt",
                                "sensorid": "$sensorId",
                                "deviceid": "$deviceId"
                            }
                        },
                        {
                            "$group": {
                                "_id": {"year": "$y", "month": "$m", "day": "$d", "type": "$type"},
                                "value": {"$avg": "$val"},
                                "aantal": {"$sum": 1},
                                "sensorid": {"$first": "$sensorid"},
                                "childid": {"$first": "$deviceid"},
                                "type": {"$first": "$type"}
                            }
                        },
                        {
                            $sort : {
                                "_id.year" : 1,
                                "_id.month" : 1,
                                "_id.day" : 1
                            }
                        }

                    ],function (err, result) {
                      //  sails.log('debug','result : ', result);
                        //return cb(err, result);
                        var r = {
                            label : "reading " + reading.internalid,
                            color : "#" + new RandomColor().toHex().value,
                            //sensor : reading,
                            data : []
                        };

                        r.data = result.map(function(m){
                            //console.log('ma = ', m._id.year);
                            var datum = new Date(m._id.year, m._id.month - 1, m._id.day).getTime();
                            //console.log('datum = ', datum);
                            var data = [];
                            data.push(datum);
                            //DEBUG
                           // data.push(new Date(m._id.year, m._id.month - 1, m._id.day)),
                            data.push(m.value);
                            return data;
                        });
                        r.data.reverse();
                        if(result != null && result.length > 0)
                            readingsPerSensorType.push(r);
                        return cb();
                    })
                })

            };

            async.each(devices, function(reading, cb){
                //sails.log('debug','Getting readings :');
                    getReadings(reading, limit, cb);
                }
                , function(){
                    return res.send(readingsPerSensorType);
                }
            );
        })
    },
    getSwitches : function(req, res){
        SwitchSensor.find().exec(function(err, devices){
            if(err) sails.log('error','Error getting switched : ', err);
            return res.send(devices);
        })
    },
    toggleSwitch : function(req, res){
        var id = req.param('id');
        Sensor.findOne({id : id}).exec(function(err, sensor){
            sails.log('debug','toggle switch : ', sensor);
            MySensorService.toggleSwitch(sensor, function(){
                return res.send({success : true});
            });


        });
    },

    //retrieve sensors for view in datatable
    getSettingsIndex : function(req, res){
        Sensor.find().exec(function(err, sensors){
            if(err) sails.log('error','Error retrieveing sensors : ', err);
            return res.send(sensors);
        });
    }
};

