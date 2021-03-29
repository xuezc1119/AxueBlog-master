<template>
  <div class="admin">
    <div class = "admin-left">
      <div class = "left-pic">
        <div class = "pic-img" :style="{'backgroundImage': 'url('+ myPic +')'}"></div>
        <span class = "pic-txt">AXue</span>
      </div>
      <Menu theme="dark" active-name="manage-blog" :open-names="['manage']" class = "left-menu" @on-select = "changeMenu">
        <Submenu name="manage">
          <template slot="title">
            <Icon type="ios-paper" />
            博客管理
          </template>
          <MenuItem name="write-blog">写博客</MenuItem>
          <MenuItem name="manage-blog">博客文章管理</MenuItem>
          <MenuItem name="manage-category">类别管理</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class = "admin-right">
      <div class = "right-top">欢迎回来！</div>
      <div class = "right-content">
        <div class = "content-box">
          <!-- 博客管理 -->
          <new-blog v-if = "isNew==='write-blog'"></new-blog>
          <blog-manage v-if = "isNew==='manage-blog'"></blog-manage>
          <category-manage v-if = "isNew==='manage-category'"></category-manage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newBlog from './new-blog';
import blogManage from './manage';
import categoryManage from './category';

export default {
  name: 'admin',
  data () {
    return {
      myPic: './static/img/content-img/head.jpg',
      isNew: 'manage-blog' // 进入页面默认显示文章管理
    }
  },
  methods: {
    changeMenu (e) { // 切换写文章和文章管理
      this.isNew = e;
    }
  },
  components: {
    'new-blog': newBlog,
    'blog-manage': blogManage,
    'category-manage': categoryManage
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.admin
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  position: relative
  padding: 2%
  .admin-left
    height: 100%
    width: 20%
    background: rgb(41, 56, 70)
    .left-pic
      width: 100%
      height: 120px
      display: flex;
      align-items: center;
      .pic-img
        width: 80px
        height: 80px
        border-radius: 50%
        background-size: cover
        background-position: center
        margin-left: 10%
      .pic-txt
        color: #fff
        margin-left: 5%
        font-size: 18px
    .left-menu
      width: 100% !important
  .admin-right
    width: 80%
    height: 100%
    background: #ccc
    display: flex
    flex-direction: column
    .right-top
      width: 100%
      height: 50px
      line-height: 50px
      text-align: right
      background: #fff
      border-bottom: 1px solid rgba(45,45,45,0.2)
    .right-content
      width: 100%
      flex: 1
      padding: 0.5%
      .content-box
        width: 100%
        height: 100%
        background: #fff
</style>
