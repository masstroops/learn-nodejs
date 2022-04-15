var express = require('express');
var path = require('path');
let sqlQuery = require('./cbSql');
const cookieParser = require('cookie-parser')
const session = require('express-session')
var app = express();

const bookRouter = require('./routes/book')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// session配置
app.use(session({
  secret: 'cb', // 加盐
  cookie: {},
  resave: true, // 强制保存session
  saveUninitialized: true, // 是否保存初始化的session
}))

// 设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
  let page = 1
  let sqlstr = 'select id,bookname,bookimg,author,category from book limit ?,28'
  let arr = [(page-1)*28]
  let result = await sqlQuery(sqlstr, arr)

  // 获取总页数
  let sqlstr2 = 'select count(id) as num from book'
  let result2 = await sqlQuery(sqlstr2)
  let pageAll = Math.ceil(result2[0].num/28)
  let cid = 0
  // 设置分页起始點
  let startPage = (page-4)<1 ? 1 : (page-4)
  let endPage = (page+5)>pageAll ? pageAll : (page+5)

  let options = {
    books: Array.from(result),
    categorys: await getCategory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage,
  }
  res.render('bookindex.ejs', options)
})


// 设置搜索的路由
app.get('/search/:searchKey/page/:pid', async(req, res) => {
  let sqlstr = 'select id,bookname,bookimg,author,category from book where bookname like "%'+ req.params.searchKey +'%" or author like "%'+ req.params.searchKey +'%" limit 0,28'
  let result = await sqlQuery(sqlstr)

  // 获取总页数
  let page = parseInt(req.params.pid)
  let sqlstr2 = 'select count(id) as num from book where bookname like "%'+ req.params.searchKey +'%" or author like "%'+ req.params.searchKey +'%"'
  let result2 = await sqlQuery(sqlstr2)
  let pageAll = Math.ceil(result2[0].num/28)
  let cid = req.params.searchKey
  // 设置分页起始點
  let startPage = (page-4)<1 ? 1 : (page-4)
  let endPage = (page+5)>pageAll ? pageAll : (page+5)

  let options = {
    books: Array.from(result),
    categorys: await getCategory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage,
  }
  res.render('searchindex.ejs', options)
})

// 分页路由
app.get('/category/:cid/page/:pid', async(req, res) => {
  let page = parseInt(req.params.pid)
  let sqlstr = 'select id,bookname,bookimg,author,category from book where category in (select name from category where id = ?) limit ?,28'
  let arr = [req.params.cid, (page-1)*28]
  // 判断首页
  if (req.params.cid == 0) {
    sqlstr = 'select id,bookname,bookimg,author,category from book limit ?,28'
    arr = [(page-1)*28]
  }
  let result = await sqlQuery(sqlstr, arr)

  // 获取总页数
  let sqlstr2 = 'select count(id) as num from book where category in (select name from category where id = ?)'
  // 判断首页
  if (req.params.cid == 0) sqlstr2 = 'select count(id) as num from book'
  let result2 = await sqlQuery(sqlstr2, arr)
  let pageAll = Math.ceil(result2[0].num/28)
  let cid = req.params.cid
  // 设置分页起始點
  let startPage = (page-4)<1 ? 1 : (page-4)
  let endPage = (page+5)>pageAll ? pageAll : (page+5)

  let options = {
    books: Array.from(result),
    categorys: await getCategory(),
    pageAll,
    page,
    cid,
    startPage,
    endPage,
  }
  res.render('bookindex.ejs', options)
})

app.use('/login', loginRouter)
app.use('/books', bookRouter)
app.use('/register', registerRouter)

// 获取所有分类
async function getCategory() {
  let sqlStr = 'select * from category'
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}

module.exports = app;
