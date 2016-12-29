// 引入 Polyfills
import 'core-js/fn/promise'
import 'core-js/fn/string/pad-start'
// 引入 Vue 相关库
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// 其他
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store.js'

Vue.use(ElementUI)
Vue.use(Vuex)

// 定义时间过滤器
Vue.filter('datetime', (str) => {
  const date = new Date(str)
  const year = date.getFullYear()
  const day = date.getDate().toString().padStart(2, '0')
  const mouth = (date.getMonth() + 1).toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${year}-${mouth}-${day} ${hour}:${minute}`
})

new Vue({
  el: '#app',
  router,
  // store: store,
  render: h => h(App)
})
