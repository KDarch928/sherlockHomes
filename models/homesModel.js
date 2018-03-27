//import the orm
var orm = require("../config/orm.js");

var home = {
    selectAllListing: function (cb) {
        orm.selectAll("", function (res) {
            cb(res);
        });
    },
    checkifUrsExist: function (cols, vals, cb) {
        orm.checkifUrsExist("realtor_list", cols, vals, function (res) {
            cb(res);
        });
        // orm.checkingUsr("mail_listing", cols, vals, function (res){
        //     cb(res);
        // });
    },
    validateUsrPwd: function (cols, vals, cb) {
        orm.validateUsr("realtor_list", cols, vals, function (res){
            cb(res);
        });
    }
    // selectMailListing: function (cb) {
    //     orm.selectAll("mail_listing", function (res) {
    //         cb(res)
    //     });
    // },
    // insertNewUser: function (cols, vals, cb) {
    //     orm.insert("", cols, vals, function (res) {
    //         cb(res);
    //     });
    // },
    // insertNewListing: function (cols, vals, cb) {
    //     orm.insert("", cols, vals, function (res) {
    //         cb(res);
    //     });
    // },
    // updateListing: function (objColVals, condition, cb) {
    //     orm.update("", objColVals, condition, function (res) {
    //         cb(res);
    //     });
    // },
    // updateUser: function (objColVals, condition, cb) {
    //     orm.update("", objColVals, condition, function (res) {
    //         cb(res)
    //     });
    // }
};

//Export the database funciton form the controller (homesController.js)
module.exports = home;