/**
 * Created by nicholase on 16/07/16.
 */
module.exports = function mySentryHook(sails) {
    return {

        // Runs automatically when the hook initializes
        initialize: function (cb) {
            sails.log('debug','[Sentry:initialize] Start init hook');
            var raven = require('raven');
            var client = new raven.Client(process.env.SENTRY_URL);
            client.patchGlobal();

            //test

            sails.log('debug','[Sentry:initialize] finished start hook');
            return cb();
        }
    }
}
