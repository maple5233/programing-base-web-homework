/**
 * 回复帖
 * Created by hongjiyao_2014150120 on 16-11-7.
 */
let mongoose = require ('../mongoose');
let ReplySchema = new mongoose.Schema ({
    classId: {
        type: String,
        required: true,
        index: true
    }, // 班级ID
    title: {
        type: String,
        required: true
    }, // 主题
    contant: {
        type: String,
        required: true
    }, // 回复内容
    authorId: {
        type: Number,
        required: true
    }, // 发帖人ID
    date: {
        type: Date,
        required: true
    }
}, {strict: true});

ReplySchema.statics = { //静态方法
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

let Reply = mongoose.model ('Reply', ReplySchema);

Reply.$routers = [
    { // 获取某班级所有
        method: 'get',
        path: '/Reply',
        router: async (req, res) => {
            let classId = req.query.classId;
            let posts;
            try {
                posts = await Reply.fetchByClassId (classId);
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
        path: '/Reply',
        router: async (req, res) => {
            let aReply = req.body.Reply;
            try {
                let newReply = new Reply (aReply);
                await newReply.save ();
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

module.exports = Reply