<template>
  <div class="blog-top">
    <div class = "index-header">
      <div class = "index-header-admin" v-if = "userType === '0'">
        <span @click = "login">登录</span> / <span @click = "register">注册</span>
      </div>
      <!-- 用户登录 -->
      <div class = "index-header-user" v-else @click = "detailsControl">
        <!-- 随机生成用户头像 -->
        <div class = "user-img" ref = "imgColor"></div>
        <Icon type="ios-contact-outline" v-show = "userType === '2'" size = "24" color = "#C5C1AA" />
        <Icon type="ios-sunny-outline" v-show = "userType === '1'" size = "24" color = "#C5C1AA" />
        <Icon type="ios-arrow-down" size = "24" />
        <div class = "user-three" v-show = "showDetails"></div><!-- 三角形 -->
        <div class = "user-details" v-show = "showDetails" ref = "userDetails">
          <div class = "user-name">{{userName}}</div>
          <div @click = "signOut">退出</div>
        </div>
      </div>
      <div class = "index-header-title">
        <h1>{{title}}</h1>
        <p>{{describe}}</p>
      </div>
      <!-- 导航栏 -->
      <div class = "index-header-guide">
        <div class = "index-header-guide-box">
          <div class = "guide-box-hide">
            <img :src = "listImg" @click = "showList">
          </div>
          <div class = "guide-box-left" :class = "{ifShow: ifShowList}" @click = "ifShowList=false">
            <span v-for = "(item, index) in guideItems" :key = "index" @click = "selectGuide(item)"
            :class = "{selected: guideType === item.type}">{{item.item}}</span>
          </div>
          <div class = "guide-box-right">
            <img v-for = "(item, index) in img" :key = "index" :src = "item" @click = "contactMe(index)">
            <div class = "right-search">
              <input type = "input" placeholder = "search and hit here..." v-model="inputTxt" />
              <img :src = "searchImg">
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class = "index-mark" v-show = "showMark" @click = "showMark = false">
        <img :src = "contactImg.wechat" v-show = "contactContent==='wechat'">
        <img :src = "contactImg.qq" v-show = "contactContent==='qq'">
        <img :src = "contactImg.blog" v-show = "contactContent==='blog'">
        <div v-show = "contactContent==='phone'"><input ref = "phone" v-model = "phone"></div>
        <div v-show = "contactContent==='email'"><input ref = "email" v-model = "email"></div>
        <button v-show = "contactContent==='phone' || contactContent==='email'" @click = "copyContent">Click and Copy</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { reqSignOut } from '@/api/api';
export default {
  name: 'top',
  data () {
    return {
      inputTxt: '',
      title: 'Dummer ',
      describe: 'Where ever you go, what ever you do, I will be right here waiting for you ',
      guideItems: [
        {item: 'HOME', type: 'home', goPath: '/Axue-blog/home'},
        {item: 'ARTICLES', type: 'articles', goPath: '/Axue-blog/articles'},
        {item: 'PHOTOGRAPHS', type: 'photographs', goPath: '/Axue-blog/photographs'},
        {item: 'CONTACT', type: 'contact', goPath: '/Axue-blog/contact'}
      ],
      guideType: 'home',
      img: {
        wechat: './static/img/wechat.png',
        qq: './static/img/QQ.png',
        email: './static/img/email.png',
        phone: './static/img/phone.png',
        blog: './static/img/micro-blog.png'
      },
      searchImg: './static/img/search.png',
      listImg: './static/img/list.png',
      showMark: false,
      contactImg: {
        wechat: './static/img/wechat.jpg',
        qq: './static/img/qq.jpg',
        blog: './static/img/blog.jpg'
      },
      contactContent: '', // 选择哪种联系方式
      email: '1838037939@qq.com',
      phone: '18443996218',
      ifShowList: false, // 适配时是否展示导航列表
      showDetails: false // 是否展示用户详细信息
    }
  },
  created () {
    if (this.userType !== '0') { // 设置游客头像
      this.$nextTick(() => {
        console.log(this.$refs.imgColor);
        let color = ['#FFDEAD', '#D4D4D4','#FFFACD','#FFE4E1', '#EEE5DE'];
        this.$refs.imgColor.style.backgroundColor = color[Math.floor(Math.random() * 4)];
      });
    }
  },
  mounted () {
    document.addEventListener('click', this.clickAnother, true);
  },
  watch: {
    inputTxt: {
      handler (val) {
        console.log('input输入', val);
      }
    }
  },
  methods: {
    ceshi () {
      this.$router.push('/Axue-blog/admin');
    },
    login () { // 登录
      this.$router.push('/Axue-blog/login');
    },
    register () { // 注册
      this.$router.push('/Axue-blog/register');
    },
    contactMe (val) { // 联系我的图层展示控制
      this.showMark = true;
      this.contactContent = val;
    },
    copyContent (e) { // 联系我的文本复制
      e.stopImmediatePropagation(); // 阻止捕获
      if (this.contactContent === 'phone') {
        this.$refs.phone.select();
        document.execCommand("copy");
      } else if (this.contactContent === 'email') {
        this.$refs.email.select();
        document.execCommand("copy");
      }
      setTimeout (() => {this.showMark = false;}, 400) // 0.4秒后页面自动关闭
    },
    showList () { // 适配手机时的导航显示隐藏框
      this.ifShowList = !this.ifShowList;
    },
    selectGuide (val) {
      this.guideType = val.type;
      this.$router.push(val.goPath);
    },
    detailsControl () { // 用户详细信息控制
      this.showDetails = !this.showDetails;
    },
    clickAnother (e) { // 点击其他地方，用户信息层消失
      if (this.showDetails) {
        if(!this.$refs.userDetails.contains(e.target)) {
          this.showDetails = false;
          e.stopImmediatePropagation();
        }
      }
    },
    signOut () {
      this.$Modal.confirm({
        title: '提示',
        content: '确定退出吗？',
        onOk: () => {
          reqSignOut({
            username: this.userName,
            token: this.userToken
          }).then(res => {
            console.log(res.data);
            if (res.data.status === 1) {
              this.$Message.info('退出成功！');
              this.$store.commit('saveUserName', {
                userName: '',
                userType: '0',
                userToken: ''
              });
              sessionStorage.clear();
              // location.reload();
              this.$router.push({name: 'login'});
            } else {
              this.$Message.error('退出失败！');
              sessionStorage.clear();
            }
          }).catch(err => {
            console.log(`退出catch：${err}`);
            this.$Message.error('退出失败，系统异常！');
            sessionStorage.clear();
          });
        }
      });
    }
  },
  computed: {
    userType () {
      // 缓存里没有就取仓库值
      return window.sessionStorage.getItem('userType') || this.$store.state.user.userInfo.userType;
    },
    userName () {
      // 缓存里没有就取仓库值
      return window.sessionStorage.getItem('userName') || this.$store.state.user.userInfo.userName;
    },
    userToken () {
      // 缓存里没有就取仓库值
      return window.sessionStorage.getItem('token') || this.$store.state.user.userInfo.userToken;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.blog-top
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  .index-header
    height: 350px
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    .index-header-admin
      position: absolute
      width: 100px
      height: 40px
      line-height: 40px
      text-align: center
      background: rgba(255, 182, 97, 1)
      border-radius: 4px
      color: #fff
      top: 10px
      right: 10px
      span
        cursor: pointer
      span:hover
        font-weight: bold
    .index-header-user
      position: absolute
      width: 90px
      height: 50px
      background: #fff
      border-radius: 4px
      top: 10px
      right: 10px
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center
      .user-img
        width: 30px
        height: 30px
        border-radius: 50%
        margin: 0 5px
      .ivu-icon-ios-contact-outline, .ivu-icon-ios-sunny-outline
        position: absolute
        top: 13px
        left: 21px
      .user-details
        position: absolute
        top: 61px
        right: 0
        width: 120px
        background: rgba(255, 165, 79, 0.8)
        border-radius: 4px
        padding: 0 5px
        div
          width: 100%
          height: 40px
          line-height: 40px
        .user-name
          border-bottom: 1px solid #FAEBD7
        div:hover
          background: rgba(255, 165, 79, 1)
      .user-three
        width: 0
        height: 0
        position: absolute
        right: 20px
        top: 60px
        transform: rotate(-45deg)
        border-width: 0 15px 15px 15px
        border-style: solid
        border-color: transparent rgba(255, 165, 79, 0.8) transparent transparent
    .index-header-title
      height: 250px
      width: 100%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      h1
        font-size: 40px
      p
        font-size: 12px
        color: rgba(150,150,150,0.8)
    .index-header-guide
      height: 100px
      width: 100%
      .index-header-guide-box
        height: 75px
        width: 100%
        background: #fff
        border: 1px solid rgb(231,231,231)
        display: flex
        align-items: center
        justify-content: center
        @media only screen and (max-width: 878px)
          flex-direction: column
          height: 100%
          justify-content: space-between
          padding: 20px 0
        .guide-box-hide
          width: 60px
          display: none
          img
            width: 20px
            height: 20px
          @media only screen and (max-width: 878px)
            display: block
        .guide-box-left
          width: 40%
          display: flex
          justify-content: space-between
          font-size: 14px
          span
            width: 25%
            height: 75px
            line-height: 75px
            text-align: center
            transition: all 0.5s linear
            @media only screen and (max-width: 878px)
              height: 40px
              line-height: 40px
              font-size: 30px
              width: 100%
              margin: 25px 0
          .selected
            color: rgba(255, 201, 14, 1)
            font-size: 18px
            @media only screen and (max-width: 878px)
              font-size: 30px
          span:hover
            color: rgba(255, 201, 14, 1)
            font-size: 18px
            cursor: pointer
          @media only screen and (max-width: 878px)
            display: none
        // 适配手机时的导航遮罩层
        .ifShow
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          font-size: 30px
          width: 100%
          height: 100%
          position: fixed
          top: 0
          left: 0
          z-index: 100
          background: rgba(249, 238, 201, 0.8)
        .guide-box-right
          width: 20%
          // background: pink
          margin: 0 0 0 2%
          display: flex
          align-items: center
          justify-content: space-between
          img
            width: 18px
            height: 18px
          img:hover
            width: 20px
            height: 20px
            cursor: pointer
          .right-search
            position: relative
            margin: 0 0 0 20px
            input
              height: 40px
              padding: 0 20px 0 5px
              outline: medium
              color: #2c3e50
              border: 1px solid rgb(210,210,210)
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            input::placeholder
              color: rgb(190, 190, 190)
            img
              position: absolute
              right: 5px
              top: 10px
          @media only screen and (max-width: 878px)
            width: 80%
      @media only screen and (max-width: 878px)
        height: 150px
  .index-mark
    position: fixed
    width: 100%
    height: 100%
    z-index: 99
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    background: rgba(150, 150, 150, 0.8)
    div
      width: 350px
      height: 150px
      line-height: 150px
      text-align: center
      border: 1px solid rgb(210,210,210)
      background: rgb(140, 140, 140)
      input
        border: 0
        outline: none
        background: rgb(140, 140, 140)
        color: #2c3e50
        font-size: 20px
        text-align: center
        height: 30px
        line-height: 30px
        text-decoration: none
      input::selection
        text-decoration: none
        border: 0
        outline: none
        background: rgb(240,240,240)
    button
      width: 150px
      height: 70px
      border: none
      border-radius: 8px
      margin: 50px 0
      background: rgba(150, 150, 150, 1)
      color: rgb(248, 248, 248)
      box-shadow: 3px 3px 3px #888888
      cursor: pointer
      outline: none
    button:active
      background: rgba(130, 130, 130, 1)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
