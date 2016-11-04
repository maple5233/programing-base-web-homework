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
    }
};

let goodStudent = mongoose.model('GoodStudent',goodStudentSchema);

goodStudent.$routers = [
    { // 获取所有
        method: 'get',
        path: '/',
        router: (req, res) => {
            goodStudent.fetch ((err, goodStudents)=> {
                if (err) {
                    console.log (err);
                    res.status (200).json ({
                        code: '-1'
                    });
                }
                else {
                    res.status (200).json ({
                        code: '0',
                        msgs: goodStudents
                    });
                }
            })
        }
    }
];

module.exports = goodStudent