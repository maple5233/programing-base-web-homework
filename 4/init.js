const mongoose = require ('mongoose')
const Role = require ('./Models/Role')

Role.remove ({}).then (() => {
    new Role ({
        roleName: "班级成员", // 职位名字
        roleRights: [ "发表回复帖" ], // 角色
        parentRoleId: "课代表", // 父角色
        rank: 0
    }).save () // 0

    new Role ({
        roleName: "课代表", // 职位名字
        roleRights: [ "发表回复帖", "发布考勤结果帖", "评优等生帖" ], // 角色
        parentRoleId: "学习委员", // 父角色
        rank: 1
    }).save () // 1

    new Role ({
        roleName: "学习委员", // 职位名字
        roleRights: [ "发表回复帖", "发布考勤结果帖", "评优等生帖" ], // 角色
        parentRoleId: "团支书", // 父角色
        rank: 2
    }).save () // 2

    new Role ({
        roleName: "团支书", // 职位名字
        roleRights: [ "发表回复帖", "发布考勤结果帖", "评优等生帖", "收党费帖" ], // 角色
        parentRoleId: "班长", // 父角色
        rank: 3
    }).save () // 3

    new Role ({
        roleName: "班长", // 职位名字
        roleRights: [ "发表回复帖", "发布考勤结果帖", "评优等生帖", "收党费帖", "发布开班会帖" ], // 角色
        parentRoleId: "班长", // 父角色
        rank: 4
    }).save () // 4
    console.log ('ok')
})