<template>
    <div class="list">
      <OperateHint prompt="操作提示" content="考勤数据列表：管理各个机构所有考勤数据"></OperateHint>
      <div class="company_wrapper">
        <div class="wrapper_head">
          <el-select v-model="form_data.ins" placeholder="请选择" :disabled="$store.getters['getStorage'].identify_type.type!='admin'">
            <el-option
              v-for="item in insList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form_data.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form_data.teacher" placeholder="请选择">
            <el-option
              v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form_data.condition" placeholder="请选择">
            <el-option
              v-for="item in conditionList"
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
              prop="student.name"
              label="学生姓名"
              min-width="1"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="attendance.cls.class_type.name"
              label="班级类型"
              width="150"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="attendance.cls.class_number"
              label="班级号"
              width="70"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="attendance.teacher.name"
              label="指导助教"
              min-width="1"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="attendance.teacher.phone"
              label="助教电话"
              width="200"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="attendance.teach_lesson_hour"
              label="授课课时"
              width="100"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              label="开始时间"
              width="200"
              fit>
              <template slot-scope="scope">
                {{new Date(scope.row.attendance.start_time).getFullYear()}}年
                {{new Date(scope.row.attendance.start_time).getMonth()}}月
                {{new Date(scope.row.attendance.start_time).getDate()}}日
                {{new Date(scope.row.attendance.start_time).getHours()}}:{{new Date(scope.row.attendance.start_time).getMinutes()}}:{{new Date(scope.row.attendance.start_time).getSeconds()}}
              </template>
            </af-table-column>
            <af-table-column
              label="结束时间"
              width="200"
              fit>
              <template slot-scope="scope">
                {{new Date(scope.row.attendance.end_time).getFullYear()}}年
                {{new Date(scope.row.attendance.end_time).getMonth()}}月
                {{new Date(scope.row.attendance.end_time).getDate()}}日
                {{new Date(scope.row.attendance.end_time).getHours()}}:{{new Date(scope.row.attendance.end_time).getMinutes()}}:{{new Date(scope.row.attendance.end_time).getSeconds()}}
              </template>
            </af-table-column>
            <af-table-column
              prop="attendance.institution.name"
              label="所属机构"
              width="150"
              fit>
            </af-table-column>
            <af-table-column
              prop="status.type"
              label="到课情况"
              width="100"
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
import {listStudentAttendance} from "../../api/studentAttendance";
import {listInstitution} from "../../api/institution";
import {listClassType} from "../../api/classType";
import {listTeacher} from "../../api/teacher";
import {listStatus} from "../../api/status";

export default {
  name: "List",
  data() {
    return {
      form_data: {
        search: '',
        ins: null,
        type: null,
        teacher: null,
        condition: null,
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
      conditionList: [
        {
          label: '请选择到课情况',
          value: null
        }
      ],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 1,
      pageSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
      this.currentPage = 1;
      this.pageSize = val;
      this.searchStudentAttendanceList();
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.searchStudentAttendanceList();
    },
    addManager() {
      this.$router.push('/dashboard/platform/manager/add');
    },
    async searchStudentAttendanceList() {
      let res = await listStudentAttendance({
        page: {
          page_number: this.currentPage,
          row_count: this.pageSize,
        },
        search_content: this.form_data.search,
        student_attendance: {
          attendance: {
            institution_id: this.form_data.ins,
            teacher_id: this.form_data.teacher,
            cls: {
              class_type_id: this.form_data.type,
            },
          },
          status_id: this.form_data.condition,
        },
      });
      if(res) {
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
      this.searchStudentAttendanceList();
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
    async listTeacher() {
      let res = await listTeacher({
        teacher: {
          institution_id: this.$store.getters['getStorage'].institution_id,
        }
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
    async listCondition() {
      let res = await listStatus({});
      if(res) {
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.conditionList.push({
              label: item.type,
              value: item.id,
            });
          });
        }
      }
    },
    operation(type, id) {
      if(type == 'detail') {
        this.$router.push('/dashboard/attendance/detail?type='+type+'&id='+id);
      } else if(type == 'edit') {
        this.$router.push('/dashboard/attendance/edit?type='+type+'&id='+id);
      }
    },
  },
  async mounted() {
    await this.listIns();
    this.form_data.ins = this.$store.getters['getStorage'].institution_id;
    await this.listClassType();
    await this.listTeacher();
    await this.listCondition();
    await this.searchStudentAttendanceList();
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
