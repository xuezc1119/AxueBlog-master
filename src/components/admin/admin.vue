<template>
  <div class="admin">
    <div class = "admin-left">
      <div class = "left-pic">
        <Avatar :src = "myPic" class = "pic-img" />
      </div>
      <Menu theme="dark" class = "left-menu" @on-select = "writeBlog">
        <Submenu name="manage">
          <template slot="title">
            <Icon type="ios-paper" />
            博客管理
          </template>
          <MenuItem name="write-blog">写博客</MenuItem>
          <MenuItem name="manage-blog">博客文章管理</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class = "admin-right">
      <div class = "right-top">欢迎回来！</div>
      <div class = "right-content">
        <div class = "content-box">
          <!-- 博客管理 -->
          <Table v-if = "!isNew" :columns="tableTitle" :data="tableData">
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
          </Table>
          <new-blog v-if = "isNew"></new-blog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newBlog from './new-blog';

export default {
  name: 'admin',
  data () {
    return {
      myPic: './static/img/blog.jpg',
      isNew: false, // 进入页面默认显示文章管理
      tableTitle: [
        {
            title: '创建时间',
            key: 'time'
        },
        {
            title: '文章标题',
            key: 'title'
        },
        {
            title: '操作',
            align: 'center',
            slot: 'action'
        }
      ],
      tableData: [],
      pdfImg: ''
    }
  },
  created () {
    this.getArticleList();
  },
  methods: {
    show () {
      console.log('show');
    },
    remove () {
      console.log('remove');
    },
    writeBlog (e) { // 切换写文章和文章管理
      if (e === 'write-blog') {
        this.isNew = true;
      } else if (e === 'manage-blog') {
        this.isNew = false;
      }
    },
    getArticleList () { // 获取文章列表
      this.$axios.post('/api/getArticleList').then(res => {
        console.log(res.data);
        this.tableData = res.data;
      }).catch(err => {
        console.log(`获取文章列表catch: ${err}`);
      });
    }
  },
  components: {
    'new-blog': newBlog
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
      height: 150px
      line-height: 150px
      text-align: left
      margin-left: 5%
      .pic-img
        width: 80px
        height: 80px
        border-radius: 50%
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
