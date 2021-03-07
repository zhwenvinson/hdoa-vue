<template>
  <div class="todoview intabs">
    <div class="viewheader">
      <a-spin size="large" class="loading" v-if="!initialized"/>
      <table>
        <tr>
          <th v-for="col in todo.columns" :width="col.width" :key="col.name">{{col.label}}</th>
        </tr>
        <tr v-for="item in datas.ITEM" :key="item.todounid">
          <td v-for="col in todo.columns" :key="col.name" :title="item[col.name]">
            <router-link :to="{name: 'maindoc', query: {url: item.flowprotocol+'://'+item.flowurl, id: item.flowunid}}" target="_blank">
            <span v-if="col.type=='user'">
              {{item[col.name] | domUser}}
            </span>
            <span v-else-if="col.type=='datetime'">
              {{item[col.name] | datetime}}
            </span>
            <span v-else>
              {{item[col.name]}}
            </span>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
    <myview-pager
     v-if="initialized || changepage"
     :pager="pager"
     size="normal"
     @changePage="changePage"
     @changePageSize="changePageSize">
    </myview-pager>
  </div>
</template>

<script>
import imDominoSoap from '../assets/js/todo/service';
import myviewPager from './myview-pager';
export default {
  name: 'todo-view',
  props: {
    todo: Object
  },
  data () {
    return {
      initialized: false,
      datas: [],
      pager: {
        'total': 0,
        'default': {
          'start': 1,
          'page': 1,
          'pagesize': 10
        }
      },
      changepage: false
    };
  },
  created () {
    // 先设置pager
    this.setPager('init');
    // 再加载数据
    this.initTodoData();
  },
  methods: {
    setPager: function (type, pager) {
      if (type === 'init') {
        this.pager.page = this.pager.default.page;
        this.pager.start = this.todo.start || this.pager.default.start;
        this.pager.pagesize = this.todo.count || this.pager.default.pagesize;
      } else if (type === 'changepage' || type === 'changepagesize') {
        this.pager.page = parseInt(pager.page);
        this.pager.pagesize = parseInt(pager.pageSize);
        // 计算起始索引
        this.pager.start = (this.pager.page * this.pager.pagesize) - this.pager.pagesize + 1;
      }
    },
    initTodoData: function () {
      if (this.todo && this.todo.type) {
        this.datas = [];
        this.initialized = false;
        imDominoSoap.invoke(this.$axios, this.$x2js, '/indishare/indiwsleaf.nsf/wsFortodo?OpenWebService', 'getDBSYListByType', {
          'type': this.todo.type,
          'start': this.pager.start,
          'docnum': this.pager.pagesize,
          'query': '',
          'view': this.todo.view,
          'sortField': '',
          'isAsc': ''
        }).then(res => {
          this.datas = res.data.DATAS;
          this.pager.total = parseInt(this.datas.allTotal);
          this.initialized = true;
        });
      }
    },
    changePage: function (pager) {
      this.setPager('changepage', pager);
      this.changepage = true;
      this.initTodoData();
    },
    changePageSize: function (pager) {
      this.setPager('changepagesize', pager);
      this.initTodoData();
    }
  },
  components: {
    myviewPager
  }
};
</script>
<style scoped>
.todoview{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
}
.todoview table{
  width: 100%;
}
.todoview table tr{
  border-bottom: 1px solid #ececec;
}
.todoview table th{
  height: 40px;
  padding: 0 5px;
}
.todoview table td{
  height: 36px;
  padding: 0 5px;
}
.intabs{
  top: 60px;
}
.loading{
  position: absolute;
  top: 50%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
}
.loading:before{
  content: '';
  background-color: #fcfcfc;
  position: fixed;
  top: 124px;
  left: 0;
  right: 0;
  bottom: 80px;
  opacity: 0.5;
  z-index: 1000;
}
.viewheader{
  position: absolute;
  bottom: 45px;
  top: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>
