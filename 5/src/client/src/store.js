import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        auth: JSON.parse(window.localStorage.getItem('auth') || '{}')
    },

    mutations: {
        saveAuth(state, auth) {
            state.auth = auth;
            window.localStorage.setItem('auth', JSON.stringify(auth));
        },
        clearAuth(state) {
            state.auth = {};
            window.localStorage.removeItem('auth')
        },
    },

    getters: {
        auth: state => {
            return state.auth
        }
    },

    actions: {
        saveAuth({ commit }, auth) {
            commit('saveAuth', auth)
        },
        clearAuth({ commit }) {
            commit('clearAuth')
        }
    }

})
