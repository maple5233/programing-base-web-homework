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

let goodStudent = mongoose.model('GoodStudent',goodStudentSchema);

module.exports = goodStudent