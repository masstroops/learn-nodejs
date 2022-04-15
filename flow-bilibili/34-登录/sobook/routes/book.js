const express = require('express')
const router = express.Router()
const sqlQuery = require('../cbSql')

// 进入详情页，必须登录
// 1、引入cookie或session相关的模块
// 2、引入一个判断是否登录的中间件
// 3、登录界面

function isLogin(req, res, next) {
  if (req.session.username) {
    next()
  } else {
    res.render('info.ejs', {
      title: '未登录',
      content: '尚未登录，请进入登录页面登录',
      href: '/login',
      hrefText: '登录页',
    })
  }
}

router.get('/:bookid', isLogin, async(req, res) => {
  let strSql = "select * from book where id = ?"
  let bookid = req.params.bookid
  let result = await sqlQuery(strSql,[bookid])
  let options = {
    book: result[0],
    categorys: await getCategory(),
  }
  res.render('bookinfo.ejs', options)
})

// 销毁
router.get('/out/exitSession', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      console.log('session销毁成功')
      res.send('退出登录成功')
    } else {
      res.send('退出登录失败')
    }
  })
})


// 获取所有分类
async function getCategory() {
  let sqlStr = 'select * from category'
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}


module.exports = router