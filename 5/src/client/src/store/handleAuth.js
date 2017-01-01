/**
* 处理和用户认证有关的前后端交互
*/
import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'


export default {
    login(auth) {
        return axios.put('/api/user', {
            userName: auth.userName,
            userPass: auth.userPass
        });
    },
    register(auth) {
        return axios.post('/api/user', {
            userName: auth.userName,
            userPass: auth.userPass
        });
    },
    signout() {
        return store.dispatch('clearAuth');
    }
}