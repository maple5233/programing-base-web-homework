/**
* 订单有关的交互
*/

import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    addOrder(orderDetails, orderPrice) {
        return axios.post('/api/order',{
            token: store.getters.auth.token,
            orderCreator: store.getters.auth._id,
            orderDetails: orderDetails,
            orderPrice: orderPrice
        });
    },
    getOrder() {
        return axios.get('/api/order',{
            params: {
                token: store.getters.auth.token,
                orderCreator: store.getters.auth._id
            }
        });
    }
}