import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
import store from "./store/index.js"

//使用uViewUI组件
Vue.use(uView)


Vue.config.productionTip = false
// 将store注册为全局变量
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
