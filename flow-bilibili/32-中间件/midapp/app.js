var express = require('express');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 中间件
1.浏览器发送请求
2.express接受请求
中间处理的过程
3.路由函数处理渲染（req,res）
4.res.render渲染

中间件函数可以执行以下任务：
执行任何代码。
对请求和响应对象进行更改。
结束请求/响应循环。
调用堆栈中的下一个中间件函数。
中间件也分为应用层中间件、路由中间件、内置中间件、错误处理中间件和第三方中间件。下面分别对以下进行说明：
 */

// 添加中间件
app.use((req, res, next) => {
  res.addNum = (a, b) => {
    return a + b
  }
  console.log('访问任何页面此函数都会被调用')
  next()
})

// 封装cbquery中间件
app.use((req, res, next) => {
  let splitRes = req.url.split('?')
  console.log(splitRes)
  if (splitRes.length == 1) {next();return;}
  // 提取?后字符串
  let queryStr = req.url.split('?')[1]
  // 对表单提交键值对进行分割
  let keyValueArr = queryStr.split('&')
  let query = {}
  keyValueArr.forEach((item, i) => {
    let key = item.split('=')[0]
    let value = item.split('=')[1]
    query[key] = value
  })
  req.cbQuery = query
  next()
})

app.get('/', (req, res) => {
  console.log(req.cbQuery)
  res.send('这是首页'+res.addNum(1,2))
})

const router1 = require('./routes/mall')
app.use('/mall', router1)

const api = require('./routes/api')
app.use('/api', api)

module.exports = app;
