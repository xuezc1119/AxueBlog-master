<template>
  <div class="index">
    <blogTop @selectType = "selectGuide"></blogTop>
    <v-home v-if = "guideType === 'home'"></v-home>
    <v-articles v-if = "guideType === 'articles'"></v-articles>
    <v-photographs v-if = "guideType === 'photographs'"></v-photographs>
    <v-contact v-if = "guideType === 'contact'"></v-contact>
    <img :src = "topImg" class = "index-back" @click = "backTop" v-show = "isShowTop">
  </div>
</template>

<script>
import blogTop from '@/components/header/header.vue';
import home from '@/components/home/home';
import articles from '@/components/articles/articles';
import photographs from '@/components/photographs/photographs';
import contact from '@/components/contact/contact';
export default {
  name: 'index',
  data () {
    return {
      guideType: 'home',
      topImg: './static/img/top.png',
      isShowTop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollContent);
  },
  methods: {
    selectGuide (val) {
      this.guideType = val.type;
    },
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
    'blogTop': blogTop,
    'v-home': home,
    'v-articles': articles,
    'v-photographs': photographs,
    'v-contact': contact
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
