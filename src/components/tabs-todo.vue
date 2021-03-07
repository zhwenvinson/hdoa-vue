<template>
  <div class="todotab">
    <a-tabs :default-active-key="tabsactivekey" @change="switchTabs">
      <a-tab-pane v-for="tab in todotabs" :key="tab.key">
        <span slot="tab">
          <span v-html="tab.label"></span>
          <a-badge :count="tab.datacount||0" v-if="tab.showcount" :overflow-count="99" :offset="['0','-15']"/>
        </span>
      </a-tab-pane>
    </a-tabs>
    <todo-view :todo="showtab" :key="showtab.key"></todo-view>
  </div>
</template>

<script>
import todoView from '@/components/todo-view';
export default {
  name: 'tabs-todo',
  props: ['todotabs'],
  data: function () {
    return {
      showtab: this.todotabs[0]
    };
  },
  methods: {
    switchTabs: function (activeKey) {
      this.todotabs.some((tab) => {
        if (tab.key === activeKey) {
          this.showtab = tab;
          return true;
        }
        return false;
      });
    }
  },
  computed: {
    tabsactivekey: function () {
      return this.showtab.key;
    }
  },
  components: {
    todoView
  }
};
</script>
<style scoped>
.todotab{
  position: absolute;
  top: 64px;
  left: 10px;
  right: 10px;
  bottom: 0px;
}
</style>
