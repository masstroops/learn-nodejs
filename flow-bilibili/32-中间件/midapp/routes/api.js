let express = require('express')
let sqlQuery = require('../cbSql')

// 实例化路由模块， 此路由模块相当于一个小的app实例

let api = express.Router()
api.use((req, res, next) => {
  // 允许跨域访问
  res.append('Access-Control-Allow-Origin','*')
  res.append('Access-Control-Content-Type','*')
  next()
})

// 提供前端ajax请求的接口
// 提供什么分类下，第n页book的数据
api.get('/book/:cid/:pid', async(req, res) => {
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

  res.json(options)
})

// 获取所有分类
async function getCategory() {
  let sqlStr = 'select * from category'
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}

module.exports = api