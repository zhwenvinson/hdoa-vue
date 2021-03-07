import axios from 'axios';
import router from './router';
import aes from './assets/js/aes';

axios.defaults.timeout = 20000;
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    let indiAuth = config.indiAuth || sessionStorage.getItem('indi-auth');
    if (indiAuth) {
      config.headers.Authorization = 'Basic ' + aes.encrypt_b64(aes.decrypt(indiAuth));
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  res => {
    if (res.data.errno === 999) {
      sessionStorage.removeItem('indi-auth');
      router.replace('/');
    }
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;
