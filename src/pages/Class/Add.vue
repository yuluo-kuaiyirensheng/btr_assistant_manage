<template>
    <div class="add">
    <OperateHint prompt="操作提示" content="根据平台运营要求创建机构，要求信息真实、正确、有效。"></OperateHint>
    <div class="add_wrapper">
      <div class="wrapper_head">
        <span>创建班级</span>
      </div>
      <div class="wrapper_body">
        <div class="bd_column">
          <div class="title">
            <span>班级类型：</span>
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
            <span>班级号：</span>
          </div>
          <div class="info">
            <el-select v-model="form_data.classNo" clearable placeholder="请选择"
                       style="width: 30%;min-width: 120px;">
              <el-option
                v-for="item in classNoList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="请输入班级号" v-model="form_data.classNumber" @blur="validateClassNo"
                      style="width: 30%;min-width: 120px;"></el-input>
            <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;" v-if="showClassNo">
                <i class="el-icon-info"></i>
                <span style="font-size: 13px;">
                  该班级号已存在！
                </span>
            </span>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>学生人数：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入学生人数" v-model="form_data.studentNum"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>已授课时：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入已授课时" v-model="form_data.taughtLessonHour"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>总共课时：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入已授课时" v-model="form_data.totalLessonHour"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>上课时间：</span>
          </div>
          <div class="info">
            <el-time-picker
              v-model="form_data.startTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点" style="display: flex;align-items: center;">
            </el-time-picker>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>下课时间：</span>
          </div>
          <div class="info">
            <el-time-picker
              v-model="form_data.endTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点" style="display: flex;align-items: center;">
            </el-time-picker>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>助教老师：</span>
          </div>
          <div class="info">
            <el-button type="text" @click="teachersDialogVisible = true">点击查看详情</el-button>
            <el-dialog
              title="提示"
              :visible.sync="teachersDialogVisible"
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
                    prop="name"
                    label="姓名"
                    min-width="1"
                    align="center"
                    fit>
                  </af-table-column>
                  <af-table-column
                    label="头像"
                    width="120"
                    align="center"
                    fit>
                    <template slot-scope="scope" v-if="scope.row.portrait_url">
                      <img :src="'api/upload/'+scope.row.portrait_url" style="width:100px;height:100px;">
                    </template>
                  </af-table-column>
                  <af-table-column
                    prop="phone"
                    label="手机号"
                    min-width="1"
                    align="center"
                    fit>
                  </af-table-column>
                  <af-table-column
                    label="操作"
                    width="200"
                    fit
                    fixed="right">
                    <template slot-scope="scope" v-if="$store.getters['getStorage'].identify_type.type == 'branchManager'">
                      <el-button type="text" size="small" @click="delTeacher(scope.row.id)">删除</el-button>
                    </template>
                  </af-table-column>
                </el-table>
              </template>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" plain
                           icon="el-icon-plus" @click="teacherDialogVisible = true">添加班级</el-button>
                <el-button @click="teachersDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="teachersDialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="提示"
              :visible.sync="teacherDialogVisible"
              width="70%"
              center>
              <template slot-scope="scope" >
                <div class="wrapper_body">
                  <div class="bd_column">
                    <div class="title">
                      <span>选择任教老师：</span>
                    </div>
                    <div class="info">
                      <el-select v-model="form_data.teacher" clearable placeholder="请选择"
                                 style="width: 50%;min-width: 120px;">
                        <el-option
                          v-for="item in teacherList"
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
                      <el-button type="primary" size="medium" @click="addTeacher">确认添加</el-button>
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
            <el-button type="primary" size="medium" @click="saveClass">保存班级</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
import {messagePrompt} from "../../utils/PublicUtil"
import {addClass, updateClass, findClass, validateClassNo} from "../../api/class";
import {listClassType} from "../../api/classType";
import {listClass} from "../../api/class";
import {addManageClass, delManageClass} from "../../api/manageClass";
import {listTeacher} from "../../api/teacher";

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
          value: null,
        }
      ],
      classNoList: [
        {
          label: '已有班级号',
          value: null
        }
      ],
      teacherList: [
        {
          label: '请选择助教老师',
          value: null
        }
      ],
      teachersDialogVisible: false,
      teacherDialogVisible: false,
      form_data: {
        teacher: null,
        classType: null,
        classNo: null,
        classNumber: null,
        studentNum: null,
        taughtLessonHour: 0,
        totalLessonHour: null,
        startTime: null,
        endTime: null,
        list: []
      },
      showSub: true,
      showClassNo: false,
      update: false,
      uploadFile: {},
      host: '',
    }
  },
  methods: {
    async listTeacher() {
      let res = await listTeacher({
        teacher: {
          institution_id: this.$store.getters['getStorage'].institution_id,
        }
      })
      if(res) {
        console.log(res)
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.teacherList.push({
              label: item.name,
              value: item.id,
            })
          })
        }
      }
    },
    async addTeacher() {
      if(this.form_data.teacher) {
        let res = await addManageClass({
          teacher_id: this.form_data.teacher,
          class_id: this.$route.query.id,
        })
        if(res) {
          console.log(res);
          if(res.data.code == 200 && res.data.body == 'OK') {
            messagePrompt(this, '添加成功', 'success', 2000);
            this.classNoList = [
              {
                label: '已有班级号',
                value: null
              }
            ];
            await this.setClass(this.$route.query.id);
            this.teacherDialogVisible = false;
          } else {
            messagePrompt(this, '添加失败', 'error', 2000);
          }
          return;
        }
      }
      messagePrompt(this, '请将信息选择完整', 'error', 2000);
    },
    async delTeacher(tid) {
      let res = await delManageClass({
        tid: tid,
        cid: this.$route.query.id,
      })
      if(res) {
        if(res.data.code == 200 && res.data.body == 'OK') {
          messagePrompt(this, '删除成功', 'success', 2000);
          this.classNoList = [
            {
              label: '已有班级号',
              value: null
            }
          ];
          await this.setClass(this.$route.query.id);
        }
      }
    },
    async validateClassNo() {
      if(this.form_data.classNumber) {
        let res = await validateClassNo({
          classTypeId: this.form_data.classType,
          classNo: this.form_data.classNumber,
          institutionId: this.$store.getters['getStorage'].institution_id,
        })

        if(res) {
          console.log(res)
          if(res.data.code == 200) {
            this.showClassNo = !res.data.body.exist;
            if(this.showClassNo) {
              this.form_data.classNumber = null;
            }
          }
        }
      }
    },
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
          label: '已有班级号',
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
              value: item.class_number,
            })
          })
        }
      }
    },
    async saveClass() {
      this.form_data.classNumber=this.form_data.classNumber?this.form_data.classNumber:this.form_data.classNo;
      if(this.form_data.classType && this.form_data.classNumber && this.form_data.studentNum && this.form_data.taughtLessonHour!=null
          && this.form_data.totalLessonHour && this.form_data.startTime && this.form_data.endTime) {
        if(!this.update) {
          let res = await addClass({
            class_type_id: this.form_data.classType,
            class_number: this.form_data.classNumber,
            student_number: this.form_data.studentNum,
            taught_lesson_hour: this.form_data.taughtLessonHour,
            total_lesson_hour: this.form_data.totalLessonHour,
            start_time: this.form_data.startTime,
            end_time: this.form_data.endTime,
            institution_id: this.$store.getters['getStorage'].institution_id,
          });
          if(res) {
            console.log(res);
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '添加成功', 'success', 2000);
                this.$router.push('/dashboard/class/list');
                return;
              }
            }
          }
          messagePrompt(this, '添加失败', 'error', 1000);
        } else {
          let res = await updateClass({
            id: this.$route.query.id,
            class_type_id: this.form_data.classType,
            class_number: this.form_data.classNumber,
            student_number: this.form_data.studentNum,
            taught_lesson_hour: this.form_data.taughtLessonHour,
            total_lesson_hour: this.form_data.totalLessonHour,
            start_time: this.form_data.startTime,
            end_time: this.form_data.endTime,
            institution_id: this.$store.getters['getStorage'].institution_id,
          });

          if(res) {
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '修改成功', 'success', 2000);
                this.$router.push('/dashboard/class/list');
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
    async setClass(id) {
      let res = await findClass({
        class_id: id
      });
      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          this.form_data.classType = res.data.body.class_type_id;
          await this.listClass();
          this.form_data.classNo = res.data.body.class_number;
          this.form_data.studentNum = res.data.body.student_number;
          this.form_data.taughtLessonHour = res.data.body.taught_lesson_hour;
          this.form_data.totalLessonHour = res.data.body.total_lesson_hour;
          this.form_data.startTime = res.data.body.start_time;
          this.form_data.endTime = res.data.body.end_time;
          this.form_data.list = res.data.body.teachers;
        }
      }
    },
  },
  async mounted() {
    await this.listClassType();
    await this.listTeacher();
    if(this.$route.query.type && this.$route.query.id) {
      if(this.$route.query.type == 'detail') {
        this.showSub = false
      }
      if(this.$route.query.type == 'edit') {
        this.update = true;
      }
      await this.setClass(this.$route.query.id);
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
