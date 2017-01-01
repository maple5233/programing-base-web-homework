/**
 * 初始化数据库
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
'use strict';
const debug = require('debug')('4:server');
const config = require('./config');
const sha1 = require('sha1');

const User = require('./models/User');
User.remove({}).then(() => {
    new User({
        userName: 'hjy',
        userBalance: 100000,
        userPass: sha1('123456'),
        isManager: false
    }).save();
    new User({
        userName: 'admin',
        userBalance: 999999,
        userPass: sha1('123456'),
        isManager: true
    }).save();
    console.log('ok');
});


