<template>
    <div class="list">
      <OperateHint prompt="操作提示" content="旷课数据列表：管理各个机构所有旷课数据"></OperateHint>
      <div class="company_wrapper">
        <div class="wrapper_head">
          <el-select v-model="form_data.ins" placeholder="请选择">
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
          <el-input v-model="form_data.search" placeholder="试搜索一下" style="width: 200px;"></el-input>
          <el-button type="warning">搜索一下</el-button>
        </div>
        <div class="wrapper_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
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
              prop="type"
              label="班级类型"
              width="150"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="class_number"
              label="班级号"
              width="70"
              align="center"
              fit>
            </af-table-column>
            <af-table-column
              prop="teacher_name"
              label="指导助教"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              prop="teacher_tel"
              label="助教电话"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              prop="teach_lesson_hour"
              label="授课课时"
              width="100"
              fit>
            </af-table-column>
            <af-table-column
              prop="start_time"
              label="开始时间"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              prop="end_time"
              label="结束时间"
              width="200"
              fit>
            </af-table-column>
            <af-table-column
              prop="insName"
              label="所属机构"
              min-width="1"
              fit>
            </af-table-column>
            <af-table-column
              fixed="right"
              label="操作"
              width="180"
              fit>
              <template slot-scope="scope">
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
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
export default {
  name: "Truancy",
  data() {
    return {
      form_data: {
        search: '',
        ins: null,
        type: null,
        teacher: null,
      },
      tableData: [{
        id: 1,
        name: '小刚',
        type: '国画',
        class_number: 1,
        teacher_name: '浪里白条',
        teacher_tel: '12312231231',
        teach_lesson_hour: 2,
        start_time: '2019-02-05',
        end_time: '2019-06-30',
        insName: '弄潮健儿',
      }, {
        id: 2,
        name: '小刚',
        type: '国画',
        class_number: 1,
        teacher_name: '浪里白条',
        teacher_tel: '12312231231',
        teach_lesson_hour: 2,
        start_time: '2019-02-05',
        end_time: '2019-06-30',
        insName: '弄潮健儿',
      }, {
        id: 3,
        name: '小刚',
        name: '小刚',
        type: '国画',
        class_number: 1,
        teacher_name: '浪里白条',
        teacher_tel: '12312231231',
        teach_lesson_hour: 2,
        start_time: '2019-02-05',
        end_time: '2019-06-30',
        insName: '弄潮健儿',
      }, {
        id: 4,
        name: '小刚',
        name: '小刚',
        type: '国画',
        class_number: 1,
        teacher_name: '浪里白条',
        teacher_tel: '12312231231',
        teach_lesson_hour: 2,
        start_time: '2019-02-05',
        end_time: '2019-06-30',
        insName: '弄潮健儿',
      }],
      multipleSelection: [],
      currentPage: 4,
      insList: [
        {
          label: '请选择机构',
          value: null
        },
        {
          label: '小香蕉',
          value: 1
        },
        {
          label: '小可爱',
          value: 2
        },
        {
          label: '小小鸟',
          value: 3
        }
      ],
      typeList: [
        {
          label: '请选择班级类型',
          value: null
        },
        {
          label: '国画',
          value: 1
        },
        {
          label: '书法',
          value: 2
        },
      ],
      teacherList: [
        {
          label: '请选择助教老师',
          value: null
        },
        {
          label: '小周',
          value: 1
        },
        {
          label: '余老师',
          value: 2
        },
      ]
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addManager() {
      this.$router.push('/dashboard/platform/manager/add');
    }
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
