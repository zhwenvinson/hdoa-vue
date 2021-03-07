<template>
    <div class="form_app">
        {{msg}}
        <tabs-common></tabs-common>
        <div class="formcontrol">
            <label>用户名：</label>
            <input type="text" name="username" v-model="username">
        </div>
        <div class="formcontrol">
            <label>性别：</label>
            <label><input type="radio" name="sex" v-model="sex" value="男">男</label>
            <label><input type="radio" name="sex" v-model="sex" value="女">女</label>
        </div>
        <div class="formcontrol">
          <label>提交的内容：</label>{{username+sex}}
        </div>
        <div class="formcontrol">
          <label>提交的内容2：</label>{{submitdata}}
        </div>
        <div class="formcontrol">
          <label>提交的内容3：</label>{{computedata}}
        </div>
        <div class="formcontrol btn">
          <a-button type="primary" @click="okclick">确定</a-button>
        </div>
    </div>
</template>

<script>
import TabsCommon from '@/components/TabsCommon';
export default {
  name: 'form-com',
  props: {
    msg: String
  },
  components: {
    TabsCommon
  },
  data () {
    return {
      username: '张三',
      sex: '男',
      submitdata: ''
    };
  },
  computed: {
    computedata: function () {
      return this.username + ' ' + this.sex;
    }
  },
  methods: {
    okclick: function () {
      this.submitdata = this.username + ' ' + this.sex;
    }
  }
};
</script>

<style>
.formcontrol{
  border-bottom: 1px solid rgb(202, 202, 202);
}
</style>
