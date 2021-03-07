<template>
  <div>
    <label>URL：</label>
    <span>{{$route.query.url}}</span>
    <label>ID：</label>
    <span>{{$route.query.id}}</span>
  </div>
</template>

<script>
export default {
  name: 'maindoc',
  data () {
    return {
      data: {}
    };
  }
};
</script>
