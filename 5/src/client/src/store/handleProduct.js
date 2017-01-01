/**
* 管理员管理产品的交互
*/

import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    getProduct() {
        return axios.get('/api/product',{
            params: {
                token: store.getters.auth.token
            }
        });
    },
    updateProduct(product) {
        return axios.put('/api/product', {
            token: store.getters.auth.token,
            product: product
        });
    },
    addProduct(product) {
        return axios.post('/api/product', {
            token: store.getters.auth.token,
            product: product
        });
    },
    deleteProduct(productId) {
        return axios.delete('/api/product', {
            token: store.getters.auth.token,
            productId: productId
        });
    }
}