import Vue from 'vue'
// 注意：vant ui框架必须在app之前引入
import Vant from 'vant';

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 03 vant ui 引入
// $cnpm i vant -S
import 'vant/lib/index.css';
Vue.use(Vant);
// 02 引入字体图标
import "./assets/font/iconfont.css";
// 01 rem适配模块
// $cnpm i amfe-flexible -S
// $cnpm install px2rem-loader -D
// 修改vue.config.js
// 添加public添加base.css文件
// vs code cssrem扩展
import "amfe-flexible"
// $cnpm i axios -S  ajax请求
// 网易云接口网址
// https://neteasecloudmusicapi.vercel.app/#/

import api from "./store/api.js";
// 全局属性
Vue.prototype.resetSetItem = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')