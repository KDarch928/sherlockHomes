var express = require("express");

var home = require("../models/homesModel");

var router = express.Router();

//create all routes

router.get("/", function (req, res) {
    res.render("index");
});

//Export routes for homesServer.js to use
module.exports = router;