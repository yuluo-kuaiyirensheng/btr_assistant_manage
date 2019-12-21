<template>
    <div class="breadcrumb">
      <el-breadcrumb separator="-" path="/">
        <el-breadcrumb-item v-for="(item, idx) in $route.matched" :key="idx">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'breadcrumb'
}
</script>

<style scoped>
  .breadcrumb {
    background: #f8f8f8;
  }

  .el-breadcrumb{
    margin: 0;
    padding: 10px 0 10px 20px;
    color: #262626;
    border-bottom: 1px solid #eee;
    font: normal 400 16px/20px '微软雅黑';
  }

</style>
