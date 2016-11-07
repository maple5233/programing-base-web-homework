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
    },
    fetchByClassId: function (id, cb) {
        return this
            .find ({
                classId: id
            })
            .exec (cb)
    }
};

let checkIn = mongoose.model ('CheckIn', checkInSchema);

checkIn.$routers = [
    { // 获取某班级所有
        method: 'get',
        path: '/checkIn',
        router: async (req, res) => {
            let classId = req.query.classId;
            let posts;
            try {
                posts = await checkIn.fetchByClassId (classId);
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
        path: '/checkIn',
        router: async (req, res) => {
            let aCheckIn = req.body.checkIn;
            try {
                let newCheckIn = new checkIn (aCheckIn);
                await newCheckIn.save ();
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

module.exports = checkIn;
