/**
 * 收班费帖
 * Created by hongjiyao_2014150120 on 16-10-31.
 */
'use strict';
let mongoose = require ('../mongoose');
let classMoneySchema = new mongoose.Schema ({
    classId: {
        type: String,
        required: true,
        index: true
    }, // 班级ID
    date: {
        type: Date,
        required: true
    }, // 截止时间
    payedMembers: {
        type: [ Number ],
        required: true
    }, // 已经缴费的人的ID
    howmuch: {
        type: Number,
        required: true
    }, // 多少钱
    unpayedMembers: {
        type: [ Number ],
        required: true
    }, // 尚未缴费的人的ID
    authorId: {
        type: Number,
        required: true
    } // 发帖人ID
}, {strict: true});

classMoneySchema.statics = { //静态方法
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
    getHowMuchSomeonePay: function (id, cb) { // 统计已交班费
        let moneyArr = this.$where ('this.payedMembers.indexOf (' + id + ') !== -1');
        return moneyArr
            .exec (cb)
    },
    getHowMuchSomeoneHasNotPay: function (id, cb) { // 统计未交班费
        let moneyArr = this.$where ('this.unpayedMembers.indexOf (' + id + ') !== -1');
        return moneyArr
            .exec (cb)
    },
    fetchByClassId: function (id, cb) {
        return this
            .find ({
                classId: id
            })
            .exec (cb)
    }
};

let classMoney = mongoose.model ('ClassMoney', classMoneySchema);

classMoney.$routers = [
    { // 获取某班级所有
        method: 'get',
        path: '/classMoney',
        router: async (req, res) => {
            let classId = req.query.classId;
            let posts;
            try {
                posts = await classMoney.fetchByClassId (classId);
                res.status (200).json ({
                    code: '0',
                    posts: posts
                });
            } catch (err) {
                console.log (err);
                res.status (500).json ({
                    code: '-1',
                    message: '数据库错误'
                }).end ();
            }
        }
    }, {
        method: 'post',
        path: '/classMoney',
        router: async (req, res) => {
            let aClassMoney = req.body.classMoney;
            try {
                let newClassMoney = new classMoney (aClassMoney);
                await newClassMoney.save ();
                res.status (200).json ({
                    code: '0'
                });
            } catch (err) {
                console.log (err);
                res.status (500).json ({
                    code: '-1',
                    message: '数据库错误'
                }).end ();
            }
        }
    }
];

module.exports = classMoney;
