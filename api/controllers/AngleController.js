/**
 * SailsController
 *
 * @description :: Server-side logic for managing Sails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function(req, res){
        return res.view();
    },

    login : function(req, res){
        return res.redirect('/angle/index#/page/login');
    }
};

