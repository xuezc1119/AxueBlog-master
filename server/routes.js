"use strict";
const db = require('./db');
const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { count } = require('console');

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
  articleInfo.category = req.body.category;
  articleInfo.categoryId = req.body.categoryId;
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
    docs[0].category = details.category;
    docs[0].categoryId = details.categoryId;
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
// -------------------------这个方法有一个问题-不能获取到模糊查询后的数据总数--所以改用下面的方式-------------------
// -------------------------进行模糊查询同时进行分页，获取的总数是分页的总数，所以方法弃用-------------------------
// router.post('/api/admin/getArticleList', (req, res) => {
//   db.Article.estimatedDocumentCount({}, (err, count)=> { // estimatedDocumentCount-获取总数
//     let index = req.body.pageIndex ? ((req.body.pageIndex-1)*req.body.pageSize) : 0;
//     let size = req.body.pageSize ? req.body.pageSize : count; // 没有传参时直接获取全部数据
//     let search = req.body.search ? req.body.search : '';
//     // $regex可以实现模糊查询
//     // 对应mongodb中，可以直接使用 ‘/../’ 斜杠。但是在nodejs中，必须要使用RegExp，来构建正则表达式对象
//     var str = ".*" + search + ".*$";
//     var reg = new RegExp(str);
//     var _filter = {
//       $or: [ // 多条件模糊查询
//         {"title": {$regex: reg, $options: 'i'}},
//         {"abstract": {$regex: reg, $options: 'i'}},
//       ]
//     };
//     // db.Article.find({"title": {$regex: reg, $options: 'i'}}, (err, data) => { // $options: 'i'忽略大小写
//     db.Article.find(_filter, (err, data) => { // 多条件查询 
//       if (err) {
//         res.send(err);
//         return;
//       }
//       res.send({'status': 1, 'data': data, 'total': count});
//     }).skip(index).limit(size)
//   });
// })

// 获取所有文章列表
router.post('/api/admin/getArticleList', (req, res) => {
    let index = req.body.pageIndex ? ((req.body.pageIndex-1)*req.body.pageSize) : 0;
    let size = req.body.pageSize ? req.body.pageSize : 10; // 每页几条
    let search = req.body.search ? req.body.search : ''; // 搜索关键字
    let count = 0; // 总数
    // $regex可以实现模糊查询
    // 对应mongodb中，可以直接使用 ‘/../’ 斜杠。但是在nodejs中，必须要使用RegExp，来构建正则表达式对象
    var str = ".*" + search + ".*$";
    var reg = new RegExp(str);
    var _filter = {
      $or: [ // 多条件模糊查询
        {"title": {$regex: reg, $options: 'i'}}, // $options: 'i'忽略大小写
        {"abstract": {$regex: reg, $options: 'i'}},
      ]
    };
    var p1 = new Promise((resolve, reject)=> {
      db.Article.find(_filter).count((err,con)=>{ // 获取总数
        if (err) {
          res.send(err);
          reject(err);
          return;
        }
        resolve(con);
      });
    });
    var p2 = new Promise((resolve, reject)=>{
      // db.Article.find({"title": {$regex: reg, $options: 'i'}}, (err, data) => { // $options: 'i'忽略大小写
      db.Article.find(_filter, (err, data) => { // 多条件查询 
        if (err) {
          res.send(err);
          reject(err);
          return;
        }
        resolve(data);
      }).skip(index).limit(size)
    });
    Promise.all([p1, p2]).then(val => {
      console.log(val)
      count = (val[0] && val[0]>=0) ? val[0] : 0;
      res.send({'status': 1, 'data': val[1], 'total': count});
    });
    
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

// 新增文章类别
router.post('/api/admin/saveArticleCategory', (req, res) => {
  let categoryInfo = {};
  categoryInfo.name = req.body.name;
  let newArticleCategory = new db.Category(categoryInfo);
  newArticleCategory.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({'status': 1, 'message': '新建类别成功！'});
    }
  });
})

// 更新文章类别
router.post('/api/admin/updateArticleCategory', (req, res) => {
  let details = req.body.categoryDetails;
  db.Category.find({_id: details._id}, (err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    console.log(docs); // 这是根据_id查找到的数据，唯一的，是一个对象数组，数组长度为1
    docs[0].name = details.name;
    db.Category(docs[0]).save((err) => {
      if (err) {
        res.send(err);
      } else {
        db.Article.update({'categoryId': details._id}, {$set: {'category': details.name}}, {multi:true}, (error, result)=> {
          res.send({'status': 1, 'message': '更新类别成功！'});
        });
        // 上面使用了update()方法，
        // param1:{查询条件}   param2{更新的数据}   param3{upsert:如果不存在是否插入, multi:更新第一条还是全部}
        // 使用save()也可以
        // db.Article.find({categoryId: details._id}, (error, doc) => {
        //   if (error) {
        //     res.send(error);
        //     return;
        //   }
        //   if (doc && doc.length > 0) {
        //     doc.forEach(item => {
        //       item.category = details.name;
        //       db.Article(item).save();
        //     })
        //   }
        //   res.send({'status': 1, 'message': '更新类别成功！'});
        // })
      }
    });
  })
  
})

// 获取所有文章类别列表
router.post('/api/admin/getArticleCategoryList', (req, res) => {
  let index = req.body.pageIndex ? ((req.body.pageIndex-1)*req.body.pageSize) : 0;
  let size = req.body.pageSize ? req.body.pageSize : 20;
  db.Category.estimatedDocumentCount({}, (err, count) => {
    db.Category.find({}, (err, data) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send({'status': 1, 'data': data, 'total': count});
    }).skip(index).limit(size)
  })
})

// 删除文章类别
router.post('/api/admin/deleteArticleCategory', (req, res) => {
  db.Category.remove({_id: req.body.categoryId}, (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({'status': 1, 'message': '删除成功！'});
  })
})

// 根据文章id查找文章明细
router.post('/api/admin/getArticleDetails', (req, res) => {
  db.Article.find({'_id': req.body.id}, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({'status': 1, 'data': data[0]});
  })
})

// 统计所有类别对应数据数量
router.post('/api/admin/statisticCategory', (req, res) => {
  db.Article.aggregate([{$group : {_id : "$category", total : {$sum : 1}}}], (err,data)=>{
    if (err) {
      res.send(err);
      return;
    }
    res.send({'status': 1, 'data': data});
  })
})

module.exports = router;