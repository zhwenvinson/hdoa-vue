<template>
  <div>
    <a-form :form="form" @submit.prevent="toLogin()" :label-col="{span: 6}" :wrapper-col="{span: 18}">
      <div>
        <a-card title="欢迎登录办公系统" :bordered="false" class="login">
          <a-spin size="large" class="logining" v-if="islogining"/>
          <a-form-item>
            <span slot="label">用&ensp;户&ensp;名</span>
            <a-input
              v-decorator="['username',{rules: [{required: true, message: '请输入用户名'}]}]"
              placeholder="请输入用户名">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <span slot="label">密&emsp;&emsp;码</span>
            <a-input
              v-decorator="['password',{rules: [{required: true, message: '请输入密码'}]}]"
              placeholder="请输入密码"
              type="password">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"></a-icon>
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{span: 24}" :style="{position:'absolute',right:'24px',width:'75%'}">
            <a-button type="primary" html-type="submit" block>
              登 录
            </a-button>
          </a-form-item>
        </a-card>
      </div>
    </a-form>
  </div>
</template>

<script>
import aes from '../assets/js/aes';
export default {
  name: 'login',
  data () {
    return {
      form: this.$form.createForm(this, {name: 'login'}),
      islogining: false
    };
  },
  computed: {
    allowToLogin: function () {
      return this.form.getFieldValue('username') && this.form.getFieldValue('password');
    }
  },
  methods: {
    toLogin: function () {
      var username = this.form.getFieldValue('username');
      var password = this.form.getFieldValue('password');
      if (username && password) {
        this.islogining = true;
        // 先获取用户userid
        this.$axios.get('/indishare/inditraveler.nsf/namelookup?open', {params: {name: username}}).then(res => {
          let userid = res.data.trim();
          if (userid) {
            let indiAuth = aes.encrypt(userid + ':' + password);
            // 检测用户名和密码是否正确
            // this.$axios.get('/indishare/inditraveler.nsf/agtCheckLogin?openAgent', {
            this.$axios.get('/indishare/addresstree.nsf/api/data/collections/name/vwdepbyparentcode?count=1', {
              indiAuth: indiAuth
            }).then(res => {
              // if (res.data && typeof res.data === 'object' && res.data.user !== '') {
              if (res.data && typeof res.data === 'object') {
                sessionStorage.setItem('indi-auth', indiAuth);
                this.$router.push({name: 'Home'});
              } else {
                this.islogining = false;
                this.$message.error('密码错误');
              }
            // eslint-disable-next-line handle-callback-err
            }).catch(err => {
              this.islogining = false;
              this.$message.error('密码错误');
            });
          } else {
            this.islogining = false;
            this.$message.error('用户名错误');
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.login{
  position: absolute;
  top: 28%;
  left: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 270px;
  border: 1px solid #e8e8e8;
}
.logining{
  position: fixed;
  top: 46%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
}
.logining:before{
  content: '';
  background-color: #fcfcfc;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  z-index: 1000;
}
</style>
