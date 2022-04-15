var express = require('express');
var router = express.Router();
var sqlQuery = require('../cbSql.js')
var crypto = require('crypto')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register.ejs');
});

router.post('/', async (req, res) => {
  // 获取表单提交的邮箱，密码，用户名
  let email = req.body.email
  let password = jiami(req.body.password)
  let username = req.body.username
  // 判断邮箱是否已注册，如果已注册，将不能注册
  let strSql = "select * from user where email=?"
  let result = await sqlQuery(strSql,[email])
  if (result.length!==0) {
    // 邮箱已注册
    res.render('info', {
      title: '邮箱注册失败',
      content: '此邮箱已注册过，可直接登录，或找寻密码',
      href: '/register',
      hrefText: '注册页'
    })
  } else {
    // 此邮箱尚未注册，可注册
    strSql = 'insert into user (email,username,password) values (?,?,?)'
    await sqlQuery(strSql, [email,username,password])
    res.render('info', {
      title: '注册成功',
      content: '注册成功请登录，即将进入登录页面',
      href: '/login',
      hrefText: '登录页'
    })
  }
})

function jiami(str) {
  let salt = 'cb'
  let obj = crypto.createHash('md5')
  str = salt+str
  obj.update(str)
  return obj.digest('hex')
}

module.exports = router;
