/**
 * 用于连接数据库
 * Created by hongjiyao_2014150120 on 16-10-30.
 */
var mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
module.exports.db = mongoose.connection;
module.exports.connection = mongoose.createConnection ('mongodb://localhost/studentSyS');
module.exports.Schema = mongoose.Schema;