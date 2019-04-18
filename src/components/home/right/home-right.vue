<template>
  <div class = "right-box">
    <div class = "right-mine">
      <div class = "right-mine-top">
        <span>{{myContent.myTitle}}</span>
      </div>
      <div class = "right-mine-center">
        <div class = "img-box">
          <img :src = "myContent.myImg">
        </div>
        <p>{{myContent.myAbstract}}</p>
      </div>
      <div class = "right-mine-bottom">
        <button>More About Me</button>
      </div>
    </div>
    <div class = "right-message">
      <div class = "right-message-title">{{messageContent.title}}</div>
      <div class = "right-message-content">{{messageContent.content}}</div>
      <div class = "right-message-button">
        <button class = "right-message-btn">{{messageContent.btn}}</button>
        <div class = "btn-mark">
          <div class = "btn btn-empty"></div>
          <button class = "btn btn-text">{{messageContent.btnMark}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-right',
  data () {
    return {
      myContent: {
        myTitle: 'Story about me',
        myImg: './static/img/mine/castle.jpg',
        myAbstract: 'Hello I’m Axue author of this blog in front of you. This is my personal space which is like to share others. And I am a lively girl, living and programming in China. Finally, I’m glad you could come.',
      },
      messageContent: {
        title: 'Attention',
        content: 'If you want to leave a message for me, please log in first.:)',
        btn: 'LEAVE MESSAGE',
        btnMark: 'SIGN IN'
      },
      noSignIn: false
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.right-box
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  align-items: center
  .right-mine
    width: 100%
    margin: 25px 0 5% 0
    padding: 5%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    background: #fff
    cursor: pointer
    .right-mine-top
      width: 100%
      height: 50px
      padding: 3% 2%
      border-bottom: 1px dashed rgba(44, 62, 80, 0.5)
      span
        width: 100%
        font-weight: bold
        font-size: 16px
        text-align: left
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
    .right-mine-center
      width: 100%
      height: 480px
      margin: 5% 0 0 0
      display: flex
      flex-direction: column
      align-items: center
      .img-box
        width: 85%
        height: 80%
        cursor: pointer
        overflow: hidden
        img
          width: 100%
          height: 100%
      p
        width: 85%
        height: 10%
        margin: 2% 0
        color: rgba(44, 62, 80, 0.8)
        text-align: left
        font-size: 12px
      @media only screen and (max-width: 878px)
        height: 400px
    .right-mine-bottom
      width: 85%
      height: 30px
      display: flex
      align-items: center
      button
        width: 50%
        height: 30px
        color: #fff
        background: #FFB661
        border: none
        outline: none
        border-radius: 30px
      button:hover
        background: #FFB781
      button:active
        background: #FFB790
  .right-mine:hover
    transform: scale(1.01)
    box-shadow: 6px 6px 20px 2px rgba(130, 130, 130, 0.6)
  .right-message
    width: 95%
    margin: 5% 0
    padding: 10% 8%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    background: rgba(255, 182, 97, 1)
    cursor: pointer
    border: 5px solid rgba(255, 163, 56, 1)
    .right-message-title
      width: 100%
      height: 35px
      text-align: left
      color: #fff
      font-size: 20px
      font-weight: bold
    .right-message-content
      width: 100%
      height: 80px
      display: flex
      align-items: center
      text-align: left
      color: #fff
      font-size: 14px
    .right-message-button
      position: relative
      width: 100%
      height: 40px
      overflow: hidden
      margin: 10px 0 0 0
      .right-message-btn
        width: 100%
        height: 40px
        border: none
        border-radius: 20px
        outline: none
        background: #fff
        color: rgba(230, 163, 87, 1)
        cursor: pointer
      .btn-mark
        width: 100%
        height: 80px
        position: absolute
        left: 0
        top: 0
        overflow: hidden
        animation: none
        cursor: pointer
        padding: 0 8%
        @keyframes maskCheckMark
          from
            top: 0
          to
            top: -40px
        .btn
          width: 80%
          height: 40px
          border: none
          outline: none
        .btn-text
          background: rgba(255, 255, 255, 0.9)
          color: rgba(223, 136, 40, 1)
          border-radius: 20px
          width: 100%
          font-weight: bold
          cursor: pointer
      .btn-mark:hover
        animation: maskCheckMark 1s ease forwards
</style>
