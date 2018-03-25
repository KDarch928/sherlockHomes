var express = require("express");

var home = require("../models/homesModel");

var router = express.Router();

//create all routes

router.get("/", function (req, res) {
    res.render("index");
});

//post route to check if the user exists and if so allow user to login
router.post("/login", function (req, res) {

    //check the database to check if the username exists
    home.checkifUrsExist(["email"],[
            req.body.username],
        function(result) {

            //if the user exist, then query the database. else redirect them to the sign up page
            if (result[0].total === 1){

                //query the data and get users informaiton
                home.validateUsrPwd(["email"],[
                        req.body.username],
                    function(result) {

                        //if the username and pwd provide equal the same informin the database, then redirect them to the admin page
                        //else redirect them back to the login page
                        if (req.body.username === result[0].email && req.body.pwd === result[0].pwd) {
                            console.log("I'm being redirected to the admin page")
                            var name = result[0].firt_name + " " + result[0].last_name;
                            res.redirect("/admin/" + name);
                        } else {
                            console.log("Wrong password");
                            res.redirect("/login");
                        }
                    });
            } else {
                console.log("I made it to sign up page");
                res.redirect("/signup");
            }
        });

});

router.get("/admin/:name", function (req, res) {
    var name = req.params.name;
    console.log(name);
    res.render("admin")
});



//Export routes for homesServer.js to use
module.exports = router;