/**
 * MenuController
 *
 * @description :: Server-side logic for managing Menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var sugar = require('sugar');

module.exports = {
    index : function(req, res){

        var createMenuItems = function(cb){
            var items = [];
            var root = {
                "text": "Main Navigation",
                "heading": "true",
                "translate": "sidebar.heading.HEADER"
            }

            var level1  = {
                "text" : "Dashboard",
                "sref" : "app.sensordashboard",
                "icon" : "icon-speedometer",
                "label" : "label label-success"
            };
            var settings = {
                "text" : "Settings",
                "sref" : "app.sensorsettings",
                "icon" : "fa fa-cogs",
                "label" : "label label-success"
            }

            Menu.create(root).exec(function(err, menuItem){
                items.push(root);
                Menu.create(level1).exec(function(err, menuItem){
                    items.push(menuItem);
                    Menu.create(settings).exec(function(err, menuItem){
                        items.push(settings);
                        cb(items);
                    })

                })
            })
        }

        Menu.find().exec(function(err, menuItems) {
                if (menuItems == null || menuItems.length == 0) {
                    createMenuItems(function (createdMenuItems) {
                        return res.send(createdMenuItems);
                    })
                } else {

                    var sensorMenu = {
                        "text" : "Sensors",
                        "sref" : "#",
                        "icon" : "icon-compass",
                        "submenu" : []
                    };
                    Sensor.find().exec(function(err, sensors){
                        sensors = sensors.unique('deviceid');
                      //  sails.log('debug','Found devices : ', sensors);
                        sensors.forEach(function(n){
                            sensorMenu.submenu.push({
                                "text" : "Device " + n.internalid,
                                "sref" : "app.sensor",
                                "params" : {
                                    id : n.deviceid
                                }
                            });
                        });
                        menuItems.push(sensorMenu);
                        return res.send(menuItems);
                    });


                }
            }
        );
    }
};

