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

module.exports = router;
