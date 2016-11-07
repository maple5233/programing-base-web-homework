/**
 * 评优帖
 * Created by hongjiyao_2014150120 on 16-10-31.
 */
'use strict';
let mongoose = require ('../mongoose');
let goodStudentSchema = new mongoose.Schema ({
    classId: {
        type: String,
        required: true,
        index: true
    }, // 班级ID
    title: {
        type: String,
        required: true
    }, // 奖项名称
    stuId: {
        type: Number,
        required: true
    }, // 获奖人
    bond: {
        type: Number,
        required: true
    },// 奖金数额
    authorId: {
        type: Number,
        required: true
    } // 发帖人ID
}, {strict: true});

goodStudentSchema.statics = { //静态方法
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
    fetchByClassId: function (id, cb) {
        return this
            .find ({
                classId: id
            })
            .exec (cb)
    }
};

let goodStudent = mongoose.model('GoodStudent',goodStudentSchema);

goodStudent.$routers = [
    { // 获取某班级所有
        method: 'get',
        path: '/goodStudent',
        router: async (req, res) => {
            let classId = req.query.classId;
            let posts;
            try {
                posts = await goodStudent.fetchByClassId (classId);
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
    },
    {
        method: 'post',
        path: '/goodStudent',
        router: async (req, res) => {
            let aGoodStudent = req.body.goodStudent;
            try {
                let newGoodStudent = new goodStudent (aGoodStudent);
                await newGoodStudent.save ();
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

module.exports = goodStudent