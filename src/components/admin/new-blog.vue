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
      <div class = "content-abstract">
        <span>分类：</span>
        <Select v-model="categoryId" style="width:70%" label-in-value @on-change="changeCategory">
          <Option v-for="item in categoryList" :value="item._id" :key="item._id">{{ item.name }}</Option>
        </Select>
      </div>
      <div class = "content-detail">
        <span>文章内容：</span>
        <!-- 暂时不要上传图片，图片过大会引起系统错误，后面优化时在参考其他做修改 -->
        <div class="detail-mavon">
          <mavon-editor v-model="articleContent" ref="md" @change="onEditorChange" @imgAdd="handleEditorImgAdd" @imgDel="handleEditorImgDel"/>
        </div>
      </div>
      <div class = "content-img">
        <span>上传图片：</span>
        <!-- 实在是没研究明白file上传图片，所以只能暂时使用这种上传网络地址的方式，以后在研究吧  -->
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
import { reqSaveArticle, reqUpdateArticle, reqGetCategoryList, reqUploadimg } from '@/api/api';
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
      articleInfo: {}, // 存储文章内容
      categoryId: '',
      categoryName: '',
      categoryList: []
    }
  },
  created () {
    this.reqGetList();
    if (this.way === '') return;
    this.articleContent = this.articleInfoDetails.content;
    this.articleTitle = this.articleInfoDetails.title;
    this.articleAbstract = this.articleInfoDetails.abstract;
    this.articleImgUrl = this.articleInfoDetails.img;
    this.categoryId = this.articleInfoDetails.categoryId;
    this.categoryName = this.articleInfoDetails.category;
  },
  methods: {
    onEditorChange(value, render){ // 编辑器文本发生变化
      console.log(this.articleContent);
    },
    handleEditorImgAdd (filename, file) { // 上传图片
      var formdata = new FormData();
      formdata.append('files', file);
      reqUploadimg(formdata).then(res=>{
        console.log('返回',res);
        if (res.data.status === 1) {
          let url = './static/illustration/' + res.data.data.filename;
          this.$refs.md.$img2Url(filename, url); // 将返回的url替换到文本原位置
        } else {
          this.$Message.error('上传失败！');
        }
      });
    },
    handleEditorImgDel (filename) { //删除图片
      console.log(filename);
    },
    changeCategory (val) {
      this.categoryName = val.label;
    },
    contentDataBase () {
      let articleDetails = {
        title: this.articleTitle,
        abstract: this.articleAbstract,
        category: this.categoryName, // 存分类的名字 
        categoryId: this.categoryId, // 存分类的id 
        content: this.articleContent,
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
        this.$Message.warning('请填写标题！');
        return;
      }
      if (this.articleAbstract === '') {
        this.$Message.warning('请填写摘要！');
        return;
      }
      if (this.categoryId === '') {
        this.$Message.warning('请选择分类！');
        return;
      }
      if (this.articleContent === '') {
        this.$Message.warning('请填写内容');
        return;
      }
      if (this.articleImgUrl === '') {
        this.$Message.warning('请填写图片地址');
        return;
      }
      await this.contentDataBase();
      reqSaveArticle(this.articleInfo).then(res => {
        if (res.data.status === 1) {
          this.$Message.info('添加成功！');
          this.articleTitle = '';
          this.articleAbstract = '';
          this.articleContent = '';
          this.articleImgUrl = '';
          this.categoryId = '';
        } else {
          this.$Message.error('添加失败！');
        }
      }).catch(err => {
        console.log(`写入文章catch：${err}`);
        this.$Message.error(`添加失败！${err}`);
      });
    },
    async updateArticle () { // 更新文章
      if (this.articleTitle === '') {
        this.$Message.warning('请填写标题！');
        return;
      }
      if (this.articleAbstract === '') {
        this.$Message.warning('请填写摘要！');
        return;
      }
      if (this.categoryId === '') {
        this.$Message.warning('请选择分类！');
        return;
      }
      if (this.articleContent === '') {
        this.$Message.warning('请填写内容');
        return;
      }
      if (this.articleImgUrl === '') {
        this.$Message.warning('请填写图片地址');
        return;
      }
      await this.contentDataBase();
      reqUpdateArticle({articleDetails: this.articleInfo}).then(res => {
        if (res.data.status === 1) {
          this.$Message.info('更新成功！');
          this.$emit('blogBack', 1);
        } else {
          this.$Message.error('更新失败！');
        }
      }).catch(err => {
        this.$Message.error('更新失败！');
        console.log(`更新文章catch：${err}`);
      });
    },
    reqGetList () { // 获取文章类别列表
      this.categoryList = [];
      reqGetCategoryList().then(res => {
        this.categoryList = res.data.data;
      }).catch(err => {
        console.log(`获取文章列表catch: ${err}`);
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
      .detail-mavon
        width: 70%
        >>> .v-note-wrapper
          height: 95%
  .blog-add
    width: 100%
  .blog-back
    position: absolute
    top: 10px
    left: 10px
    cursor: pointer
>>> .ivu-select-selected-value, >>> .ivu-select-placeholder
  text-align: left
>>>.ivu-select-dropdown
  z-index: 200
</style>
