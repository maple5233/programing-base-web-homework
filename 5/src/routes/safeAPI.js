/**
 * 这些API不需要JWT保护
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
"use strict";
const User = require('../models/User');
const jsonWrite = require('./utils/writeJson');
const sha1 = require("sha1");
const jwt = require('jwt-simple');
const moment = require ('moment');

let safeAPI = {};

safeAPI.$routers = [
    {
        // 注册
        method: 'post',
        path: '/user',
        router: async(req, res) => {
            let param = req.body;
            let oldUser;
            try {
                oldUser = await User.fetchByName(param.userName);
                if(oldUser != null) {
                    jsonWrite(res, null, false, 200, "用户名被占用!");
                } else {
                    let newUser = await new User({
                        userName: param.userName,
                        userBalance: 0,
                        //userPass: sha1(param.userPass),
                        userPass: param.userPass,
                        isManager: false
                    }).save();
                    jsonWrite(res, newUser, true, 200, '注册成功');
                }
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    },
    {
        // 登录
        method: 'put',
        path: '/user',
        router: async(req, res) => {
            let param = req.body;
            let theUser;
            try {
                theUser = await User.fetchByName(param.userName);
                if(theUser == null) {
                    jsonWrite(res, null, false, 200, "没有这个用户!");
                } else {
                    if(theUser.userPass === param.userPass) {
                        // 用户登录后根据id生成token
                        let expires = moment ().add (7, 'days').valueOf ();
                        let token = jwt.encode ({
                            iss: theUser._id,
                            exp: expires
                        }, 'maple5233');
                        // 组织结果
                        let result = {
                            _id: theUser._id,
                            token: token,
                            userMoney: theUser.userBalance
                            //userOrder	:	[Order]
                        };
                        jsonWrite(res, result, true, 200, '登录成功');
                    } else {
                        jsonWrite(res, null, false, 200, '密码不对');
                    }
                }
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    }
];

module.exports = safeAPI;