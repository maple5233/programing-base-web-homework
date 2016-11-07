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

checkInSchema.statics = { //静态方法
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
    getDaysNotSign: function (id, cb) {
        let days = this.find({stuId:id})
        return days
            .exec(cb)
    }
};

let checkIn = mongoose.model ('CheckIn', checkInSchema);

checkIn.$routers = [
    { // 获取所有
        method: 'get',
        path: '/',
        router: (req, res) => {
            checkIn.fetch ((err, checkIns)=> {
                if (err) {
                    console.log (err);
                    res.status (200).json ({
                        code: '-1'
                    });
                }
                else {
                    res.status (200).json ({
                        code: '0',
                        msgs: checkIns
                    });
                }
            })
        }
    }
];

module.exports = checkIn;
