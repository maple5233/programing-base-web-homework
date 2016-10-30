let express = require ('express');
let path = require ('path');
let favicon = require ('serve-favicon');
let logger = require ('morgan');
let cookieParser = require ('cookie-parser');
let bodyParser = require ('body-parser');
let routes = require ('./routes/index');
let session = require ('express-session');
let flash = require ('express-flash');
let debug = require('debug')('4:server');
let app = express ();

// 配置mongoose
var mongoose = require ('./mongoose.js');
mongoose.db.on ('error', console.error.bind (console, '连接错误!'));
mongoose.db.once ('open', function () {
    debug('连接数据库成功!')
});
// var Comment = require ('./models/Comment');

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
// 基本路由
app.use ('/', routes);
// 404路由
app.use (function (req, res, next) {
    var err = new Error ('Not Found');
    err.status = 404;
    req.sendfile (path.resolve (__dirname, 'views/404.html'));
});

module.exports = app;
