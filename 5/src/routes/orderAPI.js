/**
 * order表对应API
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
"use strict";
const Order = require('../models/Order');
const jsonWrite = require('./utils/writeJson');

let OrderAPI  = {};

OrderAPI.$routers = [
    {
        // 增加产品
        method: 'post',
        path: '/order',
        router: async(req, res) => {
            let order = req.body;
            //let order = req.query;
            let orderCreator = order.orderCreator;
            let orderDetails = order.orderDetails;
            let orderPrice = order.orderPrice;
            try {
                let newOrder = await new Order({
                    orderCreator: orderCreator,
                    orderDetails: orderDetails,
                    orderPrice: orderPrice,
                    orderTime: new Date()
                }).save();
                jsonWrite(res, newOrder, true, 200, '添加成功');
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    },
    {
        method: 'get',
        path: '/order',
        router: async(req, res) => {
            let query = req.query;
            let orderCreator = query.orderCreator;
            try {
                let orders = await Order.fetch({});
                jsonWrite(res, orders, true, 200, '查找成功');
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    }
];

module.exports = OrderAPI;