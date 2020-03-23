<template>
    <div class="add">
    <OperateHint prompt="操作提示" content="根据平台运营要求创建机构，要求信息真实、正确、有效。"></OperateHint>
    <div class="add_wrapper">
      <div class="wrapper_head">
        <span>创建助教</span>
      </div>
      <div class="wrapper_body">
        <div class="bd_column">
          <div class="title">
            <span>助教头像：</span>
          </div>
          <div class="info">
            <el-upload
              class="avatar-uploader"
              :action="host"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="this.form_data.portrait_url" :src="'api/upload/'+this.form_data.portrait_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div style="display: flex;flex-direction: column;align-items: center;margin-left: 20px;">
              <img :src="'api/upload/'+form_data.default_portrait_url" alt="默认logo"
                   style="width:165px;height:165px;border: 1px dashed #d9d9d9;border-radius: 5px;">
              <span style="font-size: 12px;color: #d9d9d9;">默认头像</span>
            </div>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>助教名称：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入助教名称" v-model="form_data.name"></el-input>
            <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">
                <i class="el-icon-info"></i>
                <span style="font-size: 13px;">
                  该字段具有合法性，请慎重考虑！
                </span>
            </span>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>助教手机号：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入正确手机号" v-model="form_data.phone"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>教授班级：</span>
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
                      <el-button type="text" size="small" @click="delTaughtClass(scope.row.id)">删除</el-button>
                    </template>
                  </af-table-column>
                </el-table>
              </template>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" plain
                           icon="el-icon-plus" @click="taughtClassDialogVisible = true">添加班级</el-button>
                <el-button @click="classesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="classesDialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="提示"
              :visible.sync="taughtClassDialogVisible"
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
                      <el-button type="primary" size="medium" @click="addTaughtClass">确认添加</el-button>
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
            <el-button type="primary" size="medium" @click="saveTeacher">保存助教</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
import {messagePrompt} from "../../utils/PublicUtil"
import {addTeacher, updateTeacher, findTeacher} from "../../api/teacher";
import {addManageClass, delManageClass} from "../../api/manageClass";
import {listClassType} from "../../api/classType";
import {listClass} from "../../api/class";

export default {
  name: "Add",
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
      classesDialogVisible: false,
      taughtClassDialogVisible: false,
      form_data: {
        classType: null,
        classNo: null,
        phone: '',
        name: '',
        portrait_url: '',
        default_portrait_url: 'default_portrait.png',
        list: []
      },
      showSub: true,
      showInsName: false,
      update: false,
      uploadFile: {},
      host: '',
    }
  },
  components: {
    OperateHint,
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form_data.portrait_url = res.body.filename;
      this.uploadFile = {};
      this.host = '';
    },
    async beforeAvatarUpload(file) {
      const isValidate = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isValidate) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if(isValidate && isLt2M) {
        this.host = "api/file/upload";
        return true;
      } else {
        return false;
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
    async addTaughtClass() {
      if(this.form_data.classType && this.form_data.classNo) {
        let res = await addManageClass({
          teacher_id: this.$route.query.id,
          class_id: this.form_data.classNo,
        })
        if(res) {
          console.log(res);
          if(res.data.code == 200 && res.data.body == 'OK') {
            messagePrompt(this, '添加成功', 'success', 2000);
            await this.setTeacher(this.$route.query.id);
            this.taughtClassDialogVisible = false;
          } else {
            messagePrompt(this, '添加失败', 'error', 2000);
          }
          return;
        }
      }
      messagePrompt(this, '请将信息选择完整', 'error', 2000);
    },
    async delTaughtClass(cid) {
      let res = await delManageClass({
        tid: this.$route.query.id,
        cid: cid,
      })
      if(res) {
        if(res.data.code == 200 && res.data.body == 'OK') {
          messagePrompt(this, '删除成功', 'success', 2000);
          this.setTeacher(this.$route.query.id);
        }
      }
    },
    async saveTeacher() {
      if(!this.form_data.logo_url) {
        this.form_data.portrait_url=this.form_data.default_portrait_url;
      }
      if(this.form_data.name && this.form_data.portrait_url && this.form_data.phone) {
        if(!this.update) {
          let res = await addTeacher({
            portrait_url: this.form_data.portrait_url,
            phone: this.form_data.phone,
            name: this.form_data.name,
            institution_id: this.$store.getters['getStorage'].institution_id,
          });
          if(res) {
            console.log(res);
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '添加成功', 'success', 2000);
                this.$router.push('/dashboard/teacher/list');
                return;
              }
            }
          }
          messagePrompt(this, '添加失败', 'error', 1000);
        } else {
          let res = await updateTeacher({
            id: this.$route.query.id,
            portrait_url: this.form_data.portrait_url,
            phone: this.form_data.phone,
            name: this.form_data.name,
            institution_id: this.$store.getters['getStorage'].institution_id,
          });

          if(res) {
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '修改成功', 'success', 2000);
                this.$router.push('/dashboard/teacher/list');
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
    async setTeacher(id) {
      let res = await findTeacher({
        teacher_id: id
      });
      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          this.form_data.portrait_url = res.data.body.portrait_url?res.data.body.portrait_url:'';
          this.form_data.name = res.data.body.name;
          this.form_data.phone = res.data.body.phone;
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
      await this.setTeacher(this.$route.query.id);
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
