const fs = require('fs'); // 操作文件模块
const path = require('path'); // 文件路径模块
// node.js中间件，用于处理JSON,Raw,Text和URL编码的数据
const bodyParser = require('body-parser'); // 请求体对象化，便于后台解析前端发送的body内容
const cors = require('cors'); // 解决跨域
const express = require('express');
const api = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

// 跨域
app.use(cors());
app.use(bodyParser.json()); // 读取本地json
app.use(api);
app.use(cookieParser());

app.listen(8088);

app.get('/', function (req, res) {
  res.send('连接服务器成功啦啦啦啦啦啦');
})

console.log('连接服务器成功啦啦啦啦啦啦');