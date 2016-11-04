"use strict";
let express = require ('express');
let path = require ('path');
let favicon = require ('serve-favicon');
let logger = require ('morgan');
let cookieParser = require ('cookie-parser');
let bodyParser = require ('body-parser');
let session = require ('express-session');
let flash = require ('express-flash');
let debug = require ('debug') ('4:server');
let sha1 = require('./public/javascripts/libs/sha1');
let app = express ();

// 配置mongoose
let mongoose = require ('./mongoose.js');
// let connection = mongoose.connection
mongoose.db.on ('error', () => {
    debug ('连接数据库未成功!');
    console.error.bind (console, '连接错误!');
});
mongoose.db.once ('open', function () {
    debug ('连接数据库成功!')
});

let CheckIn = require ('./Models/CheckIn');
let ClassMoney = require ('./Models/ClassMoney');
let GoodStudent = require ('./Models/GoodStudent');
let Meetings = require ('./Models/Meeting');
let Role = require ('./Models/Role');
let User = require ('./Models/User');

// 配置解析url json
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));
app.use (cookieParser ());
// 配置session
app.use (session ({
    secret: 'hjy-2014150120',
    cookie: {
        maxAge: 6000000
    },
    resave: true,
    saveUninitialized: true
}));
// 开启express消息提示
app.use (flash ());
// 配置icon
app.use (favicon (__dirname + '/public/images/vue_64px.png'));
// 配置静态文件
app.use (logger ('dev'));
app.use (express.static (path.join (__dirname, 'public')));

/* 基本登录路由 */

/**
 * 管理员界面不需要登录
 */
app.get ('/manager', function (req, res) {
    res.sendFile (path.resolve (__dirname, 'views/manager.html'))
});
/**
 * 管理员验证
 */
app.post ('/manager', function (req, res) {
    let pass = req.body.pass;
    if (sha1.hex_sha1(pass) == sha1.hex_sha1('maple')) {
        req.session.manager = 'manager';
        res.status (200).json ({
            code: '0'
        }).end ();
    } else {
        res.status (200).json ({
            code: '1001A'
        }).end ();
    }
});
/**
 * 检查session,确定是否已经登录
 */
app.get('/', function(req, res, next) {
    if (req.session.authorId) {
        res.redirect ('/user/' + req.session.authorId);
    }
    res.sendFile (path.resolve (__dirname, './views/index.html'));
});
/**
 * 注册路由
 */
app.post ('/register', function (req, res) {
    let newUser = req.body;
    let unMatches = false;
    User.fetchOne (newUser.registerName, function (err, theUser) {
        if (err) {
            console.log (err);
            res.status (500).json ({
                code: '-1'
            }).end ();
            return
        }
        unMatches = (theUser === {});
        if (unMatches) {
            var userModel = new User ({
                userName: newUser.registerName,
                userPass: newUser.registerPass,
            });
            userModel.save (function (err) {
                if (err) console.log (err);
            });
            res.status (200).json ({
                code: '0'
            }).end ();
        } else {
            res.status (200).json ({
                code: '1001A',
                message: '登录名已存在'
            }).end ();
        }
    })
});
/**
 *  验证是否登录
 */
app.all ('*', function (req, res, next) {
    if (req.session.authorId) {
        next ();
    } else {
        res.redirect ('/');
    }
});

app.get('/user/*', function(req, res, next) {
    res.sendFile (path.resolve (__dirname, './views/user.html'));
});

app.get('/manager',function (req,res,next) {
    res.sendfile(path.resolve(__dirname,'./views/manager.html'));
});

// Model路由
[ CheckIn, ClassMoney, GoodStudent, Meetings, Role, User ].forEach (item => {
    item.$routers.forEach (router => {
        app[ router.method ] (router.path, router.router)
    })
});
// 404路由
app.use (function (req, res) {
    res.sendFile (path.resolve (__dirname, 'views/404.html'));
});

module.exports = app;
