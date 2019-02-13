// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/reset.css"
import "./assets/css/style.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import LazyLoad from './libs/lazyLoad.js';
//引入 mock
require('./mock.js');


Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });//size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）
Vue.use(LazyLoad);
Vue.config.productionTip = false

/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
