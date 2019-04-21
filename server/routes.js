"use strict";
const db = require('./db');
const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require("jsonwebtoken");

// 注册
router.get('/api/admin/signUp', (req, res) => {
  res.send('访问注册接口');
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
      res.send({'status': 1});
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
        res.send({'status': 1});
      }
    });
  })
})

// 获取所有文章列表
router.post('/api/getArticleList', (req, res) => {
  db.Article.find({}, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(data);
  })
})

// 删除文章
router.post('/api/admin/deleteArticle', (req, res) => {
  db.Article.remove({_id: req.body.articleId}, (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({'status': 1});
  })
})

module.exports = router;