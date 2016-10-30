/**
 * 用户表user
 * Created by hongjiyao_2014150120 on 16-10-30.
 */

'use strict';
var mongoose = require ('../mongoose');

var UserSchema = new mongoose.Schema ({

}, {strict: true}); // 开启严格模式，不允许不同数据结构存入

UserSchema.statics = { //静态方法
    fetch: function (cb) { // 取出所有数据
        return this
            .find ({})
            .exec (cb);
    },
    fetchById: function (id, cb) { //根据_id找数据
        return this
            .findById (id)
            .exec (cb);
    }
};

var User = mongoose.model ('User', UserSchema);

User.$routers = [
    { // 获取所有留言
        method: 'get',
        path: '/',
        router: (req, res) => {
            User.fetch ((err, users)=> {
                if (err) {
                    console.log (err);
                    res.status (200).json ({
                        code: '-1'
                    });
                }
                else {
                    res.status (200).json ({
                        code: '0',
                        msgs: users.reverse () // 反转数组 让新的在最前面
                    });
                }
            })
        }
    }
];

module.exports = User;