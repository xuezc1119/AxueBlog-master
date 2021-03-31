<template>
  <div class="category">
    <div class="add">
      <Button type="primary" icon="ios-add" @click="addCategory">添加</Button>
    </div>
    <Divider />
    <div class="list">
      <div class="item" v-for="(item, index) in categoryList" :key="index" :style="{backgroundColor:getRandomColor()}">
        {{item.name}}
        <div class="btn">
          <Icon type="ios-create" color="#fff" @click="editCategory(index)" />
          <Icon type="md-trash" color="#fff" @click="deleteCategory(index)" />
        </div>
      </div>
    </div>
    <div class="table-page"><Page :current="page.pageIndex" :total="page.totalCount" :page-size="page.pageSize" @on-change="changePage" /></div>
    <Modal v-model="showModal" :closable="false" :title="title">
      <div>
        <Input v-model="inputValue" placeholder="请输入类别名称" maxlength="10" show-word-limit />
      </div>
      <div class="modal-footer" slot="footer">
        <Button @click="showModal=false">取消</Button>
        <Button type="primary" @click="confirm" style="margin-left: 20px;">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { reqGetCategoryList, reqSaveCategory, reqUpdateCategory, reqDeleteCategory } from '@/api/api';
export default {
  name: 'category',
  data () {
    return {
      title: '',
      inputValue: '',
      editValue: '', // 编辑暂存
      showModal: false,
      page: {
        totalCount: 0,
        pageIndex: 1,
        pageSize: 20
      },
      categoryList: []
    }
  },
  created () {
    this.reqGetList();
  },
  methods: {
    reqGetList () { // 获取文章类别列表
      let params = {
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      };
      reqGetCategoryList(params).then(res => {
        console.log(res.data.data);
        this.categoryList = res.data.data;
        this.page.totalCount = res.data.total;
      }).catch(err => {
        console.log(`获取文章类别列表catch: ${err}`);
      });
    },
    addCategory () {
      this.showModal = true;
      this.title = '添加类别';
      this.inputValue = '';
    },
    confirm () { // 确定添加类别
      if (this.title === '编辑类别') {
        if (this.editValue.name === this.inputValue) {
          this.$Message.warning('您尚未做任何修改！');
          return;
        }
        let categoryInfo = this.editValue;
        categoryInfo.name = this.inputValue;
        reqUpdateCategory({categoryDetails: categoryInfo}).then(res => {
          if (res.data.status === 1) {
            this.$Message.success('编辑成功！');
            this.showModal = false;
            this.reqGetList();
          } else {
            this.$Message.error('编辑失败！');
          }
        });
      } else {
        let params = {
          name: this.inputValue
        };
        reqSaveCategory(params).then(res => {
          if (res.data.status === 1) {
            this.$Message.success('添加成功！');
            this.showModal = false;
            this.reqGetList();
          } else {
            this.$Message.error('添加失败！');
          }
        });
      }
    },
    editCategory (index) { // 编辑分类
      this.showModal = true;
      this.title = '编辑类别';
      this.inputValue = this.categoryList[index].name;
      this.editValue = this.categoryList[index];
    },
    deleteCategory (index) { // 删除分类
      this.$Modal.confirm({
        title: '提示',
        content: '是否确认删除？',
        onOk: () => {
          reqDeleteCategory({categoryId: this.categoryList[index]._id}).then(res => {
            if (res.data.status === 1) {
              this.$Message.success('删除成功！');
              this.reqGetList();
            } else {
              this.$Message.error('删除失败！');
            }
          }).catch(err => {
            this.$Message.error(`删除失败：${err}`);
          });
        }
      });
    },
    changePage (page) {
      this.page.pageIndex = page;
      this.reqGetList();
    },
    getRandomColor () { // 生成随机颜色-浅色
      return '#' +
        (function rand(color) {
          return(color += '5678956789defdef' [Math.floor(Math.random() * 16)]) &&
            (color.length === 6) ? color : rand(color);
        })('');
    }
  },

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.category
  width: 100%
  height: 100%
  position: relative
  .add 
    padding: 15px 15px 0 0;
    text-align: right;
  .table-page
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
  .list
    display: flex;
    flex-wrap: wrap;
    .item
      width: calc(20% - 20px);
      height: 100px;
      line-height: 100px;
      text-align center;
      border-radius: 4px;
      margin: 0 10px 10px 10px;
      overflow: hidden;
      font-size: 16px;
      position: relative;
      &:hover .btn{
        top: 80px;
      }
    .btn
      display: flex;
      justify-content space-around;
      cursor: pointer;
      position: absolute;
      font-size: 20px;
      background: rgba(0,0,0,0.2);
      left: 0;
      right: 0;
      top: 100px;
      transition: all 0.5s ease;
</style>
