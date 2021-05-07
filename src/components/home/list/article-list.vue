<template>
  <div class="article-details">
    <div class="details-box" v-for="(item, index) in articleList" :key="index" @click="showDetails(index)">
      <p class="box-title">{{item.title}}</p>
      <div class="box-div">
        <Icon type="md-calendar" />  发表于  {{item.date}}
        <Icon type="md-pricetags" class="box-tag" />  归类于  {{item.category}}
        <Icon type="md-eye" class="box-tag" />  {{item.visits}}次围观
      </div>
      <p class="box-abstract">{{item.abstract}}</p>
      <br>
    </div>
  </div>
</template>
<script>

import { reqArticlesByCategory } from '@/api/api';
export default {
  name: 'articleList',
  data () {
    return {
      articleList: {}
    }
  },
  created () {
    this.getArticleDetails();
  },
  methods: {
    getArticleDetails () {
      let params = {
        categoryId: this.$route.params.id
      }
      console.log(params);
      reqArticlesByCategory(params).then(res => {
        if (res.data.status === 1) {
          console.log(res.data);
          this.articleList = res.data.data;
        } else {
          this.$Message.error('系统错误！');
        }        
      }).catch(err => {
        console.log(`获取文章明细catch: ${err}`);
      });
    },
    showDetails (index) {
      this.$router.push({name: 'articleDetails', params: {id: this.articleList[index]._id}});
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.article-details {
  width: 100%;
  height: 100%;
  padding: 2%;
  .details-box {
    width: 70%;
    margin: 2% auto;
    padding: 1% 3%;
    border: 1px solid #d4d4d4;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 5px 0 rgba(38, 42, 48, 0.1);
    cursor: pointer;
    .box-title {
      font-size: 22px;
      text-align: left
    }
    .box-tag {
      margin-left: 2%;
    }
    .box-abstract {
      width: 100%;
      color: #949494;
      position: relative;
      padding: 0 1%;
    }
    .box-abstract::before{
      content:'';
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background: #666;
    }
    .box-abstract, .box-div {
      text-align: left;
      margin-top: 2%;
    }
  }
}
</style>
