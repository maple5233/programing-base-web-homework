"use strict";
let express = require('express');
let path = require ("path");
let router = express.Router();
let CheckIn = require ('../Models/CheckIn');
let ClassMoney = require('../Models/ClassMoney');
let GoodStudent = require('../Models/GoodStudent');
let Meetings = require('../Models/Meeting');
let Role = require('../Models/Role');
let User = require('../Models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    // if (req.session.Id) {
    //     res.redirect ('/menu/' + req.session.Id);
    // }
    res.sendFile (path.resolve (__dirname, '../views/index.html'));
});

router.get('/user/*', function(req, res, next) {
    res.sendFile (path.resolve (__dirname, '../views/user.html'));
});

router.get('/manager',function (req,res,next) {
    res.sendfile(path.resolve(__dirname,'../views/manager.html'));
});

module.exports = router;
