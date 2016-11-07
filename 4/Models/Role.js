/**
 * 角色表
 * Created by hongjiyao_2014150120 on 16-10-30.
 */
'use strict';
let mongoose = require ('../mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require ('mongoose-auto-increment');
autoIncrement.initialize (mongoose);

let RoleSchema = new mongoose.Schema ({
    roleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'RoleId',
        index: true
    }, // 流水号，系统自动分配
    roleName: {
        type: String,
        required: true
    }, // 职位名字
    roleRights: {
        type: [ String ],
        required: true
    }, // 角色权限
    parentRoleId: {
        type: String,
        required: true
    } // 父角色
}, {strict: true}); // 开启严格模式，不允许不同数据结构存入

RoleSchema.statics = { //静态方法
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

RoleSchema.plugin (autoIncrement.plugin, 'Role');
RoleSchema.plugin (autoIncrement.plugin, {model:'Role',field:'roleId'});
let Role = mongoose.model ('Role', RoleSchema);

Role.$routers = [
    { // 获取所有
        method: 'get',
        path: '/',
        router: (req, res) => {
            Role.fetch ((err, roles)=> {
                if (err) {
                    console.log (err);
                    res.status (200).json ({
                        code: '-1'
                    });
                }
                else {
                    res.status (200).json ({
                        code: '0',
                        msgs: roles
                    });
                }
            })
        }
    }
];

module.exports = Role;
module.exports.RoleSchema = RoleSchema;