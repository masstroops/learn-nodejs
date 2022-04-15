var express = require('express');
var router = express.Router();
const sqlQuery = require('../cbSql')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.ejs')
});

router.post('/', async(req, res) => {
  console.log(req.body)
  let sqlstr = 'select * from user where email = ? and password = ?'
  let arr = [req.body.email, req.body.password]
  let result = await sqlQuery(sqlstr, arr)
  if (result.length !== 0) {
    // 登录成功
    user = result[0]
    req.session.username = user.username
    res.render('info.ejs', {
      title: '登录成功',
      content: '帐号密码正确,即将进入首面',
      href: '/',
      hrefText: '首页',
    })
  } else {
    res.render('info.ejs', {
      title: '登录失败',
      content: '帐号密码不正确,即将进入登录页',
      href: '/login',
      hrefText: '登录页',
    })
  }
})

module.exports = router;
