import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css';
import '@/assets/font/font.css'
import './plugins/element.js'
import './theme/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios
import * as echarts from 'echarts';
import 'echarts-liquidfill'
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = '/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
