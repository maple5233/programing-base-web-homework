/**
 * 订单模型
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./User');
let Product = require('./Product');

let OrderSchema = new Schema({
    orderCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  // 下单者
    orderDetails: [ {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }, // 产品_id
        number: Number // 多少个
    } ], // 产品信息列表
    orderPrice: {
        type: Number,
        required: true
    },  // 总价格
    orderTime: {
        type: Date,
        required: true
    }
});

OrderSchema.statics = {
    fetchById: function(id, cb) {
        return this.findById(id)
                   .populate('orderCreator')
                   .populate('product')
                   .exec(cb);
    },
    fetch: function(json, cb) {
        return Order.find(json)
                    .sort({
                        '_id': -1
                    })
                    .populate('orderCreator')
                    .populate('product')
                    .exec(cb);
    }
};

let Order = mongoose.model('Order', OrderSchema);
module.exports = Order;