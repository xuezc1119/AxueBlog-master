<template>
  <div id="app" ondragstart="return false;">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$router.push('/Axue-blog/home');
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  background: rgb(248,248,248)
  height: 100%
  width: 100%
  overflow: hidden
*
  margin: 0
  padding: 0
  box-sizing: border-box
  &::-webkit-scrollbar
    width: 0 !important
    height: 0 !important
</style>
