"use strict";
const db = require('./db');
const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require("jsonwebtoken");

// 注册
router.post('/api/admin/register', (req, res) => {
  db.User.find({username: req.body.username}, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    if (data.length > 0) {
      res.send({'status': 0, 'message': '用户名已注册！'});
    } else {
      let newUser = new db.User({
        username: req.body.username,
        userpwd: req.body.userpwd,
        usertype: req.body.usertype,
        userdate: req.body.userdate
      });
      newUser.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({'status': 1, 'message': '注册成功！'});
        }
      });
    }
  });
})

// 登录
router.post('/api/admin/login', (req, res) => {
  db.User.find({username: req.body.username, userpwd: req.body.userpwd}, (err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    if (docs.length > 0) {
      let content = {username: req.body.username}; // 保证唯一性的，格式必须是对象
      let secretOrPrivateKey = '555000'; // 密钥
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 24 // 过期时间（单位：秒）---24小时
      });
      docs[0].token = token; // 校验时生成token
      db.User(docs[0].save(err => {
        if (err) {
          res.send(err);
          return;
        }
        res.send({'status': 1, 'message': '登录成功', 'token': docs[0].token, 'userName': docs[0]['username'], 'userType': docs[0].usertype});
      }));
    } else {
      res.send({'status': 0, 'message': '登录失败'});
    }
  });
})

// 验证token
router.post('/api/admin/checkUser', (req, res) => {
  db.User.find({username: req.body.username, token: req.body.token}, (err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    if (docs.length > 0) {
      let token = req.body.token;
      let secretOrPrivateKey = '555000'; // 加密密钥
      jwt.verify(token, secretOrPrivateKey, (err, data) => {
        if (err) {
          res.send({'status': 0, 'message': '身份已过期'});
        } else {
          res.send({'status': 1, 'username': docs[0]['username']});
        }
      });
    } else {
      res.send({'status': 0, 'message': '验证失败'});
    }
  });
})

// 退出
router.post('/api/admin/signOut', (req, res) => {
  db.User.find({username: req.body.username, token: req.body.token}, (err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    // console.log('查看',docs);
    if (docs.length > 0) {
      docs[0].token = '';
      db.User(docs[0]).save(err => {
        if (err) {
          res.send(err);
          return;
        }
        res.send({'status': 1, 'message': '退出成功！'});
      });
    } else {
      res.send({'status': 0, 'message': '退出失败！'});
    }
  });
})

// 新增文章
router.post('/api/admin/saveArticle', (req, res) => {
  let articleInfo = {};
  articleInfo.title = req.body.title;
  articleInfo.abstract = req.body.abstract;
  articleInfo.content = req.body.content;
  articleInfo.img = req.body.img;
  articleInfo.date = req.body.date;
  let newArticle = new db.Article(articleInfo);
  newArticle.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({'status': 1, 'message': '新建文章成功！'});
    }
  });
})

// 更新文章
router.post('/api/admin/updateArticle', (req, res) => {
  let details = req.body.articleDetails;
  db.Article.find({_id: details._id}, (err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    console.log(docs); // 这是根据_id查找到的数据，唯一的，是一个对象数组，数组长度为1
    docs[0].title = details.title;
    docs[0].abstract = details.abstract;
    docs[0].content = details.content;
    docs[0].img = details.img;
    docs[0].date = details.date;
    db.Article(docs[0]).save((err) => { // 将修改过的文章进行保存，替换原有的文章，也就是更新
      if (err) {
        res.send(err);
      } else {
        res.send({'status': 1, 'message': '更新文章成功！'});
      }
    });
  })
})

// 获取所有文章列表
router.post('/api/admin/getArticleList', (req, res) => {
  db.Article.find({}, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({'status': 1, 'data': data});
  })
})

// 删除文章
router.post('/api/admin/deleteArticle', (req, res) => {
  db.Article.remove({_id: req.body.articleId}, (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({'status': 1, 'message': '删除成功！'});
  })
})

module.exports = router;