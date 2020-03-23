<template>
    <div class="list">
      <OperateHint prompt="操作提示" content="助教列表：管理各助教信息"></OperateHint>
      <div class="company_wrapper">
        <div class="wrapper_head">
          <el-button type="danger" plain size="small"
                     icon="el-icon-plus" @click="addTeacher"
                     v-if="$store.getters['getStorage'].identify_type.type != 'admin'">添加助教</el-button>
          <el-select v-model="ins" placeholder="请选择" :disabled="$store.getters['getStorage'].identify_type.type!='admin'">
            <el-option
              v-for="item in insList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
              label="助教名称"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              fixed
              prop="name"
              label="助教头像"
              width="120"
              fit
              align="center">
              <template slot-scope="scope" v-if="scope.row.portrait_url">
                <img :src="'api/upload/'+scope.row.portrait_url" style="width:100px;height:100px;">
              </template>
            </af-table-column>
            <af-table-column
              prop="institution.name"
              label="所属机构"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              prop="phone"
              label="手机号"
              width="150"
              fit>
            </af-table-column>
            <af-table-column
              fixed="right"
              label="操作"
              width="180"
              fit>
              <template slot-scope="scope" v-if="$store.getters['getStorage'].identify_type.type == 'branchManager'">
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
import {listTeacher, searchTeacher} from "../../api/teacher";
import {listInstitution} from "../../api/institution";

export default {
  name: "List",
  data() {
    return {
      search: '',
      tableData: [],
      insList: [
        {
          label: '请选择机构',
          value: null
        }
      ],
      ins: null,
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
      this.pageSize = val;
      this.currentPage = 1;
      this.loading = true;
      this.searchTeacherList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.searchTeacherList();
    },
    addTeacher() {
      this.$router.push('/dashboard/teacher/add');
    },
    async listIns() {
      let res = await listInstitution({});
      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.insList.push({
              label: item.name,
              value: item.id,
            },);
          });
        }
      }
    },
    async searchTeacherList() {
      let res = await listTeacher({
        page: {
          page_number: this.currentPage,
          row_count: this.pageSize,
        },
        search_content: this.search,
        teacher: {
          institution_id: this.ins,
        },
        manager: {
          id: this.$store.getters['getStorage'].identify_type.type == 'admin'?null:this.$store.getters['getStorage'].id
        }
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
      this.currentPage = 1;
      this.searchTeacherList();
    },
    operation(type, id) {
      if(type == 'detail') {
        this.$router.push('/dashboard/teacher/add?type='+type+'&id='+id);
      } else if(type == 'edit') {
        this.$router.push('/dashboard/teacher/edit?type='+type+'&id='+id);
      }
    }
  },
  async mounted() {
    await this.listIns();
    this.ins = this.$store.getters['getStorage'].identify_type.type == 'admin'?null:this.$store.getters['getStorage'].institution_id;
    await this.searchTeacherList();
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
