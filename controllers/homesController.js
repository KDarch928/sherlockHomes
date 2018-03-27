var express = require("express");

var home = require("../models/homesModel");

var router = express.Router();

var notifier = require('node-notifier');

//create all routes

//all get routes

//root route to sherlock homes main page
router.get("/", function (req, res) {
    res.render("index");
});

//landing page for realtors
router.get("/realtor/:name", function (req, res) {
    var name = req.params.name;
    console.log(name);
    res.render("realtor");
    notifier.notify("Successfully Logged In");
});

//sherlock homes admin page
router.get("/admin", function (req, res) {
    var name = req.params.name;
    console.log(name);
    notifier.notify("Successfully Logged In");
    res.render("admin");
    // notifier.notify("Successfully Logged In");
});

router.get("/login",function (req,res) {
    res.render("login");
});

router.get("/signup", function (req, res) {
    res.render("singup");
});

//all post routes

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
                        if (req.body.username === result[0].email && req.body.pwd === result[0].password) {

                            if(result[0].access_type === "admin"){

                                return res.status(200).send({result: "redirect", url: "/admin"});
                            } else {
                                var name = result[0].first_name + " " + result[0].last_name;
                                return res.status(200).send({result: "redirect", url: "/realtor/"+ name});
                                // res.send({redirect: "/realtor/" + name});
                            }
                            // var name = result[0].first_name + " " + result[0].last_name;
                            // res.redirect("/realtor/" + name);
                            // notifier.notify("Successfully Logged In");
                        } else {
                            notifier.notify("Wrong Password");
                            return res.status(200).send({result: "redirect", url: "/login"});
                            //notifier.notify("Wrong Password");


                        }
                    });
            } else {
                console.log("I made it to sign up page");
                // res.redirect("/signup");
                notifier.notify("You do not have an Account with Sherlock Homes! Please create an account");
                return res.status(200).send({result: "redirect", url: "/signup"});
                //notifier.notify("You do not have an Account with Sherlock Homes! Please create an account");
            }
        });

});

router.post("/signup", function (req, res) {

});



//Export routes for homesServer.js to use
module.exports = router;