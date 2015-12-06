/**
* Menu.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    text : { type : 'string'},
    heading : {type : 'boolean'},
    translate : {type : 'string'},
    sref : {type : 'string'},
    icon : {type : 'string'},
    label : {type : 'string'},
    alert : {type : 'string'},
    submenu : {
      collection : 'menu',
      via : 'parentmenu'
    },
    parentmenu : { model : 'menu'}
  }
};

