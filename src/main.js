// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import store from './store'
import $ from 'jquery'
import '@/style/global.css'   //global style
import * as api from '@/request/api'

import VueCookies from 'vue-cookies'
import store from './store'
import md5 from 'js-md5'


Vue.prototype.$http = api
Vue.prototype.$md5 = md5
window.$ = $
Vue.config.productionTip = false  //阻止启动生产消息


Vue.use(ElementUI)
Vue.use(VueCookies)

//路由守卫
router.beforeEach((to,from,next) =>{

  
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
