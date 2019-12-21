<template>
    <div class="operatehint">
      <i class="el-icon-s-opportunity"></i>
      <span>
        {{prompt}}
        <el-tooltip class="item" effect="dark" :content="content" placement="right-start"
                    transition="el-fade-in-linear" :open-delay="delay">
          <el-button>鼠标放上去查看</el-button>
        </el-tooltip>
      </span>
    </div>
</template>

<script>
export default {
  name: "operatehint",
  data() {
    return {
      delay: 500
    }
  },
  props: {
    prompt: String,
    content: String
  }
}
</script>

<style scoped lang="scss">
  .operatehint {
    margin: 20px 0;
    border: 1px dashed #66b4fc;
    border-radius: 5px;
    padding: 20px;
    background: #f5faff;

    i {
      color: #66b4fc;
    }

    span {
      color: #66b4fc;
      font: normal 400 16px/18px '微软雅黑';
    }
  }
</style>
