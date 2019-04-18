const mongoose = require('mongoose');
// 数据库定义为AxueBlog，没有的话会自动创建，不创建的话就使用默认库test
mongoose.connect('mongodb://localhost/AxueBlog', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', () => {console.log('mongoose connection error')}); // 连接失败
db.on('connected', () => {console.log('mongoose connection success to mongodb://localhost/AxueBlog')}); // 连接成功

// schema相当于表结构
// 定义一个用户表
const UserSchema = new mongoose.Schema({
  username: {type: String}, // 用户账户
  userpwd: {type: String}, // 用户密码
  usertype: {type: String}, // 管理者1，游客2
  usertype: {type: String}, // 登陆时间
});

// 定义一个文章表
const articleSchema = new mongoose.Schema({
  title: {type: String}, // 标题
  abstract: {type: String}, // 摘要
  content: {type: String}, // 内容
  img: {type: String}, // 图片
  date: {type: String}, // 日期
});

const Models = {
  User: mongoose.model('User', UserSchema), // model是由schema生成的模型，可以对数据库的操作
  Article: mongoose.model('Article', articleSchema) // 表名为articles，这是schema内部机制
}
module.exports = Models;