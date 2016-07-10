/**
 * Reading.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        sensorId : {type : 'integer'},
        deviceId : {type : 'integer'},
        internalId : {type : 'string'},
        type : {type : 'integer'},
        deviceTypeString : {type : 'string'},
        value : {type : 'float'},
        sensor : {
            model : 'sensor'
        }
    },
    afterCreate : function(newlyInsertedRecord, cb){
        var Client = require('node-rest-client').Client;
        var restClient = new Client();
        var targetUrl = 'http://docker1.gitlab.be:8090/input/post.json?node=' + newlyInsertedRecord.sensorId+'&csv=' + newlyInsertedRecord ;
        restClient.get(targetUrl, function(data, response){
            sails.log.info('[Reading:afterCreate] => data : ', data);
            sails.log.info('[Reading:afterCreate] => response : ', response);

        })
    }
};

