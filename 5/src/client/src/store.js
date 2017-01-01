import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        // 取出localStorage的auth值作为初始化值
        auth: JSON.parse(window.localStorage.getItem('auth') || '{}'),
        clear: false // 变化则清空购物车
    },
    // 注册Vuex事务 事务不能直接调用，只能通过actions调用 而且必须是同步函数
    mutations: {
        // 保存用户登录信息
        saveAuth(state, auth) {
            state.auth = auth;
            window.localStorage.setItem('auth', JSON.stringify(auth));
        },
        // 登出
        clearAuth(state) {
            state.auth = {};
            window.localStorage.removeItem('auth')
        },
        // 买东西
        buy(state, money) {
            state.auth.userMoney -= money;
            window.localStorage.setItem('auth', JSON.stringify(state.auth));
        },
        // 改变clear
        makeClear(state) {
            let clear = state.clear;
            state.clear = !clear;
        }
    },
    // 配置Vuex取变量的方式
    getters: {
        auth: state => {
            return state.auth
        },
        isManager: state => {
            return state.auth.isManager
        },
        hasLogin: state => {
            return state.auth.token || state.auth.isManager
        },
        money: state => {
            return state.auth.userMoney
        },
        clear: state => {
            return state.clear
        }
    },
    // 定义开放的操作变量的动作，用来调用一个或者多个事务
    actions: {
        saveAuth({ commit }, auth) {
            commit('saveAuth', auth)
        },
        clearAuth({ commit }) {
            commit('clearAuth')
        },
        buy({ commit }, money) {
            commit('buy', money)
        },
        makeClear({ commit }) {
            commit('makeClear')
        }
    }
})
