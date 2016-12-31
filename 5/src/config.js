/**
 * 用于连接数据库
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports.db = mongoose.connection;
module.exports = mongoose.createConnection('mongodb://localhost/MyTaoBao');
module.exports.Schema = mongoose.Schema;
