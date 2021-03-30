<template>
  <div>
    <a-layout>
      <a-layout-header>
        <img src="../assets/logo.png" class="logo" />
        <div class="user-pic">
          <a-avatar size="large" icon="user" />
          <a-button type="danger" @click="logout()">注销登录1</a-button>
        </div>
      </a-layout-header>
      <a-layout-content>
        <tabs-todo :todotabs="todoTabs"></tabs-todo>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import tabsTodo from '@/components/tabs-todo';
let columnsJinji = [
  {
    'label': '',
    'name': 'urgency',
    'width': '40px'
  }
];
let columnsCommon = [
  {
    'label': '接收时间',
    'name': 'receivetime',
    'width': '15%',
    'type': 'datetime'
  },
  {
    'label': '标题',
    'name': 'TITLE',
    'width': '36%'
  },
  {
    'label': '业务分类',
    'name': 'OTHERS',
    'width': '12%'
  },
  {
    'label': '上一步处理人',
    'name': 'fromuser',
    'width': '10%',
    'type': 'user'
  },
  {
    'label': '办理状态',
    'name': 'stat',
    'width': '12%'
  },
  {
    'label': '起草人',
    'name': 'draftuser',
    'width': '10%',
    'type': 'user'
  }
];
var todoTabs = [
  {
    key: 'todo',
    type: '0',
    label: '待办',
    view: 'vwtododociconv6',
    count: 10,
    showcount: true,
    columns: columnsJinji.concat(columnsCommon)
  },
  {
    key: 'done',
    type: '1',
    label: '已办',
    view: 'vwdonedocall',
    count: 10,
    showcount: false,
    columns: columnsCommon
  },
  {
    key: 'unread',
    type: '2',
    label: '待阅',
    view: 'vwunreaddoc',
    count: 10,
    showcount: true,
    columns: columnsCommon
  },
  {
    key: 'read',
    type: '3',
    label: '已阅',
    view: 'vwreaddoc',
    count: 10,
    showcount: false,
    columns: columnsCommon
  }
];
export default {
  name: 'home',
  data () {
    return {
      todoTabs: todoTabs
    };
  },
  methods: {
    logout: function () {
      sessionStorage.removeItem('indi-auth');
      this.$router.push('/login');
    }
  },
  components: {
    tabsTodo
  }
};
</script>

<style type="text/css">
.logo {
  height: 64px;
}
.user-pic {
  float: right;
}
.bottom-footer {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
