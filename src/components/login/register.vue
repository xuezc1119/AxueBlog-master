<template>
  <div class = "register">
    <div class = "register-box">
      <div class = "register-item">
        <span class = "item-span">*账号：</span>
        <input type = "text" placeholder = "请输入账号" ref = "number" @click = "selectInput(0)" v-model = "number" />
      </div>
      <div class = "register-item">
        <span class = "item-span">*密码：</span>
        <input type = "password" placeholder = "6-16位密码（字母和数字组合更安全）" ref = "pwd" @click = "selectInput(1)" v-model = "pwd" />
      </div>
      <div class = "register-item">
        <span class = "item-span">*确认密码：</span>
        <input type = "password" placeholder = "请再次输入密码" ref = "pwdConfirm" @click = "selectInput(2)" v-model = "pwdConfirm" />
      </div>
      <div class = "register-btn">
        <button @click = "register">注册</button>
      </div>
      <div class = "register-tip">
        <span>已有账号？</span> <span class = "register-login" @click = "goLogin">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqRegister } from '@/api/api';
export default {
  data () {
    return {
      number: '',
      pwd: '',
      pwdConfirm: ''
    }
  },
  methods: {
    selectInput (val) { // 选中input框时的样式
      switch (val) {
        case 0:
          this.$refs.number.style.backgroundColor = '#faf7f1';
          this.$refs.pwd.style.backgroundColor = '#fff';
          this.$refs.pwdConfirm.style.backgroundColor = '#fff';
          break;
        case 1:
          this.$refs.number.style.backgroundColor = '#fff';
          this.$refs.pwd.style.backgroundColor = '#faf7f1';
          this.$refs.pwdConfirm.style.backgroundColor = '#fff';
          break;
        case 2:
          this.$refs.number.style.backgroundColor = '#fff';
          this.$refs.pwd.style.backgroundColor = '#fff';
          this.$refs.pwdConfirm.style.backgroundColor = '#faf7f1';
          break;
      }
    },
    goLogin () { // 去登录
      this.$router.push('/Axue-blog/login');
    },
    register () { // 注册
      if (this.number === '' || this.pwd === '' || this.pwdConfirm === '') {
        this.$Message.warning('内容不完整！');
        return;
      }
      if (this.pwd !== this.pwdConfirm) {
        this.$Message.warning('两次输入的密码不一致！');
        return;
      }
      let userInfo = {
        username: this.number,
        userpwd: this.pwd,
        usertype: '2', // 写死的游客注册
        userdate: this.$moment().format('YYYY-MM-DD')
      };
      if (this.number === 'Axue') { // 我就是管理员哈哈哈哈
        userInfo.usertype = '1';
      }
      reqRegister(userInfo).then(res => {
        if (res.data.status === 0) { // 用户名已注册
          this.$Message.warning('该账号已被注册！');
        } else if (res.data.status === 1) {
          this.$Message.info('注册成功！');
          this.goLogin();
        } else {
          this.$Message.error('注册失败！');
        }
      }).catch(err => {
        this.$Message.error('注册失败！');
        console.log(`用户注册catch：${err}`);
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.register
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  position: relative
  margin: 5% 0 0 0
  .register-box
    width: 90%
    height: 480px
    background: rgba(255, 201, 14, 0.4)
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    border: 5px solid rgba(255, 201, 14, 0.8)
    box-shadow: 4px 4px 6px 2px rgba(255, 201, 14, 0.2)
    .register-item
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
    .register-btn
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
    .register-tip
      width: 70%
      height: 30px
      .register-login
        cursor: pointer
        text-decoration: underline
        color: rgba(255, 201, 14, 1)
        font-weight: bold
</style>
