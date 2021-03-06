/**
 * 班级会议表
 * Created by hongjiyao_2014150120 on 16-10-30.
 */
'use strict';
let mongoose = require ('../mongoose');

let MeetingSchema = new mongoose.Schema ({
    classId: {
        type: String,
        required: true,
        index: true
    }, // 班级ID
    date: {
        type: Date,
        required: true
    }, // 开会时间
    place: {
        type: String,
        required: true
    }, // 开会地点
    title: {
        type: String,
        required: true
    }, // 主题
    num: {
        type: Number,
        required: true
    }, // 应到人数
    gotten: {
        type: Number,
        required: true
    }, // 实到人数
    pAgree: {
        type: [ Number ],
        required: true
    }, // 同意的人的ID
    pDisagree: {
        type: [ Number ],
        required: true
    }, // 不同意的人的ID
    authorId: {
        type: Number,
        required: true
    } // 发帖人ID
}, {strict: true}); // 开启严格模式，不允许不同数据结构存入

MeetingSchema.statics = { //静态方法
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

let Meeting = mongoose.model ('Meeting', MeetingSchema);

Meeting.$routers = [
    { // 获取某班级所有
        method: 'get',
        path: '/meeting',
        router: async (req, res) => {
            let classId = req.query.classId;
            let posts;
            try {
                posts = await Meeting.fetchByClassId (classId);
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
    },{
        method: 'post',
        path: '/meeting',
        router: async (req, res) => {
            let meeting = req.body.meeting;
            try {
                let newMeeting = new Meeting(meeting);
                await newMeeting.save();
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

module.exports = Meeting;