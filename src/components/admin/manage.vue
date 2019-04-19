<template>
  <div class="manage">
    <Table :columns="tableTitle" :data="tableData">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>

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
            title: '操作',
            align: 'center',
            slot: 'action'
        }
      ],
      tableData: []
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
    getArticleList () { // 获取文章列表
      this.$axios.post('/api/getArticleList').then(res => {
        console.log(res.data);
        this.tableData = res.data;
      }).catch(err => {
        console.log(`获取文章列表catch: ${err}`);
      });
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.manage
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  position: relative
</style>
