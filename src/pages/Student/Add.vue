<template>
    <div class="add">
    <OperateHint prompt="操作提示" content="根据平台运营要求创建学生，要求信息真实、正确、有效。"></OperateHint>
    <div class="add_wrapper">
      <div class="wrapper_head">
        <span>创建班级</span>
      </div>
      <div class="wrapper_body">
        <div class="bd_column">
          <div class="title">
            <span>学生姓名：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入学生姓名" v-model="form_data.name"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>性别：</span>
          </div>
          <div class="info">
            <el-select v-model="form_data.sex" clearable placeholder="请选择"
                       style="width: 30%;min-width: 120px;">
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>学生电话：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入学生电话" v-model="form_data.tel"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>学生年龄：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入学生年龄" v-model="form_data.age"></el-input>
          </div>
        </div>
        <div class="bd_column" v-if="!add">
          <div class="title">
            <span>上课班级：</span>
          </div>
          <div class="info">
            <el-button type="text" @click="classesDialogVisible = true">点击查看详情</el-button>
            <el-dialog
              title="提示"
              :visible.sync="classesDialogVisible"
              width="70%"
              center>
              <template slot-scope="scope">
                <el-table
                  ref="multipleTable"
                  :data="form_data.list"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :header-cell-style="{'color':'#333', 'background':'#f2f2f2'}"
                  stripe
                  border>
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
                    label="班级"
                    width="150"
                    align="center"
                    fit>
                    <template slot-scope="scope">
                      {{scope.row.class_type.name}}{{scope.row.class_number}}班
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="student_number"
                    label="学生人数"
                    width="100"
                    align="center"
                    fit>
                  </af-table-column>
                  <af-table-column
                    prop="taught_lesson_hour"
                    label="已授课时"
                    min-width="1"
                    align="center"
                    fit>
                  </af-table-column>
                  <af-table-column
                    prop="total_lesson_hour"
                    label="总课时"
                    min-width="1"
                    align="center"
                    fit>
                  </af-table-column>
                  <af-table-column
                    label="上课时间"
                    width="200"
                    align="center"
                    fit>
                    <template slot-scope="scope">
                      {{new Date(scope.row.start_time).getHours()}}:{{new Date(scope.row.start_time).getMinutes()}}:{{new Date(scope.row.start_time).getSeconds()}}
                    </template>
                  </af-table-column>
                  <af-table-column
                    label="下课时间"
                    width="200"
                    align="center"
                    fit>
                    <template slot-scope="scope">
                      {{new Date(scope.row.end_time).getHours()}}:{{new Date(scope.row.end_time).getMinutes()}}:{{new Date(scope.row.end_time).getSeconds()}}
                    </template>
                  </af-table-column>
                  <af-table-column
                    label="操作"
                    width="200"
                    fit
                    fixed="right">
                    <template slot-scope="scope" v-if="$store.getters['getStorage'].identify_type.type == 'branchManager'">
                      <el-button type="text" size="small" @click="delStudentClass(scope.row.id)" v-if="update">删除</el-button>
                    </template>
                  </af-table-column>
                </el-table>
              </template>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" plain
                           icon="el-icon-plus" @click="classDialogVisible = true" v-if="update">添加班级</el-button>
                <el-button @click="classesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="classesDialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="提示"
              :visible.sync="classDialogVisible"
              width="70%"
              center>
              <template slot-scope="scope" >
                <div class="wrapper_body">
                  <div class="bd_column">
                    <div class="title">
                      <span>选择班级类型：</span>
                    </div>
                    <div class="info">
                      <el-select v-model="form_data.classType" clearable placeholder="请选择"
                                 style="width: 50%;min-width: 120px;" @change="changeClassType">
                        <el-option
                          v-for="item in classTypeList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="bd_column">
                    <div class="title">
                      <span>选择班级号：</span>
                    </div>
                    <div class="info">
                      <el-select v-model="form_data.classNo" clearable placeholder="请选择"
                                 style="width: 50%;min-width: 120px;">
                        <el-option
                          v-for="item in classNoList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="bd_column" v-if="showSub">
                    <div class="title">
                      <span></span>
                    </div>
                    <div class="info">
                      <el-button type="primary" size="medium" @click="addStudentClass">确认添加</el-button>
                    </div>
                  </div>
                </div>
              </template>
            </el-dialog>
          </div>
        </div>
        <div class="bd_column" v-if="showSub">
          <div class="title">
            <span></span>
          </div>
          <div class="info">
            <el-button type="primary" size="medium" @click="saveStudent">保存学生</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
import {messagePrompt} from "../../utils/PublicUtil";
import {addStudent, updateStudent, findStudent} from "../../api/student";
import {listClassType} from "../../api/classType";
import {listClass} from "../../api/class";
import {addStudentClass, deleteStudentClass} from "../../api/studentClass";

export default {
  name: "Add",
  components: {
    OperateHint,
  },
  data() {
    return {
      classTypeList: [
        {
          label: '请选择班级类型',
          value: null
        }
      ],
      classNoList: [
        {
          label: '请选择班级号',
          value: null
        }
      ],
      sexList: [
        {
          label: '请选择性别',
          value: null
        },
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ],
      classesDialogVisible: false,
      classDialogVisible: false,
      form_data: {
        classType: null,
        classNo: null,
        teacher: null,
        classType: null,
        name: '',
        sex: null,
        tel: '',
        age: null,
        list: []
      },
      showSub: true,
      update: false,
      add: true,
      uploadFile: {},
      host: '',
    }
  },
  methods: {
    async listClassType() {
      let res = await listClassType({})
      if(res) {
        res.data.body.list.forEach((item) => {
          this.classTypeList.push({
            label: item.name,
            value: item.id,
          })
        })
      }
    },
    async changeClassType() {
      this.classNoList = [
        {
          label: '请选择班级号',
          value: null
        }
      ];
      if(this.form_data.classType) {
        await this.listClass();
      } else {
        this.form_data.classNo = null;
      }
    },
    async listClass() {
      let res = await listClass({
        cls: {
          class_type_id: this.form_data.classType,
          institution_id: this.$store.getters['getStorage'].institution_id,
        },
      })
      if(res) {
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.classNoList.push({
              label: item.class_number+'班',
              value: item.id,
            })
          })
        }
      }
    },
    async addStudentClass() {
      if(this.form_data.classType && this.form_data.classNo) {
        let res = await addStudentClass({
          student_id: this.$route.query.id,
          class_id: this.form_data.classNo,
        })
        if(res) {
          console.log(res);
          if(res.data.code == 200 && res.data.body == 'OK') {
            messagePrompt(this, '添加成功', 'success', 2000);
            this.form_data.classNo = null;
            this.classNoList = [
              {
                label: '请选择班级号',
                value: null
              }
            ];
            await this.setStudent(this.$route.query.id);
            this.classDialogVisible = false;
          } else {
            messagePrompt(this, '添加失败', 'error', 2000);
          }
          return;
        }
      }
      messagePrompt(this, '请将信息选择完整', 'error', 2000);
    },
    async delStudentClass(cid) {
      let res = await deleteStudentClass({
        sid: this.$route.query.id,
        cid: cid,
      })
      if(res) {
        if(res.data.code == 200 && res.data.body == 'OK') {
          messagePrompt(this, '删除成功', 'success', 2000);
          this.form_data.classNo = null;
          this.classNoList = [
            {
              label: '请选择班级号',
              value: null
            }
          ];
          await this.setStudent(this.$route.query.id);
        }
      }
    },
    async saveStudent() {
      if(this.form_data.name && this.form_data.sex && this.form_data.age) {
        if(!this.update) {
          let res = await addStudent({
            name: this.form_data.name,
            sex: this.form_data.sex,
            tel: this.form_data.tel,
            age: this.form_data.age,
            institution_id: this.$store.getters['getStorage'].institution_id,
          });
          if(res) {
            console.log(res);
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '添加成功', 'success', 2000);
                this.$router.push('/dashboard/student/list');
                return;
              }
            }
          }
          messagePrompt(this, '添加失败', 'error', 1000);
        } else {
          let res = await updateStudent({
            id: this.$route.query.id,
            name: this.form_data.name,
            sex: this.form_data.sex,
            tel: this.form_data.tel,
            age: this.form_data.age,
            institution_id: this.$store.getters['getStorage'].institution_id,
          });

          if(res) {
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '修改成功', 'success', 2000);
                this.$router.push('/dashboard/student/list');
                return;
              }
            }
          }
          messagePrompt(this, '修改失败', 'error', 1000);
        }

      } else {
        messagePrompt(this, '请将信息填写完整', 'error', 1000);
      }
    },
    async setStudent(id) {
      let res = await findStudent({
        student_id: id
      });
      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          this.form_data.name = res.data.body.name;
          this.form_data.sex = res.data.body.sex;
          this.form_data.tel = res.data.body.tel;
          this.form_data.age = res.data.body.age;
          this.form_data.list = res.data.body.classes;
        }
      }
    },
  },
  async mounted() {
    await this.listClassType();
    if(this.$route.query.type && this.$route.query.id) {
      if(this.$route.query.type == 'detail') {
        this.showSub = false
      }
      if(this.$route.query.type == 'edit') {
        this.update = true;
      }
      this.add = false;
      await this.setStudent(this.$route.query.id);
    }
  }
}
</script>

<style scoped lang="scss">
  .add {
    padding: 0 20px;

    .add_wrapper {
      border: 1px solid #e6e6e6;

      .wrapper_head {
        background: #f0f6fb;
        padding: 13px;
        font: normal 400 12px/12px '微软雅黑';
        color: #686868;
        border-bottom: 1px solid #e6e6e6;
      }

      .wrapper_body {
        min-width: 630px;
        .bd_column {
          background: #ffffff;
          border-bottom: 1px solid #e6e6e6;
          display: flex;
          .title {
            width: 175px;
            border-right: 1px solid #e6e6e6;
            padding: 20px 0 20px 20px;
            font: normal 400 12px/25px '微软雅黑';
            color: #666666;
          }

          .info {
            display: flex;
            flex: 1;
            padding: 5px 0 0 20px;

            .el-select {
              width: 50%;
              min-width: 300px;
            }

            .el-input {
              width: 50%;
              min-width: 300px;
            }

            .el-button {
              margin-bottom: 5px;
            }
          }
        }

        .bd_column+.bd_column{

        }
      }
    }
  }

  .avatar-uploader i{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .amap {
    height: 300px;
  }
  .amap-page-container{
    position: relative;
  }
  .router-link-active{
    margin-left: 10px;
  }
</style>
