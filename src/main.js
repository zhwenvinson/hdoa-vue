// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Antd from 'ant-design-vue'; // 引入Ant Design Vue组件
import 'ant-design-vue/dist/antd.css'; // 引入Ant Design Vue样式
// import './assets/js/mock';
import axios from './http';
import x2js from 'x2js';
import * as filters from './assets/js/filters';

Vue.use(Antd); // 挂载到vue中
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// eslint-disable-next-line new-cap
Vue.prototype.$x2js = new x2js();
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (sessionStorage.getItem('indi-auth')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
