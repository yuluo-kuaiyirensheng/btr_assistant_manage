<template>
    <div class="add">
    <OperateHint prompt="操作提示" content="根据平台运营要求创建机构，要求信息真实、正确、有效。"></OperateHint>
    <div class="add_wrapper">
      <div class="wrapper_head">
        <span>考勤信息</span>
      </div>
      <div class="wrapper_body">
        <div class="bd_column">
          <div class="title">
            <span>学生姓名：</span>
          </div>
          <div class="info">
            <el-input v-model="form_data.student.name" disabled></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>所在班级：</span>
          </div>
          <div class="info">
            <el-input v-model="form_data.className" disabled></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>助教老师：</span>
          </div>
          <div class="info">
            <el-input v-model="form_data.teacher.name" disabled></el-input>
          </div>
        </div>
<!--        <div class="bd_column">-->
<!--          <div class="title">-->
<!--            <span>教授课时：</span>-->
<!--          </div>-->
<!--          <div class="info">-->
<!--            <el-input placeholder="请输入教授课时" v-model="form_data.attendance.teach_lesson_hour"></el-input>-->
<!--            <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">-->
<!--                <i class="el-icon-info"></i>-->
<!--                <span style="font-size: 13px;">-->
<!--                  单位为/每小时（此处修改会改变所有该次考勤学生的课时记录）-->
<!--                </span>-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="bd_column">-->
<!--          <div class="title">-->
<!--            <span>开始时间：</span>-->
<!--          </div>-->
<!--          <div class="info">-->
<!--            <el-date-picker-->
<!--              v-model="form_data.startTime"-->
<!--              type="datetime"-->
<!--              placeholder="选择日期时间" style="display: flex;align-items: center;">-->
<!--            </el-date-picker>-->
<!--            <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">-->
<!--                <i class="el-icon-info"></i>-->
<!--                <span style="font-size: 13px;">-->
<!--                  （此处修改会改变所有该次考勤学生的课时记录）-->
<!--                </span>-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="bd_column">-->
<!--          <div class="title">-->
<!--            <span>结束时间：</span>-->
<!--          </div>-->
<!--          <div class="info">-->
<!--            <el-date-picker-->
<!--              v-model="form_data.endTime"-->
<!--              type="datetime"-->
<!--              placeholder="选择日期时间" style="display: flex;align-items: center;">-->
<!--            </el-date-picker>-->
<!--            <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">-->
<!--                <i class="el-icon-info"></i>-->
<!--                <span style="font-size: 13px;">-->
<!--                  （此处修改会改变所有该次考勤学生的课时记录）-->
<!--                </span>-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->
        <div class="bd_column">
          <div class="title">
            <span>考勤状态：</span>
          </div>
          <div class="info">
            <el-select v-model="form_data.condition" placeholder="请选择">
              <el-option
                v-for="item in conditionList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>本次考勤：</span>
          </div>
          <div class="info">
            <el-button type="text" @click="attendanceDialogVisible = true">点击查看详情</el-button>
            <el-dialog
              title="提示"
              :visible.sync="attendanceDialogVisible"
              width="70%"
              center>
              <template slot-scope="scope" >
                <div class="wrapper_body">
                  <div class="bd_column">
                    <div class="title">
                      <span>本次教授课时：</span>
                    </div>
                    <div class="info">
                      <el-input placeholder="请输入教授课时" v-model="form_data.teach_lesson_hour"></el-input>
                      <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">
                          <i class="el-icon-info"></i>
                          <span style="font-size: 13px;">
                            单位/小时（此处修改会改变所有该次考勤学生的课时记录）
                          </span>
                      </span>
                    </div>
                  </div>
                  <div class="bd_column">
                    <div class="title">
                      <span>开始时间：</span>
                    </div>
                    <div class="info">
                      <el-date-picker
                        v-model="form_data.startTime"
                        type="datetime"
                        placeholder="选择日期时间" style="display: flex;align-items: center;">
                      </el-date-picker>
                      <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">
                          <i class="el-icon-info"></i>
                          <span style="font-size: 13px;">
                            （此处修改会改变所有该次考勤学生的课时记录）
                          </span>
                      </span>
                    </div>
                  </div>
                  <div class="bd_column">
                    <div class="title">
                      <span>结束时间：</span>
                    </div>
                    <div class="info">
                      <el-date-picker
                        v-model="form_data.endTime"
                        type="datetime"
                        placeholder="选择日期时间" style="display: flex;align-items: center;">
                      </el-date-picker>
                      <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">
                          <i class="el-icon-info"></i>
                          <span style="font-size: 13px;">
                            （此处修改会改变所有该次考勤学生的课时记录）
                          </span>
                      </span>
                    </div>
                  </div>
                  <div class="bd_column" v-if="showSub">
                    <div class="title">
                      <span></span>
                    </div>
                    <div class="info">
                      <el-button type="primary" size="medium" @click="updateAttendance">确认修改</el-button>
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
            <el-button type="primary" size="medium" @click="saveAttendance">保存考勤</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
import {messagePrompt} from "../../utils/PublicUtil";
import {addStudentAttendance, findStudentAttendance, updateStudentAttendance} from "../../api/studentAttendance";
import {listStatus} from "../../api/status";
import {updateAttendance} from "../../api/attendance";

export default {
  name: "Add",
  components: {
    OperateHint,
  },
  data() {
    return {
      conditionList: [
        {
          label: '请选择到课情况',
          value: null
        }
      ],
      attendanceDialogVisible: false,
      form_data: {
        className: '',
        condition: null,
        startTime: null,
        teach_lesson_hour: null,
        endTime: null,
        attendance: {},
        class: {},
        teacher: {},
        student: {},
      },
      showSub: true,
      showInsName: false,
      update: false,
      uploadFile: {},
      host: '',
    }
  },
  methods: {
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
    async updateAttendance() {
      let res = await updateAttendance({
        id: this.form_data.attendance.id,
        teach_lesson_hour: this.form_data.teach_lesson_hour,
        start_time: new Date(this.form_data.startTime).getFullYear()+'-'+new Date(this.form_data.startTime).getMonth()+'-'+new Date(this.form_data.startTime).getDate()+' '
        +new Date(this.form_data.startTime).getHours()+':'+new Date(this.form_data.startTime).getMinutes()+':'+new Date(this.form_data.startTime).getSeconds(),
        end_time: new Date(this.form_data.endTime).getFullYear()+'-'+new Date(this.form_data.endTime).getMonth()+'-'+new Date(this.form_data.endTime).getDate()+' '
          +new Date(this.form_data.endTime).getHours()+':'+new Date(this.form_data.endTime).getMinutes()+':'+new Date(this.form_data.endTime).getSeconds(),
      })
      if(res) {
        console.log(res);
        if(res.data.code == 200 && res.data.body == 'OK') {
          messagePrompt(this, '修改成功', 'success', 2000);
          await this.setAttendance(this.$route.query.id);
          this.attendanceDialogVisible = false;
        } else {
          messagePrompt(this, '修改失败', 'error', 2000);
        }
        return;
      }
      messagePrompt(this, '请将信息选择完整', 'error', 2000);
    },
    async saveAttendance() {
      if(this.form_data.condition) {
        if(!this.update) {
          let res = await addStudentAttendance({

          });
          if(res) {
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '添加成功', 'success', 2000);
                this.$router.push('/dashboard/attendance/list');
                return;
              }
            }
          }
          messagePrompt(this, '添加失败', 'error', 1000);
        } else {
          let res = await updateStudentAttendance({
            id: this.$route.query.id,
            status_id: this.form_data.condition,
          });

          if(res) {
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '修改成功', 'success', 2000);
                this.$router.push('/dashboard/attendance/list');
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
    async setAttendance(id) {
      let res = await findStudentAttendance({
        student_attendance_id: id
      });
      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          this.form_data.student = res.data.body.student;
          this.form_data.class = res.data.body.attendance.cls;
          this.form_data.className = res.data.body.attendance.cls.class_type.name+res.data.body.attendance.cls.class_number+"班";
          this.form_data.teacher = res.data.body.attendance.teacher;
          this.form_data.attendance = res.data.body.attendance;
          this.form_data.condition = res.data.body.status.id;
          this.form_data.startTime = res.data.body.attendance.start_time;
          this.form_data.endTime = res.data.body.attendance.end_time;
          this.form_data.teach_lesson_hour = res.data.body.attendance.teach_lesson_hour;
        }
      }
    },
  },
  async mounted() {
    await this.listCondition();
    if(this.$route.query.type && this.$route.query.id) {
      if(this.$route.query.type == 'detail') {
        this.showSub = false
      }
      if(this.$route.query.type == 'edit') {
        this.update = true;
      }
      await this.setAttendance(this.$route.query.id);
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
</style>
