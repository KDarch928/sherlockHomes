var express = require("express");
var request = require("request");

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
    // notifier.notify("Successfully Logged In");
    home.allBlogs(function (data) {
        var blogData = {
            blog: data
        }
        res.render("admin", blogData);
    });

    notifier.notify("Successfully Logged In");
});

router.get("/adminRouteData", function (req, res) {
    // notifier.notify("Successfully Logged In");
    home.allBlogs(function (data) {
        console.log(data);
        var hbsObject = {
            blogs: data
        };

    });

    notifier.notify("Successfully Logged In");
});

router.get("/login",function (req,res) {
    res.render("login");
});

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.get("/listings", function (req, res) {
    res.render("listing");
});

router.get("/blog", function (req, res) {
    home.allBlogs(function (data) {
        var blogData = {
            blog: data
        }
        res.render("blog", blogData);
    });
    //res.render("blog", blogData);
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

                                // return res.status(200).send({result: "redirect", url: "/admin"});
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

//post router on getting property API
router.post("/listings", function (req, res) {
    console.log(req.body);
    console.log("post route fired");

    var addr = req.body.addr;
    var apt = req.body.apt;
    var state = req.body.state;
    var city = req.body.city;
    var zipcode = req.body.zip;

    var baseURL = 'https://search.onboard-apis.com/propertyapi/v1.0.0/assessment/detail?postalcode=' + zipcode;

    //===============================================================================================================================================


    request({
        url: baseURL,
        method: "GET",
        headers: {
            apikey: "4b1160e947405c82fcd5633d6fa81929",
            accept: "application/json"
        }
    }, function (error, response, body) {
        // console.log(body);
        return res.send({result: "redirect", url: "/listings", data: body});
        //return res.status(200).send({result: "redirect", url: "/listings", data: body});

    });


});

router.post("/admin/newblog",function (req, res) {

    home.insertBlog(["title_header","title_descrip","created_at","blog_content"],
        [req.body.header, req.body.title, req.body.created_at, req.body.cont], function (result) {
            //res.end();
            res.status(200).end()
        });
});



//Export routes for homesServer.js to use
module.exports = router;
