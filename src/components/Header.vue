<template>
  <div class="header">
    <div class="header_center">
      <div class="logo_title">
        拜特尔助教-后台管理系统
      </div>
      <div class="manager_info_bar" @mouseenter="isHover=true" @mouseleave="isHover=false">
        <div class="info_logo">
          系统管理员
          <i :class="!isHover?'el-icon-user':'el-icon-user-solid'"></i>
        </div>
        <div class="info">
          <el-dropdown @visible-change="isDropdown=!isDropdown">
              <span class="el-dropdown-link">
                {{this.$store.getters['getStorage'].name}}<i :class="!isDropdown? 'el-icon-caret-bottom':'el-icon-caret-top'"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="modifyPass">
                  <i class="el-icon-s-tools"></i>
                  修改密码
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="addManager">
                  <i class="el-icon-circle-plus"></i>
                  新增管理员
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="loginOut">
                  <i class="el-icon-error"></i>
                  退出
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {messagePrompt} from "../utils/PublicUtil";
    import {loginOut} from "../api/manager";

    export default {
        name: "Header",
        data() {
            return {
                isPrice: false,
                isDropdown: false,
                isHover: false,
            }
        },
        methods: {
            loginOut() {
                loginOut({
                    id: this.$store.getters['getStorage'].id,
                }).then((res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                        if (res.data.body == "OK") {
                            this.$store.dispatch('removeStorage');
                            this.$cookies.remove('passport');
                            this.$router.push('/login');
                        }
                    } else {
                      messagePrompt(this, '退出失败', 'error', 1000);
                    }
                });
            },
            modifyPass() {
                this.$router.push('/dashboard/manager/modify');
            },
            addManager() {
                this.$router.push('/dashboard/manager/add');
            }
        }
    }
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    border-bottom: 1px solid rgb(231, 231, 231);
    background: #1a9fe4;
    /*min-width: 1400px;*/
    /*min-width: 980px;*/

    .header_center {
      width: 98%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }

    .logo_title {
      font: normal 500 20px/50px '微软雅黑';
      color: #ffffff;
    }

    .manager_info_bar {
      display: flex;
      padding: 0 10px;
      align-items: center;

      .info_logo {
        color: #ffffff;
      }

      .info {
        margin-left: 8px;
      }

      &:hover {
        background: #158dcb;
        cursor: pointer;
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
