import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        // 取出localStorage的auth值作为初始化值
        auth: JSON.parse(window.localStorage.getItem('auth') || '{}')
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
    },
    // 配置Vuex取变量的方式
    getters: {
        auth: state => {
            return state.auth
        }
    },
    // 定义开放的操作变量的动作，用来调用一个或者多个事务
    actions: {
        saveAuth({ commit }, auth) {
            commit('saveAuth', auth)
        },
        clearAuth({ commit }) {
            commit('clearAuth')
        }
    }

})
