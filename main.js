import App from './App'
import tools from '@/common/tools.js'
import Vue from 'vue'
// #ifndef VUE3

Vue.config.productionTip = false
Vue.prototype.$tools=tools;
Vue.mixin(require('common/information.js'));//文件注入
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)