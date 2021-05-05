<template>
  <div class="login">
    <h1>欢迎登录</h1>
    <div class="form">
      <div class="item">
        <span class="iconfont icon-user"></span>
        <input type="text" placeholder="手机号码" v-model="phone" />
      </div>
      <div class="item">
        <span class="iconfont icon-user"></span>
        <input type="text" placeholder="验证码" v-model="passw" />
        <!-- <button class="getCode" @click="getCode">发送</button> -->
      </div>
      <div class="item">
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
// import {getCaptcha,getCaptchaVerify} from "../../api/base"
// import {getCaptcha} from "../../api/base"
import { pass } from "../../api/base";
import { Notify } from "vant";
export default {
  data() {
    return {
      phone: "",
      passw: ""
    };
  },
  methods: {
    submit() {
      pass(this.phone, this.passw).then(data => {
        if (data.code == 200) {
          Notify({ type: "success", message: "登录成功" });
          //   window.localStorage.setItem("login", "true");
          // this.$store.commit("setLogin");
          this.$router.push("/recommend");
          console.log(111);
        } else {
          Notify({ type: "warning", message: "登录失败" });
          console.log("登录失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background: #d4473c;
  width: 100%;
  height: 100%;
  color: #fff;
}
h1 {
  font-size: 48px;
  text-align: center;
  height: 48px;
  padding: 203px 0 85px 0;
}
.form {
  .item {
    width: 76%;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    background-color: #f47378;
    border-radius: 30px;
    margin-bottom: 24px;
    input {
      background-color: transparent;
      border: 0px;
      outline: none;
      text-indent: 0.5em;
      font-size: 25px;
      color: #fff;
    }
    span {
      font-size: 40px;
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
    }
    .getCode {
      border: 1px solid #fff;
      height: 40px;
      line-height: 40px;
      width: 100px;
      text-align: center;
      border-radius: 20px;
      color: #d4473c;
      font-size: 20px;
      background-color: #fff;
    }
    .submit {
      font-size: 30px;
      background-color: #fff;
      text-align: center;
      color: #d4473c;
      border-radius: 30px;
    }
  }
}
</style>
