<template>
    <div class="list">
      <OperateHint prompt="操作提示" content="超级管理员：管理普通管理员信息"></OperateHint>
      <div class="company_wrapper">
        <div class="wrapper_head">
          <el-button type="danger" plain size="small"
                     icon="el-icon-plus" @click="addManager">添加用户</el-button>
          <el-input v-model="search" placeholder="试搜索一下" style="width: 200px;"></el-input>
          <el-button type="warning" @click="searchData">搜索一下</el-button>
        </div>
        <div class="wrapper_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{'color':'#333', 'background':'#f2f2f2'}"
            stripe
            border
            @selection-change="handleSelectionChange">
            <af-table-column
              type="selection"
              width="50"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              fixed
              prop="id"
              label="序号"
              width="50"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              fixed
              prop="name"
              label="真实姓名"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              prop="sex"
              label="性别"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              prop="phone"
              label="电话号码"
              width="150"
              fit>
            </af-table-column>
            <af-table-column
              prop="email"
              label="电子邮箱"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              prop="institution.name"
              label="机构名称"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              label="机构地址"
              width="250"
              fit>
              <template slot-scope="scope" v-if="scope.row.institution">
                {{scope.row.institution.province}}{{scope.row.institution.city}}{{scope.row.institution.area}}
              </template>
            </af-table-column>
            <af-table-column
              fixed="right"
              label="操作"
              width="180"
              fit>
              <template slot-scope="scope">
                <el-button @click="" type="text" size="small" @click="operation('detail', scope.row.id)">查看</el-button>
                <el-button type="text" size="small" @click="operation('edit', scope.row.id)">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </af-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
import {listManager, searchManager} from "../../api/manager";
export default {
  name: "ManagerList",
  data() {
    return {
      search: '',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      total: 0,
      pageSize: 1,
      pageSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      loading: true,
    }
  },
  components: {
    OperateHint,
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.loading = true;
      this.pageSize = val;
      this.currentPage = 1;
      this.searchManagerList({});
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.searchManagerList({});
    },
    addManager() {
      this.$router.push('/dashboard/platform/manager/add');
    },
    async searchManagerList(data) {
      let res;
      if(this.search) {
        res = await searchManager({
          page: {
            page_number: this.currentPage,
            row_count: this.pageSize
          },
          search_content: this.search
        });
      } else {
        res = await listManager({
          page: {
            page_number: this.currentPage,
            row_count: this.pageSize
          },
          search_content: this.search
        });
      }
      if(res) {
        console.log(res);
        this.tableData = res.data.body.list;
        this.total = res.data.body.total;
        this.loading = false;
        this.search = '';
      }
    },
    searchData() {
      this.loading = true;
      this.searchManagerList({});
    },
    operation(type, id) {
      console.log(type)
      console.log(id)
      if(type == 'edit') {
        this.$router.push('/dashboard/platform/manager/edit?type='+type+'&id='+id);
      } else if(type == 'detail') {
        this.$router.push('/dashboard/platform/manager/detail?type='+type+'&id='+id);
      }
    },
  },
  async mounted() {
    this.searchManagerList();
  }
}
</script>

<style scoped lang="scss">
  .list {
    padding: 0 20px;
    .company_wrapper {
      .wrapper_head {
        margin-bottom: 10px;
      }

      .wrapper_table {
        .pagination {
          padding: 5px 10px;
          border: 1px solid #ebeef5;
          border-top: none;
        }
      }
    }
  }
</style>
