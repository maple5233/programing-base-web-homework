/**
 * 用户表user
 * Created by hongjiyao_2014150120 on 16-10-30.
 */

'use strict';
let mongoose = require ('../mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require ('mongoose-auto-increment');
autoIncrement.initialize (mongoose);
let RoleSchema = require ('./Role').RoleSchema;

let UserSchema = new mongoose.Schema ({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'AuthorId',
        index: true
    }, // 用户的学号，系统自动分配
    userName: {
        type: String,
        required: true
    }, // 用户注册的时候的登录名
    userClass: {
        type: String,
        required: true
    }, // 所在班级的ID
    userPass: {
        type: String,
        required: true
    },// 加密后用户的密码
    // roleId: {
    //     type: Number,
    //     ref: 'RoleId', // 参照完整性约束
    //     required: true
    // } // 外键 需要[参照完整性约束]
}, {strict: false});

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
    },
    fetchOne: function (name, cb) { // 查找有无同名
        return this
            .findOne ({userName: name})
            .exec (cb)
    }
};

UserSchema.plugin (autoIncrement.plugin, {model:'User',field:'authorId'});
UserSchema.plugin (autoIncrement.plugin, 'User');
RoleSchema.plugin (autoIncrement.plugin, 'Role');

let User = mongoose.model ('User', UserSchema);

User.$routers = [
    { // 获取所有
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
                        msgs: users
                    });
                }
            })
        }
    }
];

module.exports = User;