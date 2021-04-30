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
        <div class="detail-mavon">
          <mavon-editor v-model="articleContent" ref="md" @change="onEditorChange" @imgAdd="handleEditorImgAdd" @imgDel="handleEditorImgDel"/>
        </div>
      </div>
      <div class = "content-img">
        <span>上传封面：</span>
        <Upload 
          action=""
          :format="['jpg','jpeg','png']"
          accept=".jpg,.jpeg,.png"
          :max-size="fileMaxSize"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <p class="img-p" v-if="articleImgUrl" @click="showImg">{{showImgUrl}}</p>
      </div>
    </div>
    <div class = "blog-add">
      <Button type="success" @click = "addArticle" v-if = "way === ''">添加</Button>
      <Button type="success" @click = "updateArticle" v-else>更新</Button>
    </div>
    <div class = "blog-back" v-show = "way !== ''" @click.stop = "blogBack">
      <Icon type="md-return-left" size = "24" />
    </div>
    <Modal v-model="isShowImg" :footer-hide="true">
      <img :src="articleImgUrl" style="width: 100%;padding: 4%;">
    </Modal>
  </div>
</template>

<script>
import { reqSaveArticle, reqUpdateArticle, reqGetCategoryList, reqUploadimg, reqUploadCover } from '@/api/api';
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
      categoryList: [],
      fileMaxSize: 2 * 1024 *1024,
      isShowImg: false
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
  computed:{
    showImgUrl () {
      let temp = "";
      if (this.articleImgUrl) {
        temp = this.articleImgUrl.slice(15);
      }
      return temp;
    }
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
          // 以下两种路径都可以
          let url = './static/illustration/' + res.data.data.filename;
          // let url = 'http://127.0.0.1:9050/static/illustration/' + res.data.data.filename;
          this.$refs.md.$img2Url(filename, url); // 将返回的url替换到文本原位置
        } else {
          this.$Message.error('上传失败！');
        }
      });
    },
    handleEditorImgDel (filename) { //删除图片
      console.log(filename);
    },
    handleMaxSize (file) {
      this.$Message.warning("文件大小超限");
    },
    handleFormatError (file) {
      this.$Message.warning("文件格式不正确");
    },
    // 上传文件之前
    handleBeforeUpload (file) {
      console.log('file', file);
      let fileIndex = file.name.lastIndexOf('.')
      let ext = file.name.substr(fileIndex + 1)
      let arr = ['jpg', 'jpeg', 'png']
      // 判断 图片 格式和大小
      if (arr.indexOf(ext) > -1) {
        if (file.size > this.fileMaxSize) {
          this.$Message.error('单个文件不超过2M')
          return false
        }
      } else {
        this.$Message.error('图片格式不正确')
        return false
      }
      var formdata = new FormData();
      formdata.append('files', file);
      reqUploadCover(formdata).then(res=>{
        console.log('返回',res);
        if (res.data.status === 1) {
          // 以下两种路径都可以
          let url = './static/cover/' + res.data.data.filename;
          console.log('url', url);
          this.articleImgUrl = url;
        } else {
          this.$Message.error('上传失败！');
        }
      });
      // 返回 false 停止自动上传 我们需要手动上传
      return false
    },
    // 上传成功
    handleSuccess (res, file) {
      console.log(res, file);
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
    },
    showImg () {
      this.isShowImg = true;
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
      .img-p
        cursor: pointer
        line-height: 32px;
        margin-left: 10px;
        color: blue;
        text-decoration: underline;
        width: calc(70% - 137px);
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover
          color: #008;
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
