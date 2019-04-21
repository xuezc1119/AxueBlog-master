<template>
  <div class="blog">
    <router-view></router-view>
    <blog-foot></blog-foot>
  </div>
</template>

<script>
import blogFoot from '@/components/footer/footer.vue';
export default {
  data () {
    return {
      title: 'footer '
    }
  },
  components: {
    'blog-foot': blogFoot
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.blog
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
</style>
