<template>
    <div class="list">
      <OperateHint prompt="操作提示" content="学生数据列表：管理各机构所有学生。"></OperateHint>
      <div class="company_wrapper">
        <div class="wrapper_head">
          <el-select v-model="form_data.ins" placeholder="请选择" @change="changeIns">
            <el-option
              v-for="item in insList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form_data.type" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form_data.teacher" placeholder="请选择" @change="changeTeacher">
            <el-option
              v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="form_data.search" placeholder="试搜索一下" style="width: 200px;"></el-input>
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
              label="学生姓名"
              min-width="1"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="sex"
              label="学生性别"
              width="100"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="age"
              label="学生年龄"
              width="100"
              align="center"
              fit>
            </af-table-column>
<!--            <af-table-column-->
<!--              prop="type"-->
<!--              label="班级类型"-->
<!--              width="150"-->
<!--              align="center"-->
<!--              fit>-->
<!--            </af-table-column>-->
<!--            <af-table-column-->
<!--              prop="class_number"-->
<!--              label="班级号"-->
<!--              width="70"-->
<!--              align="center"-->
<!--              fit>-->
<!--            </af-table-column>-->
<!--            <af-table-column-->
<!--              prop="student_number"-->
<!--              label="班级人数"-->
<!--              width="100"-->
<!--              align="center"-->
<!--              fit>-->
<!--            </af-table-column>-->
<!--            <af-table-column-->
<!--              prop="teacher_name"-->
<!--              label="指导助教"-->
<!--              min-width="1"-->
<!--              fit>-->
<!--            </af-table-column>-->
<!--            <af-table-column-->
<!--              prop="teacher_tel"-->
<!--              label="助教电话"-->
<!--              width="200"-->
<!--              fit>-->
<!--            </af-table-column>-->
            <af-table-column
              prop="institution.name"
              label="所属机构"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              fixed="right"
              label="操作"
              width="180"
              fit>
              <template slot-scope="scope" v-if="$store.getters['getStorage'].identify_type.type == 'branchManager'">
                <el-button @click="" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
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
import {listStudent, searchStudent} from "../../api/student";
import {listInstitution} from "../../api/institution";
import {listTeacher} from "../../api/teacher";
import {listClassType} from "../../api/classType";

export default {
  name: "List",
  data() {
    return {
      form_data: {
        search: '',
        ins: null,
        type: null,
        teacher: null,
      },
      tableData: [],
      insList: [
        {
          label: '请选择机构',
          value: null
        }
      ],
      typeList: [
        {
          label: '请选择班级类型',
          value: null
        }
      ],
      teacherList: [
        {
          label: '请选择助教老师',
          value: null
        }
      ],
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
      this.form_data.search = '';
      this.loading = true;
      this.pageSize = val;
      this.currentPage = 1;
      this.searchStudentList();
    },
    handleCurrentChange(val) {
      this.form_data.search = '';
      this.loading = true;
      this.currentPage = val;
      this.searchStudentList();
    },
    addManager() {
      this.$router.push('/dashboard/platform/manager/add');
    },
    async searchStudentList() {
      let res;
      if(this.form_data.search || this.form_data.ins || this.form_data.type || this.form_data.teacher) {
        res = await searchStudent({
          page: {
            page_number: this.currentPage,
            row_count: this.pageSize,
          },
          search_content: this.form_data.search,
          student: {
            institution_id: this.form_data.ins,
          },
          cls: {
            class_type_id: this.form_data.type,
          },
          teacher: {
            id: this.form_data.teacher,
          }
        });
      } else {
        res = await listStudent({
          page: {
            page_number: this.currentPage,
            row_count: this.pageSize,
          }
        });
      }

      if(res) {
        if(res.data.code == 200) {
          this.tableData = res.data.body.list;
          this.loading = false;
          this.total = res.data.body.total;
        }
      }
    },
    searchData() {
      this.loading = true;
      this.currentPage = 1;
      this.searchStudentList();
    },
    async listIns() {
      let res = await listInstitution({});
      if(res) {
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.insList.push({
              label: item.name,
              value: item.id,
            });
          });
        }
      }
    },
    changeIns() {
      this.currentPage = 1;
    },
    async listTeacher() {
      let res = await listTeacher({

      });
      if(res) {
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.teacherList.push({
              label: item.name,
              value: item.id,
            });
          });
        }
      }
    },
    changeTeacher() {
      this.currentPage = 1;
    },
    async listClassType() {
      let res = await listClassType({

      });
      if(res) {
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.typeList.push({
              label: item.name,
              value: item.id,
            });
          });
        }
      }
    },
    changeType() {
      this.currentPage = 1;
    },
  },
  mounted() {
    this.listIns();
    this.listClassType();
    this.listTeacher();
    this.searchStudentList();
  },

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
