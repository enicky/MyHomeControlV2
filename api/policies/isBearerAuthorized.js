/**
 * Created by nicholase on 16/01/16.
 */
/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */


module.exports = function (req, res, next) {
    //sails.log('debug','[isAuthorized] => check for jwtToken');
    return jwToken.jwtCheck(req, res, next);

};
