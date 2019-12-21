<template>
    <div class="list">
      <OperateHint prompt="操作提示" content="角色管理：查看系统所有真实、正确、有效的角色。"></OperateHint>
      <div class="company_wrapper">
        <div class="wrapper_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{'color':'#333', 'background':'#f2f2f2'}"
            stripe
            @selection-change="handleSelectionChange">
            <af-table-column
              prop="id"
              label="序号"
              min-width="1"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="roleEngName"
              label="角色名称（英文）"
              min-width="1"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="roleChiName"
              label="角色名称（中文）"
              min-width="1"
              align="center"
              fit>
            </af-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
export default {
  name: "List",
  data() {
    return {
      tableData: [
        {
          id: 1,
          roleEngName: 'admin',
          roleChiName: '系统管理员',
        },
        {
          id: 2,
          roleEngName: 'branchManager',
          roleChiName: '分机构管理员',
        },
      ],
    }
  },
  components: {
    OperateHint,
  },
  methods: {
    handleSelectionChange() {

    },
  }
}
</script>

<style scoped lang="scss">
  .list {
    padding: 0 20px;
  }
</style>
