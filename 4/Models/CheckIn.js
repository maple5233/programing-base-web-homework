/**
 * 考勤帖
 * Created by hongjiyao_2014150120 on 16-10-31.
 */
let mongoose = require ('../mongoose');
let checkInSchema = new mongoose.Schema ({
    classId: {
        type: String,
        required: true,
        index: true
    }, // 班级ID
    className: {
        type: String,
        required: true
    }, // 班级名称
    stuId: {
        type: Number,
        required: true
    }, // 旷课人ID
    date: {
        type: Date,
        required: true
    },// 旷课时间
    authorId: {
        type: Number,
        required: true
    } // 发帖人ID
}, {strict: true});

let checkIn = mongoose.model ('CheckIn', checkInSchema);
module.exports = checkIn;
