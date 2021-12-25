import Vue from 'vue'
import App from './App.vue'

import router from './router'
import "lib-flexible";
import "reset-css"
import "@/vantui"

Vue.filter('RMBformat', val => {
  return '￥' + val + '元'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
