/**
 * Created by hongjiyao_2014150120 on 16-9-29.
 */
'use strict';
var mongoose = require ('../mongoose');

var CommentSchema = new mongoose.Schema ({
    userId: String, // 用户ID
    comment: String, // 留言内容
    date: String, // 留言创建时间
    headImgSrc: String, // 头像 此处随机选择
    updateDate: String // 留言更新时间
}, {strict: true}); // 开启严格模式，不允许不同数据结构存入 

CommentSchema.statics = { //静态方法
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

var Comment = mongoose.model ('Comment', CommentSchema);

Comment.$routers = [
    { // 获取所有留言
        method: 'get',
        path: '/comment',
        router: (req, res) => {
            Comment.fetch ((err, comments)=> {
                if (err) {
                    console.log (err);
                    res.status (200).json ({
                        code: '-1'
                    });
                }
                else {
                    res.status (200).json ({
                        code: '0',
                        msgs: comments.reverse () // 反转数组 让新的在最前面
                    });
                }
            })
        }
    },
    { // 更新留言
        method: 'put',
        path: '/comment',
        router: (req, res) => {
            var commentInfo = req.body.commentNew;
            var id = commentInfo._id;
            var date = new Date ();
            var month = date.getMonth () + 1;
            var dateString;
            if (month >= 10) {
                dateString = date.getFullYear () + '年' + month + '月' + date.getDate () + '日 ';
            } else {
                dateString = date.getFullYear () + '年0' + month + '月' + date.getDate () + '日 ';
            }
            if (date.getHours () >= 10) {
                dateString += date.getHours ();
            } else {
                dateString += '0' + date.getHours ();
            }
            if (date.getMinutes () >= 10) {
                dateString += ':' + date.getMinutes ();
            } else {
                dateString += ':0' + date.getMinutes ();
            }
            if (date.getSeconds () >= 10) {
                dateString += ':' + date.getSeconds ();
            } else {
                dateString += ':0' + date.getSeconds ();
            }
            Comment.fetchById (id, function (err, oldComment) {
                if (err) {
                    console.log (err);
                    res.status (200).json ({
                        code: '-1'
                    });
                } else {
                    oldComment.comment = commentInfo.comment;
                    oldComment.updateDate = dateString;
                    oldComment.save (err=> {
                        if (err) {
                            console.log (err);
                            res.status (200).json ({
                                code: '-2'
                            });
                        } else {
                            res.status (200).json ({
                                code: '0',
                                updateDate: dateString
                            });
                        }
                    });
                }
            })
        }
    },
    { //上传留言
        method: 'post',
        path: '/comment',
        router: (req, res) => {
            var commentInfo = req.body.commentNew;
            var date = new Date ();
            var month = date.getMonth () + 1;
            var dateString;
            if (month >= 10) {
                dateString = date.getFullYear () + '年' + month + '月' + date.getDate () + '日 ';
            } else {
                dateString = date.getFullYear () + '年0' + month + '月' + date.getDate () + '日 ';
            }
            if (date.getHours () >= 10) {
                dateString += date.getHours ();
            } else {
                dateString += '0' + date.getHours ();
            }
            if (date.getMinutes () >= 10) {
                dateString += ':' + date.getMinutes ();
            } else {
                dateString += ':0' + date.getMinutes ();
            }
            if (date.getSeconds () >= 10) {
                dateString += ':' + date.getSeconds ();
            } else {
                dateString += ':0' + date.getSeconds ();
            }
            var randHeadImgSrc = '/images/github_64px_' + (Math.random () > 0.5 ? 'black.png' : 'blue.png');
            var newComment = new Comment ({
                userId: commentInfo.userId,
                comment: commentInfo.comment,
                headImgSrc: randHeadImgSrc,
                date: dateString,
                updateDate: dateString
            });
            newComment.save (function (err) {
                if (err) console.log (err);
            });
            res.status (200).json ({
                code: '0'
            });
        }
    }
];

module.exports = Comment;
