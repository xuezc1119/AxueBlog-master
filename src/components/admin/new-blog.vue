<template>
  <div class="new-blog">
    <div class = "blog-box">
      <div class = "content-title">
        <span>标题：</span>
        <input type = "text" placeholder="Please enter the title" v-model = "articleTitle">
      </div>
      <div class = "content-abstract">
        <span>摘要：</span>
        <textarea type = "text" placeholder="Please enter the abstract" v-model = "articleAbstract"></textarea>
      </div>
      <div class = "content-detail">
        <span>文章内容：</span>
        <quill-editor v-model="articleContent"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
        <!-- <textarea type = "text" placeholder="请输入文章内容"></textarea> -->
      </div>
      <div class = "content-img">
        <span>上传图片：</span>
        <!-- 实在是没研究明白file上传图片，所以只能暂时使用这种上传网络地址的方式，以后在研究吧 -->
        <input type = "text" placeholder="Please enter the img url" v-model = "articleImgUrl">
      </div>
    </div>
    <div class = "blog-add">
      <Button type="success" @click = "addArticle" v-if = "way === ''">添加</Button>
      <Button type="success" @click = "updateArticle" v-else>更新</Button>
    </div>
    <div class = "blog-back" v-show = "way !== ''" @click.stop = "blogBack">
      <Icon type="md-return-left" size = "24" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'new-blog',
  props: {
    way: {
      type: String,
      default: ''
    },
    articleInfoDetails: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      articleContent: '',
      articleTitle: '',
      articleAbstract: '',
      articleImgUrl: '',
      articleInfo: {} // 存储文章内容
    }
  },
  created () {
    if (this.way === '') return;
    this.articleContent = this.articleInfoDetails.content;
    this.articleTitle = this.articleInfoDetails.title;
    this.articleAbstract = this.articleInfoDetails.abstract;
    this.articleImgUrl = this.articleInfoDetails.img;
  },
  methods: {
    onEditorBlur(editor){//失去焦点事件 
    },
    onEditorFocus(editor){//获得焦点事件
    },
    onEditorChange({editor,html,text}){//编辑器文本发生变化
    //this.content可以实时获取到当前编辑器内的文本内容
    },
    contentDataBase () {
      let articleDetails = {
        title: this.articleTitle,
        abstract: this.articleAbstract,
        content: this.articleContent.substring(3, this.articleContent.length - 4),
        img: this.articleImgUrl,
        date: this.$moment().format('YYYY-MM-DD')
      }
      if (this.way !== '') { // 更新文章的话就要获取相应的_id
        articleDetails._id = this.articleInfoDetails._id;
      }
      this.articleInfo = articleDetails;
    },
    async addArticle () { // 添加文章
      if (this.articleTitle === '') {
        this.$Message.info('请填写标题！');
        return;
      }
      if (this.articleAbstract === '') {
        this.$Message.info('请填写摘要！');
        return;
      }
      if (this.articleContent === '') {
        this.$Message.info('请填写内容');
        return;
      }
      if (this.articleImgUrl === '') {
        this.$Message.info('请填写图片地址');
        return;
      }
      await this.contentDataBase();
      this.$axios.post('/api/admin/saveArticle', this.articleInfo).then(res => {
        if (res.data.status === 1) {
          this.$Message.info('添加成功！');
          this.articleTitle = '';
          this.articleAbstract = '';
          this.articleContent = '';
          this.articleImgUrl = '';
        } else {
          this.$Message.info('添加失败！');
        }
      }).catch(err => {
        console.log(`写入文章catch：${err}`);
        this.$Message.info(`添加失败！${err}`);
      });
    },
    async updateArticle () { // 更新文章
      if (this.articleTitle === '') {
        this.$Message.info('请填写标题！');
        return;
      }
      if (this.articleAbstract === '') {
        this.$Message.info('请填写摘要！');
        return;
      }
      if (this.articleContent === '') {
        this.$Message.info('请填写内容');
        return;
      }
      if (this.articleImgUrl === '') {
        this.$Message.info('请填写图片地址');
        return;
      }
      await this.contentDataBase();
      this.$axios.post('/api/admin/updateArticle', {articleDetails: this.articleInfo}).then(res => {
        if (res.data.status === 1) {
          this.$Message.info('更新成功！');
          this.$emit('blogBack', 1);
        } else {
          this.$Message.info('更新失败！');
        }
      }).catch(err => {
        this.$Message.info('更新失败！');
        console.log(`更新文章catch：${err}`);
      });
    },
    blogBack () { // 更新文章的返回
      this.$emit('blogBack');
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.new-blog
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  position: relative
  padding: 2%
  .blog-box
    display: flex
    flex-direction: column
    width: 100%
    padding: 0 3%
    flex: 1
    .content-title
      width: 100%
      height: 40px
      display: flex
      span
        width: 15%
        line-height: 30px
        text-align: right
        margin: 0 2% 0 0
      input
        width: 70%
        height: 30px
        outline: medium
        border-radius: 4px
        border: 1px solid rgba(45,45,45,0.2)
        padding: 0 1%
    .content-abstract
      width: 100%
      height: 40px
      display: flex
      span
        width: 15%
        line-height: 30px
        text-align: right
        margin: 0 2% 0 0
      textarea
        width: 70%
        height: 30px
        outline: medium
        border: 1px solid rgba(45,45,45,0.2)
        border-radius: 4px
        padding: 0 1%
        overflow: auto
    .content-img
      width: 100%
      height: 60px
      margin: 2px 0 0 0
      display: flex
      span
        width: 15%
        line-height: 30px
        text-align: right
        margin: 0 2% 0 0
      input
        width: 70%
        height: 30px
        outline: medium
        border-radius: 4px
        border: 1px solid rgba(45,45,45,0.2)
        padding: 0 1%
    .content-detail
      width: 100%
      height: 40px
      display: flex
      flex: 1
      span
        width: 15%
        line-height: 30px
        text-align: right
        margin: 0 2% 0 0
      .quill-editor
        width: 70%
        text-align: left
        >>> .ql-toolbar
          height: 20%
          padding: 3px
        >>> .ql-container
          height: 80%
  .blog-add
    width: 100%
  .blog-back
    position: absolute
    top: 10px
    left: 10px
    cursor: pointer
</style>
