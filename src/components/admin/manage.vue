<template>
  <div class="manage">
    <Table :columns = "tableTitle" :data = "tableData" style="width:100%" class="table-box">
      <template slot-scope="{ row, index }" slot="action">
        <Button type = "primary" size = "small" style = "margin-right: 5px" @click = "selectItem('edit', tableData, index)">编辑</Button>
        <Button type = "error" size = "small" @click = "selectItem('del', tableData, index)">删除</Button>
      </template>
    </Table> 
    <div class="table-page"><Page :current="page.pageIndex" :total="page.totalCount" :page-size="page.pageSize" @on-change="changePage" /></div>
    <Modal
      v-model = "showTip"
      :closable = "false"
      :styles = "{width: '25%'}">
      <p slot="header" style="color:#f60">
        <Icon type="ios-information-circle"></Icon>
      </p>
      <div style = "text-align: center">
        <p>您确定要删除吗?</p>
      </div>
      <div slot="footer" style = "text-align: center">
        <Button type = "error" size="large" :loading="delLoading" @click = "confirmDel">确定</Button>
      </div>
    </Modal>
    <div class = "manage-edit" v-if = "showDetails">
      <edit-blog :articleInfoDetails = "articleDetails" way = "edit" @blogBack = "backUpdate"></edit-blog>
    </div>
  </div>
</template>

<script>
import editBlog from './new-blog.vue';
import { reqDeleteArticle, reqGetArticleList } from '@/api/api';
export default {
  name: 'manage',
  data () {
    return {
      tableTitle: [
        {
            title: '创建时间',
            key: 'date'
        },
        {
            title: '文章标题',
            key: 'title'
        },
        {
            title: '所属类别',
            key: 'category'
        },
        {
            title: '操作',
            align: 'center',
            slot: 'action'
        }
      ],
      tableData: [],
      page: {
        totalCount: 0,
        pageIndex: 1,
        pageSize: 10
      },
      showTip: false,
      delLoading: false,
      articleId: '', // 选择要删除的文章id
      articleDetails: {}, // 存储文章所有内容
      showDetails: false
    }
  },
  created () {
    this.getArticleList();
  },
  methods: {
    confirmDel () { // 删除文章
      this.delLoading = true;
      let articleInfo = {
        articleId: this.articleId
      };
      reqDeleteArticle(articleInfo).then(res => {
        if (res.data.status === 1) {
          this.delLoading = false;
          this.showTip = false;
          this.$Message.info('删除成功！');
          this.getArticleList();
        } else {
          this.delLoading = false;
          this.showTip = false;
          this.$Message.error('删除失败！');
        }
      }).catch(err => {
        this.delLoading = false;
        this.showTip = false;
        this.$Message.error('删除失败！');
        console.log(`删除文章catch：${err}`);
      });
    },
    selectItem (condition, val, index) { // 选中一篇文章的操作
      if (condition === 'del') {
        this.showTip = true;
        this.articleId = val[index]._id;
      } else {
        this.articleDetails = val[index];
        this.showDetails = true;
        console.log('编辑文章');
      }
    },
    getArticleList () { // 获取文章列表
      let params = {
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      };
      reqGetArticleList(params).then(res => {
        console.log(res.data.data); 
        this.tableData = res.data.data;
        this.page.totalCount = res.data.total;
      }).catch(err => {
        console.log(`获取文章列表catch: ${err}`);
      });
    },
    changePage (page) {
      this.page.pageIndex = page;
      this.getArticleList();
    },
    backUpdate (val) {
      this.showDetails = false;
      if (!val) return;
      // 更新文章后返回就要重新加载数据
      this.getArticleList();
    }
  },

  components: {
    'edit-blog': editBlog
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.manage
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  position: relative
  .manage-edit
    position: absolute
    background: #fff
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 50
  .table-page
    margin-top: 20px
  .table-box
    height: 520px
</style>
