<template>
  <div class="myviewbottom">
    <div class="leftbutton"></div>
    <div class="rightpager">
      <a-pagination
       show-quick-jumper
       show-size-changer
       :size="size"
       :default-current="pager.page || pager.default.page"
       :total="pager.total"
       :page-size="pagesize || pager.pagesize"
       @change="changePage"
       @showSizeChange="onShowSizeChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myview-pager',
  props: {
    showselect: Boolean,
    pager: Object,
    size: String
  },
  data () {
    return {
      pagesize: 0
    };
  },
  methods: {
    changePage: function (page, pageSize) {
      if (pageSize !== this.pager.pagesize) {
        this.$emit('changePage', {page: 1, pageSize});
      } else {
        this.$emit('changePage', {page, pageSize});
      }
    },
    onShowSizeChange: function (current, pageSize) {
      this.pagesize = pageSize;
      this.$emit('changePageSize', {page: current, pageSize});
    }
  }
};
</script>

<style scoped>
.myviewbottom{
  position: absolute;
  bottom: 0px;
  right: 0;
  height: 45px;
  padding: 5px 10px;
}
</style>
