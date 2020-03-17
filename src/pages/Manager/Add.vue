<template>
  <div class="add">
    <OperateHint prompt="操作提示" content="根据平台运营要求添加管理员，要求信息真实、正确、有效。"></OperateHint>
    <div class="add_wrapper">
      <div class="wrapper_head">
        <span>添加/修改用户信息</span>
      </div>
      <div class="wrapper_body">
        <div class="bd_column">
          <div class="title">
            <span>角色：</span>
          </div>
          <div class="info">
            <el-select v-model="form_data.role" clearable placeholder="请选择" @change="changeRole">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>分机构：</span>
          </div>
          <div class="info">
            <el-select :disabled="disableIns" v-model="form_data.ins" clearable placeholder="请选择">
              <el-option
                v-for="item in insList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>真实姓名：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入真实姓名" v-model="form_data.name"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>账号：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入正确账号" v-model="form_data.account"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>密码：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入用户密码" v-model="form_data.password"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>性别：</span>
          </div>
          <div class="info">
            <el-select v-model="form_data.sex" clearable placeholder="请选择">
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
            <span>手机号码：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入手机号码" v-model="form_data.tel"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>邮箱：</span>
          </div>
          <div class="info">
            <el-input placeholder="请输入有效邮箱" v-model="form_data.email"></el-input>
          </div>
        </div>
        <div class="bd_column">
          <div class="title">
            <span>分管区域：</span>
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
            <span>个人信息：</span>
          </div>
          <div class="info">
            <el-input placeholder="请填写备注信息" v-model="form_data.info"></el-input>
          </div>
        </div>
        <div class="bd_column" v-if="showSub">
          <div class="title">
            <span></span>
          </div>
          <div class="info">
            <el-button type="primary" size="medium" @click="saveManager">保存用户</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OperateHint from '../../components/operatehint'
import {messagePrompt} from "../../utils/PublicUtil";
import {listRole, findRole} from "../../api/role";
import {listInstitution} from "../../api/institution";
import {addManager, findManager, updateManager} from "../../api/manager";
import {listProvince, listCity, listArea} from "../../api/region";

export default {
  name: "Add",
  data() {
    return {
      roleList: [
        {
          label: '请选择角色',
          value: null
        }
      ],
      insList: [
        {
          label: '请选择分机构',
          value: null
        }
      ],
      sexList: [
        {
          label: '请选择性别',
          value: null
        },
        {
          label: '女',
          value: '女'
        },
        {
          label: '男',
          value: '男'
        }
      ],
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
        role: null,
        ins: null,
        name: '',
        account: '',
        password: '',
        sex: null,
        tel: '',
        email: '',
        tempPro: null,
        tempCity: null,
        tempArea: null,
        province: null,
        city: null,
        area: null,
        info: '',
      },
      disableIns: false,
      showSub: true,
      update: false
    }
  },
  components: {
    OperateHint,
  },
  methods: {
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
    async saveManager() {
      if(this.form_data.role && this.form_data.name && this.form_data.account && this.form_data.password
        && this.form_data.sex && this.form_data.email && this.form_data.tel) {
        await this.getProperty();
        if(!this.update) {
          let res = await addManager({
            username: this.form_data.account,
            password: this.form_data.password,
            identify_type_id: this.form_data.role,
            institution_id: this.form_data.ins,
            province: this.form_data.tempPro,
            city: this.form_data.tempCity,
            area: this.form_data.tempArea,
            name: this.form_data.name,
            sex: this.form_data.sex,
            phone: this.form_data.tel,
            email: this.form_data.email,
            info: this.form_data.info
          });
          if(res) {
            console.log(res);
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                messagePrompt(this, '添加成功', 'success', 2000);
                this.$router.push('/dashboard/platform');
                return;
              }
            }
          }
          messagePrompt(this, '添加失败', 'error', 1000);
        } else {
          let res = await updateManager({
            id: this.$route.query.id,
            username: this.form_data.account,
            password: this.form_data.password,
            identify_type_id: this.form_data.role,
            institution_id: this.form_data.ins,
            province: this.form_data.tempPro,
            city: this.form_data.tempCity,
            area: this.form_data.tempArea,
            name: this.form_data.name,
            sex: this.form_data.sex,
            phone: this.form_data.tel,
            email: this.form_data.email,
            info: this.form_data.info
          });
          if(res) {
            console.log(res);
            if(res.data.code == 200) {
              if(res.data.body == 'OK') {
                if(this.$store.getters['getStorage'].id == this.$route.query.id) {
                  messagePrompt(this, '修改成功，请重新登录', 'success', 2000);
                  this.$store.dispatch('removeStorage');
                  this.$cookies.remove('passport');
                  this.$router.push('/login');
                  return;
                }
                messagePrompt(this, '修改成功', 'success', 2000);
                this.$router.push('/dashboard/platform');
                return;
              }
            }
          }
          messagePrompt(this, '修改失败', 'error', 1000);
        }
      }
      messagePrompt(this, '添加失败，请将信息填写完整', 'error', 1000);
      return;
    },
    async changeRole() {
      if(this.form_data.role) {
        let res = await findRole({
          role_id: this.form_data.role
        });
        if(res) {
          if(res.data.code == 200) {
            if(res.data.body.role.type == 'admin') {
              this.form_data.ins = null;
              this.disableIns = true;
            } else {
              this.disableIns = false;
            }
          }
        }
      } else {
        this.disableIns = false;
      }
    },
    async listRole() {
      let res = await listRole({

      });
      if(res) {
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.roleList.push({
              label: item.name,
              value: item.id
            });
          });
        }
      }
    },
    async listIns() {
      let res = await listInstitution({});
      if(res) {
        if(res.data.code == 200) {
          res.data.body.list.forEach((item) => {
            this.insList.push({
              label: item.name,
              value: item.id
            });
          });
        }
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
    async setManager(id) {
      let res = await findManager({
        manager_id: id
      });
      if(res) {
        if(res.data.code == 200) {
          this.form_data.role = res.data.body.identify_type.id;
          this.disableIns = res.data.body.identify_type.type=='admin'?true:false;
          this.form_data.ins = res.data.body.institution_id?res.data.body.institution.id:null;
          this.form_data.name = res.data.body.name;
          this.form_data.account = res.data.body.username;
          this.form_data.password = res.data.body.password;
          this.form_data.sex = res.data.body.sex;
          this.form_data.tel = res.data.body.phone;
          this.form_data.email = res.data.body.email;
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
          this.form_data.info = res.data.body.info;
        }
      }
    },
  },
  async mounted() {
    await this.listRole();
    await this.listIns();
    await this.listProvince();
    if(this.$route.query.type && this.$route.query.id) {
      if(this.$route.query.type == 'detail') {
        this.showSub = false
      }
      if(this.$route.query.type == 'edit') {
        this.update = true;
      }
      await this.setManager(this.$route.query.id);
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
