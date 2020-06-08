<template>
  <div class="container">
    <div class="login_form">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <p>用户名</p>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="请输入用户名"
            ref="usernameInput"
            @keyup.enter.native="toPassword"
          ></el-input>
        </el-form-item>
        <p>密码</p>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入密码"
            ref="passwordInput"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        username: "",
        checked: false
      },
      rules: {
        pass: [{ validator: checkPassword, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }]
      },
    };
  },
  mounted() {
    // this.usernameInputFocus()
    // window.history.forward(1)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.login({
            username: this.ruleForm.username,
            password: this.$md5(this.ruleForm.pass)
          }).then( r => {
            if( r.code === 10000) {
              this.$message({
                message: '登录成功',
                type: 'success',
              })
            VueCookies.set("token", r.data.token);
            this.$router.push('home')
            }
            else{
              this.$message({
                message: '用户名或密码错误!',
                type: 'error',
              })
            }
          })

        } else {          
          return false;
        }
      });
    },
    usernameInputFocus() {
      this.$refs.usernameInput.focus();
    },
    register() {
      this.$router.push("register");
    },
    goHome() {
      this.$router.push("home");
    },
    toPassword() {
      this.$refs.passwordInput.focus();
    }
  }
};
</script>

<style >
/* .login_font {
  float: left;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 15px;
  color: #fff;
} */
.login_form {
  background: #fff;
  height: 280px;
  width: 310px;
  border: 1px solid #d8dee2;
  float: right;
  margin-right: 120px;
  /* margin-top: 170px; */
  padding: 20px;
  border-radius: 5px;
  margin-top: 160px; 
}
.login_form p {
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  margin: 12px 0;
}
.login_form .el-form-item__content {
  margin-left: 0px !important;
}
.login_form .el-button {
  width: 310px;
  margin: 45px auto;
  display: table;
}
</style>