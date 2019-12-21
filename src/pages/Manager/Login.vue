<template>
    <div>
      <div class="title">河南拜特尔助教</div>
      <div class="bd">
        <div class="land">
          <img src="../../../static/images/maozi.png" style="margin-top: 52px;height: 430px">
          <div class="land_bc">
            <h1 class="lan_title">账号登录</h1>
            <p class="title_hc">用户名:</p>
            <div :class="user">
              <img src="../../../static/images/dl_sj.jpg" class="userImg">
              <input type="text" placeholder="用户名" v-model="land.username" class="userInput"
                     @focus="user = 'user userInputA'" @blur="user = 'user'" autocomplete="on">
            </div>
            <p class="error">{{errUname}}</p>
            <p class="title_hc">密码:</p>
            <div :class="users">
              <img src="../../../static/images/zc_yc.jpg" class="userImg">
              <input type="password" placeholder="密码" v-model="land.password" class="userInput "
                     @focus="users='user userInputA'" @blur="users = 'user'" autocomplete="on"
                     @keydown.enter="login">
            </div>
            <p class="error">{{errorPwd}}</p>
            <button class="subLand" @click="login">立即登录</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {login} from "../../api/manager";
import {messagePrompt} from '../../utils/PublicUtil'
export default {
  name: "Login",
  data() {
    return {
      errUname: '',
      errorPwd: '',
      user: "user",
      users: "user",
      isShow: false,
      land: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    //登录验证
    login() {
      if (!this.land.username) {
        this.errUname = "用户名不能为空";
        return;
      }
      this.errUname = ""

      if (!this.land.password) {
        this.errorPwd = "密码不能为空";
        return;
      }
      this.errorPwd = ""


      login({
        username: this.land.username,
        password: this.land.password,
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          res.data.body.manager.password = '******';
          this.$store.dispatch('setStorage', res.data.body.manager);
          this.$cookies.set("passport", res.data.body.passport, res.data.body.expire_time)
          this.$router.push('/dashboard');
        } else {
          messagePrompt(this, "用户名密码错误，请重试!", 'error', 1000);
          this.land.username = ''
          this.land.password = ''
        }
      });
    }
  }
}
</script>

<style scoped>
  .title {
    width: 1240px;
    line-height: 88px;
    font-weight: bold;
    font-size: 35px;
    text-align: center;
  }

  .bd {
    background-color: #169bd5;
    width: 100%;
    padding: 58px 0 127px;
    border-bottom: 4px solid #087bae;
    min-width: 1240px;
  }

  .title_hc {
    font-size: 16px;
    color: black;
    margin: 0 0 3px 5px;
  }

  .land {
    width: 1140px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .land_bc {
    width: 310px;
    padding: 0 59px 50px;
    background: #fff;
    border: 8px solid #8bcdea;
    border-radius: 30px;
  }

  .lan_title {
    margin: 67px 0 30px;
    color: #169bd5;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  .user {
    position: relative;
    border: 1px solid #e4e4e6;
    height: 40px;
    width: 258px;
    padding: 0 20px 0 35px;
  }

  .userImg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 7px;
  }

  .userInput {
    width: 100%;
    border: none;
    outline: none;
    height: 40px;
    font-size: 1rem;
    color: #495057;
  }

  .userInputA {
    transition: all .4s;
    -webkit-transition: all .4s;
    box-shadow: 0 0 0 3px rgba(22, 155, 213, .25);
  }

  .error {
    color: red;
    margin-left: 20px;
    font-size: 13px;
    line-height: 20px;
    height: 25px;
  }

  .subLand {
    background-color: #169bd5 !important;
    height: 47px;
    color: #fff;
    font-size: 22px;
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
    border: none;
  }

  .toRegister {
    padding: 20px 0;
    border-bottom: 1px dashed #e1e1e1;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }

  .toRegister span:hover {
    cursor: pointer;
  }

  .problem {
    font-size: 18px;
    font-weight: bold;
    color: #169bd5;
    padding: 20px 0 15px;
    display: flex;
    align-items: center;
  }

  .problem img {
    margin-right: 7px;
  }
</style>
