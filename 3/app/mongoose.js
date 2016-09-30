/**
 * Created by hongjiyao_2014150120 on 16-9-29.
 */
var mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
module.exports.db = mongoose.connection;
module.exports = mongoose.createConnection ('mongodb://localhost/commentSys');
module.exports.Schema = mongoose.Schema;
