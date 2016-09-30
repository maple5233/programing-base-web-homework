var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require ('express-flash');

var app = express();

// 配置mongoose
var mongoose = require ('./mongoose.js');
mongoose.db.on ('error', console.error.bind (console, '连接错误:'));
mongoose.db.once ('open', function () {
    console.log ('连接数据库成功!')
});
var Comment = require ('./models/Comment');

// 设定静态文件目录，比如本地文件
app.use (express.static (__dirname + '/public'));
// 配置解析url json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 开启express消息提示
app.use (flash ());

/* routes start */
app.get ('/', function (req, res) {
    res.sendFile (path.resolve (__dirname, 'views/index.html'));
});
// 导入来自数据库的RESTFUL路由
[ Comment ].forEach (item => {
    item.$routers.forEach (router => {
        app[ router.method ] (router.path, router.router);
    })
});
app.get('*',function (req,res) {
    res.redirect('/');
});

// 设定port变量，意为访问端口
app.set ('port', process.env.PORT || 3000);

var server = app.listen (app.get ('port'), function () {
    console.log ("listening at port 3000...")
});

module.exports = app;
