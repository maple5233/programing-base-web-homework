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
let sha1 = require ('./public/javascripts/libs/sha1');
let app = express ();

// 配置mongoose
let mongoose = require ('./mongoose.js');
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
    if (pass === sha1.hex_sha1 ('maple')) {
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
 * 管理员获取所有学生
 */
app.get ('/manager/students', async function (req, res) {
    if (req.session.manager === undefined) {
        res.status (200).json ({
            code: '2001A',
            message: '没通过验证'
        }).end ();
    } else {
        let students;
        try {
            students = await User.fetch ()
        } catch (err) {
            console.log (err);
            res.status (500).json ({
                code: '-1',
                message: '数据库错误'
            }).end ();
        }
        let send = [];
        students.forEach (async (item)=> {
            let rank;
            try {
                rank = await Role.fetchByRoleId (item.roleId);
            } catch (err) {
                console.log (err);
                res.status (500).json ({
                    code: '-1',
                    message: '数据库错误'
                }).end ();
            }
            send.push ({
                stuId: item.authorId,
                rank: rank.rank
            })
            res.status (200).json ({
                code: '0',
                students: send
            }).end ();
        })
    }
});
/**
 * 管理员修改学生权限
 */
app.put ('/manager/update', async function (req, res) {
    if (req.session.manager === undefined) {
        res.status (200).json ({
            code: '2001A',
            message: '没通过验证'
        }).end ();
    } else {
        let stuId = req.body.stuId
        let newRank = req.body.rank
        let theStudent = null
        let newRoleId = null
        try {
            theStudent = await User.fetchById (stuId)
            newRoleId = (await Role.fetchByRank (newRank)).roleId
        } catch (err) {
            if (err) console.log (err);
            res.status (500).json ({
                code: '-1',
                message: '数据库错误'
            }).end ();
        }
        theStudent.roleId = newRoleId
        // debug (theStudent)
        theStudent.save ((err) => {
            if(err) console.log (err)
        })
        res.status (200).json ({
            code: '0'
        }).end ();
    }
});
/**
 * 主页
 */
app.get ('/', function (req, res, next) {
    res.sendFile (path.resolve (__dirname, './views/index.html'));
});
/**
 * 注册路由
 */
app.post ('/register', async (req, res) => {
    let newUser = req.body;
    let unMatches;
    let theUser;
    try {
        theUser = await User.fetchOne (newUser.registerName);
    } catch (err) {
        console.log (err);
        res.status (500).json ({
            code: '-1',
            message: '数据库错误'
        }).end ();
    }
    unMatches = (theUser === null);
    if (unMatches) {
        let role;
        try {
            role = await Role.findOne ({roleName: "班级成员"});
        } catch (err) {
            console.log (err);
            res.status (500).json ({
                code: '-1',
                message: '数据库错误'
            }).end ();
        }

        var userModel = new User ({
            userName: newUser.registerName,
            userPass: newUser.registerPass,
            roleId: role.roleId, // 默认是普通的学生
            userClass: newUser.registerClass
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
});
/**
 * 登录路由
 */
app.post ('/login', async (req, res) => {
    // // 已经登录
    // if (req.session.authorId !== undefined)
    //     res.status (200).json ({code: '0',
    //     }).end ();

    let user = req.body;
    let theUsers;
    try {
        theUsers = await User.find ({userName: user.userName});
    } catch (err) {
        console.log (err);
        debug(3333);
        res.status (500).json ({
            code: '-1',
            message: '数据库错误'
        }).end ();
    }
    let unMatches = (theUsers.length === 0);
    if (unMatches) {
        res.status (200).json ({
            code: '1002A',
            message: '用户不存在'
        }).end ();
    } else if (theUsers[ 0 ].userPass === user.userPass) {
        req.session.authorId = theUsers[ 0 ].authorId;
        let rank;
        try {
            rank = await Role.findOne ({roleId: theUsers[ 0 ].roleId});
        } catch (err) {
            debug(2222);
            console.log (err);
            res.status (500).json ({
                code: '-1',
                message: '数据库错误'
            }).end ();
        }
        let howMuch = 0;
        let howMuchRemain = 0;
        let numOfDayNotSign = 0;
        let dayNotSign = [];
        try {
            let authorId = theUsers[ 0 ].authorId;
            let moneyArr = await ClassMoney.getHowMuchSomeonePay (authorId);
            moneyArr.forEach ((item)=> {
                howMuch += item.howmuch
            });
            moneyArr = await ClassMoney.getHowMuchSomeoneHasNotPay (authorId);
            moneyArr.forEach ((item)=> {
                howMuchRemain += item.howmuch
            });
            let dates = await CheckIn.getDaysNotSign (authorId);
            dates.forEach ((item)=> {
                dayNotSign.push (item.date)
            })
            numOfDayNotSign = dates.length;
        } catch (err) {
            console.log (err);
            debug(1111);
            res.status (500).json ({
                code: '-1',
                message: '数据库错误'
            }).end ();
        }
        debug(theUsers[0].authorId)
        res.status (200).json ({
            code: '0',
            user: {
                authorId: theUsers[ 0 ].authorId,
                rank: rank.rank,
                userClass: theUsers[ 0 ].userClass
            },
            statistics: {     // 统计数据
                howMuch: howMuch,   // 已经交了多少班费
                howMuchRemain: howMuchRemain,   // 还差多少要交
                numOfDayNotSign: numOfDayNotSign,   // 旷课总数
                dayNotSign: dayNotSign    // 旷课情况
            }
        }).end ();
    } else {
        res.status (200).json ({
            code: '1002B',
            message: '密码错误'
        }).end ();
    }
});
/**
 *  验证是否登录
 */
app.all ('*', function (req, res, next) {
    if (req.session.authorId !== null && req.session.authorId !== undefined) {
        // console.log (req.session.authorId)
        next ();
    } else {
        res.redirect ('/');
    }
});
/**
 * 登出
 */
app.get ('/logout', function (req, res) {
    if (req.session.authorId) {
        req.session.destroy ()
    }
    if (req.session.manager) {
        req.session.destroy ()
    }
    res.redirect ('/')
});

app.get ('/user/*', function (req, res, next) {
    res.sendFile (path.resolve (__dirname, './views/user.html'));
});

app.get ('/manager*', function (req, res, next) {
    res.sendfile (path.resolve (__dirname, './views/manager.html'));
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
