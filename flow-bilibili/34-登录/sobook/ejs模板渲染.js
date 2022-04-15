let sqlQuery = require('./cbSql')
let express = require('express')
let app = express()
// 使用模板来渲染页面
let ejs = require('ejs')
// 将模板引擎与express应用相关联
app.set('views', 'views') // 设置视图的对应目录
app.set('view engine', 'ejs') // 设置默认的模板引擎
app.set('ejs', ejs.__express) // 定义模板引擎

/**
 * ejs模板语法
 * <% xxx %> 里面写入的是js语法
 * <%= xxx %> 返回的变量进行解析，输出到页面
 * <%- xxx %> 返回的变量不解析，原封不动输出到页面
 * <%# 注释、不执行、不输出
 */

app.get('/', async(req, res) => {
  // 数据库book表里前28的bokk获取出来
  let strSql = "select id,bookname,bookimg,author,category from book limit 0,28"
  let result = await sqlQuery(strSql)
  
  // res.json(Array.from(result))

  // 插入变量
  // let options = {
  //   title: 'book首页',
  //   articleTitle: '<h1>文章标题</h1>'
  // }
  // res.render('./index.ejs', options)

  // 条件显示
  // let options = {
  //   username: '下班',
  //   gender: '男'
  // }
  // res.render('condition.ejs', options)

  // 循环显示
  let arr = ['陈兵', '疾风', '开发', '安抚']
  res.render('for.ejs', { arr })
})

// 小说文学
app.get('/xiaoshuowenxue', async(req, res) => {
  let strSql = "select id,bookname,bookimg,author,category from book where category = '小说文学' limit 0,28"
  let result = await sqlQuery(strSql)
  
  res.json(Array.from(result))
})

// 书籍详情
app.get('/books/:bookid', async(req, res) => {
  let strSql = "select * from book where id = ?"
  let bookid = req.params.bookid
  let result = await sqlQuery(strSql,[bookid])
  
  res.json(Array.from(result))
})

module.exports = app