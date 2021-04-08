<template>
  <div class="home">
    <div class = "home-content-left">
      <div class = "left-box" v-for = "(item, index) in contents" :key = "index" @click="showContentDetail(index)">
        <div class = "left-box-top">
          <span>{{item.title}}</span>
        </div>
        <div class = "left-box-center">
          <div class = "img-box">
            <img :src = "item.img">
          </div>
          <p>{{item.abstract}}</p>
        </div>
        <div class = "left-box-bottom">
          <div class = "bottom-box">
            <img :src = "writeImg">
            <span>{{item.date}}</span>
          </div>
          <div class = "bottom-box">
            <img :src = "readImg">
            <span>3</span>
          </div>
          <div class = "bottom-box">
            <img :src = "likeImg">
            <span>9</span>
          </div>
        </div>
        <img :src = "starImg" class = "left-box-img">
      </div>
      <div class="table-page"><Page :current="page.pageIndex" :total="page.totalCount" :page-size="page.pageSize" @on-change="changePage" /></div>
    </div>
    <div class = "home-content-right">
      <home-right></home-right>
    </div>
  </div>
</template>

<script>
import homeRight from './right/home-right';
import { reqGetArticleList } from '@/api/api';
export default {
  name: 'home',
  data () {
    return {
      contents: [
        // {
        //   title: 'I wanna be your Chaperone',
        //   img: './static/img/content-img/color-ballon.jpeg',
        //   date: '2019-3-30',
        //   isRead: '3',
        //   like: '9',
        //   abstract: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        // },
        // {
        //   title: 'the Only One Call Away',
        //   img: './static/img/content-img/cat.jpeg',
        //   date: '2019-3-29',
        //   isRead: '5',
        //   like: '5',
        //   abstract: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
        // }
      ],
      writeImg: './static/img/writer.png',
      readImg: './static/img/read.png',
      likeImg: './static/img/like.png',
      starImg: './static/img/star.png',
      page: {
        totalCount: 0,
        pageIndex: 1,
        pageSize: 5
      },
    }
  },
  mounted () {
    this.getArticleList();
  },
  methods: {
    getArticleList () { // 获取文章列表
      let params = {
        search: this.search,
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      };
      reqGetArticleList(params).then(res => {
        console.log(res.data.data);
        this.contents = res.data.data;
        this.page.totalCount = res.data.total;
      }).catch(err => {
        console.log(`获取文章列表catch: ${err}`);
      });
    },
    changePage (page) {
      this.page.pageIndex = page;
      this.getArticleList();
    },
    showContentDetail (index) {
      console.log(this.contents[index]._id);
      this.$router.push({name: 'articleDetails', params: {id: this.contents[index]._id}});
    }
  },
  watch: {
    search: {
      handler (val) {
        console.log('test',val);
        this.getArticleList();
      }
    }
  },
  computed: {
    search () {
      return this.$store.state.common.searchValue;
    }
  },
  components: {
    'home-right': homeRight
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.home
  width: 100%
  display: flex
  justify-content: center
  position: relative
  .home-content-left
    width: 40%
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    .table-page
      margin: 20px 0
    .left-box
      width: 100%
      margin: 20px 0
      padding: 2%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-between
      background: #fff
      border-radius: 4px
      box-shadow: 4px 4px 6px 2px rgba(130, 130, 130, 0.6)
      position: relative
      cursor: pointer
      .left-box-img
        position: absolute
        top: -10px
        right: 5%
        width: 64px
        height: 64px
      .left-box-top
        width: 100%
        height: 80px
        padding: 3% 2%
        border-bottom: 1px dashed rgba(44, 62, 80, 0.5)
        span
          width: 100%
          font-weight: bold
          font-size: 20px
          text-align: left
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          @media only screen and (max-width: 878px)
            font-size: 16px
      .left-box-center
        width: 100%
        height: 500px
        margin: 5% 0
        display: flex
        flex-direction: column
        align-items: center
        border-bottom: 1px dashed rgba(44, 62, 80, 0.5)
        .img-box
          width: 96%
          height: 78%
          cursor: pointer
          overflow: hidden
          img
            width: 100%
            height: 100%
            transition: all 1s
          img:hover
            transform: scale(1.2)
        p
          width: 96%
          margin: 2% 0
          color: rgba(44, 62, 80, 0.8)
          text-align: left
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 3
        @media only screen and (max-width: 878px)
          height: 280px
      .left-box-bottom
        width: 96%
        height: 60px
        display: flex
        align-items: center
        justify-content: space-between
        .bottom-box
          width: 33.3%
          height: 100%
          padding: 0 5%
          display: flex
          align-items: center
          justify-content: center
          img
            width: 26px
            height: 26px
          span
            margin: 0 10%
            white-space: nowrap
    .left-box:hover
      box-shadow: 6px 6px 20px 2px rgba(130, 130, 130, 0.6)
    @media only screen and (max-width: 878px)
      width: 90%
  .home-content-right
    width: 22%
    margin: 0 0 0 3%
    @media only screen and (max-width: 878px)
      width: 90%
      margin: 0
  @media only screen and (max-width: 878px)
    flex-direction: column
    align-items: center
</style>
