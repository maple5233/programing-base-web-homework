/**
 * product表对应API
 * Created by hongjiyao_2014150120 on 16-12-31.
 */
"use strict";
const Product = require('../models/Product');
const jsonWrite = require('./utils/writeJson');

let ProductAPI = {};

ProductAPI.$routers = [
    {
        // 增加产品
        method: 'post',
        path: '/product',
        router: async(req, res) => {
            let product = req.body.product;
            //let product = req.query;
            try {
                let newProduct = await new Product({
                    productName: product.productName,
                    productDetails: product.productDetails,
                    productPrice: product.productPrice,
                    productInventory: product.productInventory || 0
                }).save();
                jsonWrite(res, newProduct, true, 200, '添加成功');
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    },
    {
        // 更新产品
        method: 'put',
        path: '/product',
        router: async(req, res) => {
            let product = req.body.product;
            //let product = req.query;
            let theProduct;
            try {
                theProduct = await Product.fetchById(product._id);
                theProduct.productName = product.productName;
                theProduct.productDetails = product.productDetails;
                theProduct.productPrice = product.productPrice;
                theProduct.productInventory = product.productInventory || 0;
                theProduct = await theProduct.save();
                jsonWrite(res, theProduct, true, 200, '更新成功');
            } catch(err) {
                jsonWrite(res, null, false, 500, err);
            }
        }
    },
    {
        // 删除产品
        method: 'delete',
        path: '/product',
        router: async(req, res) => {
            let productId = req.body.productId;
            //let productId = req.query._id;
            let theProduct;
            try {
                theProduct = await Product.fetchById(productId);
                await theProduct.remove();
                jsonWrite(res, theProduct, true, 200, '删除成功');
            } catch(err) {
                console.log(err);
                jsonWrite(res, null, false, 500, err);
            }
        }
    },
    {
        // 查找所有产品
        method: 'get',
        path: '/product',
        router: async(req, res) => {
            try {
                let products = await Product.fetch({});
                jsonWrite(res, products, true, 200, '查找成功');
            } catch(err) {
                console.log(err);
                jsonWrite(res, null, false, 500, err);
            }
        }
    }
];

module.exports = ProductAPI;