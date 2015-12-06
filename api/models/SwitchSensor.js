/**
 * Created by enicky on 6/12/2015.
 */

module.exports = {
    adapter: 'someMongodbServer',
    attributes: {
        deviceId: {type: 'integer'},
        sensorId: { type: 'integer'},
        internalId : {type : 'string'},
        state : {type: 'boolean'}

    }
};

