<template>
    <div class="list">
      <OperateHint prompt="操作提示" content="机构信息列表：管理机构信息"></OperateHint>
      <div class="company_wrapper">
        <div class="wrapper_head">
          <el-button type="danger" plain size="small"
                     icon="el-icon-plus" @click="addInstitution"
                     v-if="$store.getters['getStorage'].identify_type.type == 'admin'">添加机构</el-button>
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
              label="机构名称"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              fixed
              label="机构logo"
              width="150"
              fit>
              <template slot-scope="scope" v-if="scope.row.logo_url">
                  <img :src="'api/upload/'+scope.row.logo_url" alt="" style="width:100px;height:100px;">
              </template>
            </af-table-column>
            <af-table-column
              label="机构地址"
              width="300"
              fit>
              <template slot-scope="scope">
                {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}
              </template>
            </af-table-column>
            <af-table-column
              prop="office_phone"
              label="办公电话"
              width="150"
              fit>
            </af-table-column>
            <af-table-column
              prop="charge_name"
              label="负责人"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              prop="charge_phone"
              label="负责人电话"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              prop="founder_name"
              label="创始人"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              prop="founder_phone"
              label="创始人电话"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              fixed="right"
              label="操作"
              width="180"
              fit>
              <template slot-scope="scope">
                <el-button @click="" type="text" size="small" @click="operation('detail', scope.row.id)">查看</el-button>
                <el-button type="text" size="small" @click="operation('edit', scope.row.id)">编辑</el-button>
                <el-button type="text" size="small" v-if="$store.getters['getStorage'].identify_type.type == 'admin'">删除</el-button>
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
import {listInstitution} from "../../api/institution";

export default {
  name: "List",
  data() {
    return {
      search: '',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      pageSize: 1,
      total: 0,
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
      this.searchInstitutionList();
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.searchInstitutionList();
    },
    addInstitution() {
      this.$router.push('/dashboard/platform/institution/add');
    },
    async searchInstitutionList() {
      let res;
      res = await listInstitution({
        page: {
          page_number: this.currentPage,
          row_count: this.pageSize,
        },
        manager: {
          id: this.$store.getters['getStorage'].identify_type.type == 'admin'?null:this.$store.getters['getStorage'].id
        },
        search_content: this.search,
      });

      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          this.tableData = res.data.body.list;
          this.total = res.data.body.total;
          this.loading = false;
        }
      }
    },
    searchData() {
      this.loading = true;
      this.searchInstitutionList();
    },
    operation(type, id) {
      console.log(type)
      console.log(id)

      if(type == 'detail') {
        this.$router.push('/dashboard/platform/institution/add?type='+type+'&id='+id);
      } else if(type == 'edit') {
        this.$router.push('/dashboard/platform/institution/edit?type='+type+'&id='+id);
      }
    }
  },
  mounted() {
    this.searchInstitutionList();
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
