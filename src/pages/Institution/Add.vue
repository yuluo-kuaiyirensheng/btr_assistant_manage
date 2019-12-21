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

            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>机构名称：</span>
            </div>
            <div class="info">
              <el-input placeholder="请输入机构名称" v-model="form_data.name"></el-input>
            </div>
          </div>
          <div class="bd_column">
            <div class="title">
              <span>机构账号：</span>
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
                         style="width: 20%;min-width: 120px;">
                <el-option
                  v-for="item in provinceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="form_data.city" clearable placeholder="请选择"
                         style="width: 20%;min-width: 120px;">
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
              <el-input placeholder="请填写机构负责人邮箱" v-model="form_data.charge_info"></el-input>
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
              <el-input v-model="form_data.founder_phone"></el-input>
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
import {addInstitution, updateInstitution, findInstitution} from "../../api/institution";

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
        account: '',
        password: '',
        info: '',
        office_phone: '',
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
      update: false,
    }
  },
  components: {
    OperateHint,
  },
  methods: {
    async saveInstitution() {
      if(this.form_data.name && this.form_data.account && this.form_data.password && this.form_data.info && this.form_data.office_phone
          && this.form_data.charge_name && this.form_data.charge_tel && this.form_data.charge_email && this.form_data.founder_name
          && this.form_data.founder_phone) {

        if(!this.update) {
          let res = await addInstitution({
            name: this.form_data.name,
            info: this.form_data.info,
            office_phone: this.form_data.office_phone,
            province: this.form_data.province,
            city: this.form_data.city,
            area: this.form_data.area,
            charge_name: this.form_data.charge_name,
            charge_phone: this.form_data.charge_tel,
            charge_email: this.form_data.charge_email,
            charge_info: this.form_data.charge_info,
            founder_name: this.form_data.founder_name,
            founder_phone: this.form_data.founder_phone,
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
            id: this.$route.query.id,
            name: this.form_data.name,
            info: this.form_data.info,
            office_phone: this.form_data.office_phone,
            province: this.form_data.province,
            city: this.form_data.city,
            area: this.form_data.area,
            charge_name: this.form_data.charge_name,
            charge_phone: this.form_data.charge_tel,
            charge_email: this.form_data.charge_email,
            charge_info: this.form_data.charge_info,
            founder_name: this.form_data.founder_name,
            founder_phone: this.form_data.founder_phone,
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
    listProvince() {

    },
    listCity() {

    },
    listArea() {

    },
    async setInstitution(id) {
      let res = await findInstitution({
        institution_id: id
      });
      if(res) {
        console.log(res);
        if(res.data.code == 200) {
          this.form_data.name = res.data.body.name;
          this.form_data.info = res.data.body.info;
          this.form_data.office_phone = res.data.body.office_phone;
          this.form_data.province = res.data.body.province;
          this.form_data.city = res.data.body.city,
          this.form_data.area = res.data.body.area;
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
    if(this.$route.query.type && this.$route.query.id) {
      if(this.$route.query.type == 'detail') {
        this.showSub = false
      }
      if(this.$route.query.type == 'edit') {
        this.update = true;
      }
      await this.setInstitution(this.$route.query.id);
    } else {
      if (this.$store.getters['getStorage'] != null && this.$cookies.isKey('passport')) {
        if(this.$store.getters['getStorage'].identify_type.type == 'admin') {
          this.form_data.founder_name = this.$store.getters['getStorage'].identify_type.name;
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
</style>
