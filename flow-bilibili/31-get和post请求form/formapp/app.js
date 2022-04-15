var express = require('express');
var path = require('path');
var app = express();
var sqlQuery = require('./cbSql')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// 解析post提交的数据
app.use(express.urlencoded())

// 首页搜索
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// 自己封装提取get表单数据
app.get('/search', (req, res) => {
  console.log(req.url)
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
  console.log(query)
  res.send('搜索页面')
})

app.get('/search1', async(req, res) => {
  // 使用express自带的get获取数据
  console.log(req.query)
  // 根据searchKey查找
  let strsql = 'select id,bookname,category from book where bookname like "%'+req.query.searchKey+'%"'
  let result = await sqlQuery(strsql)
  res.json(Array.from(result))
})

// 获取post提交的请求
app.post('/search2', async(req, res) => {
  // 注意post提交的数据不在query属性上，在body上，且需要app.use(express.urlencoded())进行解析
  console.log(req.query, req.body)

  res.send('post提交的数据')
})

// 登录页
app.get('/login', (req, res) => {
  res.render('login.ejs')
})
// 处理登录请求
app.post('/login', async(req, res) => {
  let username = req.body.username, password = req.body.password
  let sqlstr = 'select * from user where username = ? and password = ?'
  let arr = [username, password]
  let result = await sqlQuery(sqlstr, arr)
  if (result.length) {
    res.send('登录成功')
  } else {
    res.send('登录失败')
  }
})

app.get('/ajax', async(req, res) => {
  res.render('ajax.ejs')
})

module.exports = app;
