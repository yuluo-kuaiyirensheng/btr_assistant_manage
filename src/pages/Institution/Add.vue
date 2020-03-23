<template>
    <div class="add">
      <OperateHint prompt="操作提示" content="根据平台运营要求创建机构，要求信息真实、正确、有效。"></OperateHint>
      <div class="add_wrapper">
        <div class="wrapper_head">
          <span>创建机构</span>
        </div>
        <div class="wrapper_body">
          <div class="bd_column">
            <div class="title">
              <span>机构封面：</span>
            </div>
            <div class="info">
              <el-upload
                class="avatar-uploader"
                :action="host"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="this.form_data.logo_url" :src="'api/upload/'+this.form_data.logo_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div style="display: flex;flex-direction: column;align-items: center;margin-left: 20px;">
                <img :src="'api/upload/'+form_data.default_logo_url" alt="默认logo"
                     style="width:165px;height:165px;border: 1px dashed #d9d9d9;border-radius: 5px;">
                <span style="font-size: 12px;color: #d9d9d9;">默认图片</span>
              </div>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>机构名称：</span>
            </div>
            <div class="info">
              <el-input placeholder="请输入机构名称" v-model="form_data.name" @blur="validateInsName"></el-input>
              <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;" v-if="showInsName">
                <i class="el-icon-info"></i>
                <span style="font-size: 13px;">
                  该机构已存在，请慎重考虑！
                </span>
              </span>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>机构账号：</span>
            </div>
            <div class="info">
              <el-input placeholder="请输入正确账号" v-model="form_data.account" disabled></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>密码：</span>
            </div>
            <div class="info">
              <el-input placeholder="请输入用户密码" v-model="form_data.password" disabled></el-input>
              <span style="padding: 5px 0 0 10px; color: rgb(51,144,255);font-size: 18px;">
                <i class="el-icon-info"></i>
                <span style="font-size: 13px;">
                  创建公司请提前保存您的密码！
                </span>
              </span>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>机构基本信息：</span>
            </div>
            <div class="info">
              <el-input placeholder="请输入机构基本信息" v-model="form_data.info"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>办公电话：</span>
            </div>
            <div class="info">
              <el-input placeholder="请输入办公电话" v-model="form_data.office_phone"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>地址：</span>
            </div>
            <div class="info">
              <el-select v-model="form_data.province" clearable placeholder="请选择"
                         style="width: 20%;min-width: 120px;" @change="changeProvince">
                <el-option
                  v-for="item in provinceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="form_data.city" clearable placeholder="请选择"
                         style="width: 20%;min-width: 120px;" @change="changeCity">
                <el-option
                  v-for="item in cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="form_data.area" clearable placeholder="请选择"
                         style="width: 20%;min-width: 120px;">
                <el-option
                  v-for="item in areaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>负责人：</span>
            </div>
            <div class="info">
              <el-input placeholder="请填写机构负责人" v-model="form_data.charge_name"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>手机：</span>
            </div>
            <div class="info">
              <el-input placeholder="请填写机构负责人手机号" v-model="form_data.charge_tel"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>邮箱：</span>
            </div>
            <div class="info">
              <el-input placeholder="请填写机构负责人邮箱" v-model="form_data.charge_email"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>其他信息：</span>
            </div>
            <div class="info">
              <el-input placeholder="请填写机构负责人其他信息" v-model="form_data.charge_info"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>创建人：</span>
            </div>
            <div class="info">
              <el-input disabled v-model="form_data.founder_name"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>创建人电话：</span>
            </div>
            <div class="info">
              <el-input placeholder="请填写创建人电话" v-model="form_data.founder_phone"></el-input>
            </div>
          </div>
          <div class="bd_column" v-if="showSub">
            <div class="title">
              <span></span>
            </div>
            <div class="info">
              <el-button type="primary" size="medium" @click="saveInstitution">保存用户</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
import {messagePrompt} from "../../utils/PublicUtil";
import {addInstitution, updateInstitution, findInstitution, validateInsName, generatePass} from "../../api/institution";
import {listProvince, listCity, listArea} from "../../api/region";

export default {
  name: "Add",
  data() {
    return {
      provinceList: [
        {
          label: '请选择省',
          value: null,
        }
      ],
      cityList: [
        {
          label: '请选择市',
          value: null,
        }
      ],
      areaList: [
        {
          label: '请选择区',
          value: null,
        }
      ],
      form_data: {
        name: '',
        logo_url: '',
        default_logo_url: 'default.png',
        account: '',
        password: '',
        info: '',
        office_phone: '',
        tempPro: null,
        tempCity: null,
        tempArea: null,
        province: null,
        city: null,
        area: null,
        charge_name: '',
        charge_tel: '',
        charge_email: '',
        charge_info: '',
        founder_name: '',
        founder_phone: '',
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
      this.form_data.logo_url = res.body.filename;
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
    async validateInsName() {
      let res = await validateInsName({
        name: this.form_data.name
      })
      if(res) {
        if(res.data.code == 200) {
          this.showInsName = res.data.body.exist;
          this.form_data.account = res.data.body.account;
        } else {
          this.showInsName = false;
          this.form_data.account = null;
        }
      }
    },
    async getProperty() {
      this.provinceList.forEach((item) => {
        if(item.value == this.form_data.province) {
          this.form_data.tempPro = item.label;
        }
      });
      this.cityList.forEach((item) => {
        if(item.value == this.form_data.city) {
          this.form_data.tempCity = item.label;
        }
      });
      this.areaList.forEach((item) => {
        if(item.value == this.form_data.area) {
          this.form_data.tempArea = item.label;
        }
      });
    },
    async saveInstitution() {
      if(!this.form_data.logo_url) {
        this.form_data.logo_url=this.form_data.default_logo_url;
      }
      if(this.form_data.name && this.form_data.logo_url && this.form_data.account && this.form_data.password
          ) {
        await this.getProperty();
        if(!this.update) {
          let res = await addInstitution({
            institution: {
              name: this.form_data.name,
              logo_url: this.form_data.logo_url,
              info: this.form_data.info,
              office_phone: this.form_data.office_phone,
              province: this.form_data.tempPro,
              city: this.form_data.tempCity,
              area: this.form_data.tempArea,
              charge_name: this.form_data.charge_name,
              charge_phone: this.form_data.charge_tel,
              charge_email: this.form_data.charge_email,
              charge_info: this.form_data.charge_info,
              founder_name: this.form_data.founder_name,
              founder_phone: this.form_data.founder_phone,
            },
            manager: {
              username: this.form_data.account,
              password: this.form_data.password,
            }
          });
          if(res) {
            console.log(res);
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '添加成功', 'success', 2000);
                this.$router.push('/dashboard/platform/institution/list');
                return;
              }
            }
          }
          messagePrompt(this, '添加失败', 'error', 1000);
        } else {
          let res = await updateInstitution({
            institution: {
              id: this.$route.query.id,
              name: this.form_data.name,
              logo_url: this.form_data.logo_url,
              info: this.form_data.info,
              office_phone: this.form_data.office_phone,
              province: this.form_data.tempPro,
              city: this.form_data.tempCity,
              area: this.form_data.tempArea,
              charge_name: this.form_data.charge_name,
              charge_phone: this.form_data.charge_tel,
              charge_email: this.form_data.charge_email,
              charge_info: this.form_data.charge_info,
              founder_name: this.form_data.founder_name,
              founder_phone: this.form_data.founder_phone,
            },
            manager: {
              username: this.form_data.account,
              password: this.form_data.password,
            }
          });

          if(res) {
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '修改成功', 'success', 2000);
                this.$router.push('/dashboard/platform/institution/list');
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
    async changeProvince() {
      this.cityList = [
        {
          label: '请选择市',
          value: null,
        }
      ];
      this.form_data.city = null;
      this.areaList = [
        {
          label: '请选择区',
          value: null,
        }
      ];
      this.form_data.area = null;
      if(this.form_data.province) {
        await this.listCity();
      }
    },
    async listProvince() {
      let res = await listProvince({

      })
      if(res && res.data.message == 'query ok') {
        res.data.result[0].forEach((item) => {
          this.provinceList.push({
            label: item.fullname,
            value: item.id,
          });
        })
      }
    },
    async changeCity() {
      this.areaList = [
        {
          label: '请选择区',
          value: null,
        }
      ];
      this.form_data.area = null;
      if(this.form_data.city) {
        await this.listArea();
      }
    },
    async listCity() {
      let res = await listCity({
        id: this.form_data.province,
      })
      if(res && res.data.message == 'query ok') {
        res.data.result[0].forEach((item) => {
          this.cityList.push({
            label: item.fullname,
            value: item.id,
          })
        })
      }
    },
    async listArea() {
      let res = await listArea({
        id: this.form_data.city,
      })
      if(res && res.data.message == 'query ok') {
        res.data.result[0].forEach((item) => {
          this.areaList.push({
            label: item.fullname,
            value: item.id,
          })
        })
      }
    },
    async setInstitution(id) {
      let res = await findInstitution({
        institution_id: id
      });
      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          this.form_data.name = res.data.body.name;
          this.form_data.logo_url = res.data.body.logo_url?res.data.body.logo_url:'';
          this.form_data.account = res.data.body.list[0].username;
          this.form_data.password = res.data.body.list[0].password;
          this.form_data.info = res.data.body.info;
          this.form_data.office_phone = res.data.body.office_phone;
          if(res.data.body.province) {
            this.provinceList.forEach((item) => {
              if(item.label == res.data.body.province) {
                this.form_data.province = item.value;
              }
            })
            await this.listCity();
            this.cityList.forEach((item) => {
              if(item.label == res.data.body.city) {
                this.form_data.city = item.value;
              }
            })
            await this.listArea();
            this.areaList.forEach((item) => {
              if(item.label == res.data.body.area) {
                this.form_data.area = item.value;
              }
            })
          }
          this.form_data.charge_name = res.data.body.charge_name;
          this.form_data.charge_tel = res.data.body.charge_phone;
          this.form_data.charge_email = res.data.body.charge_email;
          this.form_data.charge_info = res.data.body.charge_info;
          this.form_data.founder_name = res.data.body.founder_name;
          this.form_data.founder_phone = res.data.body.founder_phone;
        }
      }
    },
  },
  async mounted() {
    await this.listProvince();
    if(this.$route.query.type && this.$route.query.id) {
      if(this.$route.query.type == 'detail') {
        this.showSub = false
      }
      if(this.$route.query.type == 'edit') {
        this.update = true;
      }
      await this.setInstitution(this.$route.query.id);
    } else {
      let res = await generatePass({})
      if(res) {
        if(res.data.code == 200) {
          this.form_data.password = res.data.body.pass;
        }
      }
      if (this.$store.getters['getStorage'] != null && this.$cookies.isKey('passport')) {
        if(this.$store.getters['getStorage'].identify_type.type == 'admin') {
          this.form_data.founder_name = this.$store.getters['getStorage'].name;
        }
      }
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
