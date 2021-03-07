import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login';
import home from '@/components/home';
import maindoc from '@/components/maindoc';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/maindoc',
      name: 'maindoc',
      component: maindoc
    }
  ]
});
