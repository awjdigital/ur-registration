var express = require('express');
var router = express.Router();
console.log(require('dotenv').config())

var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NotifyKey);

    exports.home_get = function (req, res) {

        res.redirect("/index");
     }