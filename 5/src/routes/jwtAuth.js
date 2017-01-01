/**
 * jwt验证路由
 * Created by hongjiyao_2014150120 on 17-1-1.
 */
'use strict';
const User = require('../models/User');
const jsonWrite = require('./utils/writeJson');
const jwt = require('jwt-simple');

module.exports = async function(req, res, next) {
    let token = (req.body && req.body.token) 
    || (req.query && req.query.token) || req.headers[ 'x-access-token' ];
    // console.log(req.body);
    // console.log(token)
    if(token) {
        try {
            let decoded = jwt.decode(token, "maple5233");
            // console.log(decoded)
            if(decoded.exp <= Date.now()) {
                jsonWrite(res, null, false, 200, 'token已经过期');
            }
            // 访问数据库取出用户信息
            let theUser = await User.fetchById(decoded.iss);
            if(theUser == null) {
                jsonWrite(res, null, false, 200, 'token无效');
            }
            next();
        } catch(err) {
            console.log('err:')
            console.log(err)
            jsonWrite(res, null, false, 200, err);
        }
    } else {
        // console.log(req.body)
        // console.log(req.query)
        jsonWrite(res, null, false, 200, '需要认证');
    }
};