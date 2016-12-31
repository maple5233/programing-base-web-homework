'use strict';
// 依赖
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('babel-core/register');
const app = express();
// 引入jwt模块
const jwt = require('jwt-simple');
// 数据库配置文件
const mongoose = require('mongoose');
const debug = require('debug')('4:server');
const config = require('./config');
// 连接数据库
config.db.on('error', () => {
    debug('连接数据库未成功!');
    console.error.bind(console, '连接错误!');
});
config.db.once('open', ()=> {
    console.log('连接数据库成功!');
    debug('连接数据库成功!')
});

/**
 * 引入各种REST路由文件
 */
const safeAPI = require('./routes/safeAPI');
const productAPI = require('./routes/productAPI');

// 配置解析器和静态资源
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client')));
// 配置icon
app.use(favicon(__dirname + '/client/src/assets/vue_64px.png'));

// 基本路由
app.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './client/index.html'));
});

/**
 * safe路由不用经过jwt
 */
safeAPI.$routers.forEach(router => {
    app[ router.method ]('/api' + router.path, router.router);
});

/**
 * jwt验证路由
 */
//let jwtAuth = require ('./routes/jwtAuth');

// jwt拦截restful请求
// app.all ('/api/*', [ bodyParser (), jwtAuth ]);

/**
 * restful路由
 */
//  restful路由
[ productAPI ].forEach(item => {
    item.$routers.forEach(router => {
        app[ router.method ]('/api' + router.path, router.router);
    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.end({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
