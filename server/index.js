const fs = require('fs'); // 操作文件模块
const path = require('path'); // 文件路径模块
// node.js中间件，用于处理JSON,Raw,Text和URL编码的数据
const bodyParser = require('body-parser'); // 请求体对象化，便于后台解析前端发送的body内容
const cors = require('cors'); // 解决跨域
const express = require('express');
const api = require('./routes');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const app = express(); 

// 此处使用有顺序问题，需要把全局判断放在最上面才可以
app.use(function (req, res, next) { 
  console.log('-----------------test--------', req.url);
  if (req.url !== '/api/admin/login' && req.url !== '/api/admin/register') {
    let token = req.headers.token;
    let secretOrPrivateKey = '555000'; // 加密密钥
    jwt.verify(token, secretOrPrivateKey, (err, data) => {
      if (err) {
        console.log('过期');
        res.send({'status': 0, 'message': '身份已过期'});
      } else {
        next();
      }
    });
  } else {
    next();
  }
});
// 跨域
app.use(cors());
app.use(bodyParser.json()); // 读取本地json
app.use(api);
app.use(cookieParser());

app.listen(9088);

app.get('/', function (req, res) {
  res.send('连接服务器成功啦啦啦啦啦啦');
})

console.log('连接服务器成功啦啦啦啦啦啦');