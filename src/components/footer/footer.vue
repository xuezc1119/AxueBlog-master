<template>
  <div class="footer">
    <div class = "footer-box">
      @2019 Axue Design. All Right Reserved.
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'footer '
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.footer
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  .footer-box
    width: 100%
    height: 80px
    line-height: 80px
    text-align: center
    background: #fff
    margin: 5% 0 1% 0
    border: 1px solid rgba(130, 130, 130, 0.6)
    cursor: pointer
</style>
