/**
 * order表对应API
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
"use strict";
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const jsonWrite = require('./utils/writeJson');

let OrderAPI = {};

OrderAPI.$routers = [
    {
        // 增加订单
        method: 'post',
        path: '/order',
        router: async(req, res) => {
            let order = req.body;
            //let order = req.query;
            let orderCreator = order.orderCreator;
            let orderDetails = order.orderDetails;
            let orderPrice = order.orderPrice;
            try {
                let theProduct;
                let user = await User.fetchById(orderCreator);
                if(user.userBalance < orderPrice) {
                    jsonWrite(res, null, false, 200, '余额不足，尴尬');
                } else {
                    // 更新User的余额和Product的库存
                    orderDetails.forEach(async (orderDetail, index) => {
                        let productId = orderDetail.product;
                        let number = orderDetail.number;
                        theProduct = await Product.fetchById(productId);
                        theProduct.productInventory -= number;
                        await theProduct.save();
                    });
                    user.userBalance -= orderPrice;
                    await user.save();
                    let newOrder = await new Order({
                        orderCreator: orderCreator,
                        orderDetails: orderDetails,
                        orderPrice: orderPrice,
                        orderTime: new Date()
                    }).save();
                    jsonWrite(res, newOrder, true, 200, '下订单成功');
                }
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    },
    {
        // 查找某人的历史订单
        method: 'get',
        path: '/order',
        router: async(req, res) => {
            let query = req.query;
            let orderCreator = query.orderCreator;
            try {
                let orders = await Order.fetch({ orderCreator: orderCreator });
                jsonWrite(res, orders, true, 200, '查找成功');
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    }
];

module.exports = OrderAPI;