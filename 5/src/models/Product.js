/**
 * 产品模型
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
let mongoose = require('../config');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },  // 名称
    productDetails: {
        type: String,
        required: true
    },  // 描述
    productPrice: {
        type: Number,
        required: true
    },  // 价格
    productInventory: {
        type: Number,
        min: 0,
        default: 0
    }   // 库存
});

ProductSchema.statics = {
    fetchById: function(id, cb) {
        return this.findById(id)
                   .exec(cb);
    },
    fetch: function(json, cb) {
        return Product.find(json)
                      .sort({
                          '_id': -1
                      })
                      .exec(cb);
    }
};

let Product = mongoose.model('Product', ProductSchema);
module.exports = Product;