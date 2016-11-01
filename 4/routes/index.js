"use strict";
var express = require('express');
var path = require ("path");
var router = express.Router();

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
