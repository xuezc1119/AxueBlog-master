<template>
  <div class = "register">
    <div class = "register-box">
      <div class = "register-item">
        <span class = "item-span">账号</span>
        <input type = "text" placeholder = "请输入账号" />
      </div>
      <div class = "register-item">
        <span class = "item-span">密码</span>
        <input type = "password" placeholder = "请输入密码" />
      </div>
      <div class = "register-item">
        <span class = "item-span">确认密码</span>
        <input type = "password" placeholder = "请再次输入密码" />
      </div>
      <div class = "register-btn">
        <button>注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
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
  .register-box
    width: 100%
    height: 100%
</style>
