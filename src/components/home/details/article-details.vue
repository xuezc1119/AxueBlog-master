<template>
  <div class="article-details">
    <div class="details-box">
      <h1>{{detailsInfo.title}}</h1>
      <div>
        <Icon type="md-calendar" />  发表于  {{detailsInfo.date}}
        <Icon type="md-pricetags" class="box-tag" />  归类于  {{detailsInfo.category}}
      </div>
      <br>
      <p class="box-abstract">{{detailsInfo.abstract}}</p>
      <br>
      <div class="box-content" v-html="detailsInfo.content"></div>
    </div>
  </div>
</template>
<script>

import { reqGetArticleDetails } from '@/api/api';
import { markdown } from '../../../util/util';
export default {
  name: 'articleDetails',
  data () {
    return {
      detailsInfo: {}
    }
  },
  created () {
    this.getArticleDetails();
  },
  methods: {
    getArticleDetails () {
      let params = {
        id: this.$route.params.id
      }
      reqGetArticleDetails(params).then(res => {
        if (res.data.status === 1) {
          console.log(res.data);
          this.detailsInfo = res.data.data;
          this.detailsInfo.content = markdown(res.data.data.content||'');
        } else {
          this.$Message.error('系统错误！');
        }        
      }).catch(err => {
        console.log(`获取文章明细catch: ${err}`);
      });
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
// import url("https://cdn.bootcss.com/highlight.js/9.18.1/styles/monokai-sublime.min.css")
.article-details {
  width: 100%;
  height: 100%;
  padding: 2%;
  .details-box {
    width: 80%;
    margin: auto;
    border: 1px solid #d4d4d4;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 5px 0 rgba(38, 42, 48, 0.1);
    .box-tag {
      margin-left: 2%;
    }
    .box-abstract {
      width: 60%;
      margin: auto;
      color: #949494;
    }
    .box-content {
      margin: auto; 
      width: 90%;
      text-align: left;
    }
  }
}
</style>
