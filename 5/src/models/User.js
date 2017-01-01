/**
 * 用户模型
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
"use strict";
let mongoose = require('../config');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    userPass: {
        type: String,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true,
        default: false
    }
});

UserSchema.statics = {
    fetchById: (id, cb) => {
        return User.findById(id)
                   .exec(cb);
    },
    fetch: (json, cb) => {
        return User.find(json)
                   .sort({
                       '_id': -1
                   })
                   .exec(cb);
    },
    fetchByName: (name, cb)=> {
        return User.findOne({
            userName: name
        }).exec(cb);
    }
};

let User = mongoose.model('User', UserSchema);
module.exports = User;