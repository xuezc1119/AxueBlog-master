<template>
  <div class="index">
    <blogTop></blogTop>
    <router-view></router-view>
    <img :src = "topImg" class = "index-back" @click = "backTop" v-show = "isShowTop">
  </div>
</template>

<script>
import blogTop from '@/components/header/header.vue';
export default {
  name: 'index',
  data () {
    return {
      topImg: './static/img/top.png',
      isShowTop: false
    }
  },
  created () {
    this.$router.push('/Axue-blog/home');
  },
  mounted () {
    window.addEventListener('scroll', this.scrollContent);
  },
  methods: {
    scrollContent () { // 页面滚动函数
      if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        this.isShowTop = true;
      } else {
        this.isShowTop = false;
      }
    },
    backTop () { // 返回顶部
      console.log('back');
      let i = 100;
      let timer = setInterval(() => {
        if (document.documentElement.scrollTop > 0) {
          document.documentElement.scrollTop -= i;
        } else {
          clearInterval(timer);
        }
      }, 10);
      this.$once('hook:beforeDestroy', () => { // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。    
        clearInterval(timer);
      })
    }
  },
  components: {
    'blogTop': blogTop
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.index
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  align-items: center
  backgoround: rgb(248, 248, 248)
  position: relative
  .index-back
    position: fixed
    bottom: 8%
    right: 5%
    width: 64px
    height: 64px
    cursor: pointer
    transition: all 0.5s
  .index-back:hover
    width: 80px
    height: 80px
    bottom: 7%
    right: 4.5%
</style>
