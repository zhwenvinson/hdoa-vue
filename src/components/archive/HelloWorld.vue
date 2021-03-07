<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>Guess my name?<a href="javascript:void(0)" @click="showMyName()">Guess?</a><span>{{myname}}</span></div>
    <form-com :msg="msg"></form-com>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import FormCom from '@/components/FormCom';
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to My Vue.js App',
      msg2: {
        a: '1'
      },
      myname: ''
    };
  },
  components: {FormCom},
  methods: {
    showMyName: function () {
      // eslint-disable-next-line no-undef
      axios.post('/api/user').then(res => {
        this.myname = res.data.data.name;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
