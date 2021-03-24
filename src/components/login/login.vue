<template>
  <div class = "login">
    <div class = "login-box">
      <div class = "login-box-detail">
        <div class = "login-item">
          <span class = "item-span">账号：</span>
          <input type = "text" placeholder = "请输入账号" ref = "number" @click = "selectInput(0)" v-model = "number" />
        </div>
        <div class = "login-item">
          <span class = "item-span">密码：</span>
          <input type = "password" placeholder = "请输入密码" ref = "pwd" @click = "selectInput(1)" v-model = "pwd" />
        </div>
      </div>
      <div class = "login-btn">
        <button @click = "login">登录</button>
      </div>
      <div class = "login-tip">
        <span>还没账号？</span> <span class = "login-register" @click = "goRegister">注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from '@/api/api';
export default {
  name: 'login',
  data () {
    return {
      number: '',
      pwd: ''
    }
  },
  methods: {
    selectInput (val) { // 选中input框时的样式
      switch (val) {
        case 0:
          this.$refs.number.style.backgroundColor = '#faf7f1';
          this.$refs.pwd.style.backgroundColor = '#fff';
          break;
        case 1:
          this.$refs.number.style.backgroundColor = '#fff';
          this.$refs.pwd.style.backgroundColor = '#faf7f1';
          break;
      }
    },
    goRegister () {
      this.$router.push('/Axue-blog/register');
    },
    login () {
      if (this.number === '') {
        this.$Message.warning('请输入账号！');
        return;
      }
      if (this.pwd === '') {
        this.$Message.warning('请输入密码！');
        return;
      }
      let loginInfo = {
        username: this.number,
        userpwd: this.pwd
      };
      // 目前数据库中有两个账号： aaa:aaa    123:aaa
      reqLogin(loginInfo).then(res => {
        console.log(res.data);
        if (res.data.status === 1) {
          this.$Message.success('登录成功！');
          this.$store.commit('saveUserName', {
            userName: res.data.userName,
            userType: res.data.userType,
            userToken: res.data.token
          });
          setTimeout(() => {
            if (res.data.userType === '1') { // 管理者
              this.$router.push('/Axue-blog/admin');
            } else { // 游客
              this.$router.push('/Axue-blog/home');
            }
          }, 1000);
          console.log('login--', sessionStorage.getItem('token'));
        } else if (res.data.status === 0) {
          this.$Message.error('账号或密码错误，请重新登录！');
          this.pwd = '';
        }
      }).catch(err => {
        this.$Message.error('登录失败，系统异常！');
        console.log(`登录catch：${err}`);
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  position: relative
  margin: 5% 0 0 0
  .login-box
    width: 90%
    height: 480px
    background: rgba(255, 201, 14, 0.4)
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    border: 5px solid rgba(255, 201, 14, 0.8)
    box-shadow: 4px 4px 6px 2px rgba(255, 201, 14, 0.2)
    .login-box-detail
      width: 100%
      height: 220px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      .login-item
        width: 70%
        height: 100px
        display: flex
        align-items: center
        justify-content: center
        .item-span
          width: 10%
          height: 50px
          line-height: 50px
          text-align: left
          margin: 0 2%
        input
          width: 40%
          height: 45px
          padding: 0 1%
          border-radius: 2px
          border: none
          outline: medium
    .login-btn
      width: 70%
      height: 60px
      display: flex
      align-items: flex-end
      justify-content: center
      margin: 1% 0
      button
        width: 45%
        height: 50px
        border-radius: 4px
        border: none
        outline: medium
        color: #fff
        background: rgba(255, 182, 97, 1)
        cursor: pointer
        box-shadow: 2px 2px 3px 1px rgba(130, 130, 130, 0.6)
      button:active
        background: rgba(255, 201, 122, 1)
    .login-tip
      width: 70%
      height: 30px
      .login-register
        cursor: pointer
        text-decoration: underline
        color: rgba(255, 201, 14, 1)
        font-weight: bold
</style>
