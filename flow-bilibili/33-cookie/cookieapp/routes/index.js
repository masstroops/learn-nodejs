var express = require('express');
var router = express.Router();
const crypto = require('crypto')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/setcookie', (req, res) => {
  // 基础设置cookie,有效期默认为1个会话,浏览器关闭就失效
  // res.cookie('isLogin', true)
  // res.cookie('isLogin', true, { maxAge: 30000 })
  // 设置加密操作
  res.cookie('isLogin', 'true', { signed: true })
  res.send('cookie设置成功')
})

router.get('/admin', (req, res) => {
  if(req.cookies.isLogin) {
    res.send('登录成功')
  } else {
    res.send('登录失败')
  }
})

router.get('/adminSecret', (req, res) => {
  console.log(req.signedCookies)
  // 获取加密cookie
  if (req.signedCookies.isLogin) {
    res.send('登录成功')
  } else {
    res.send('登录失败')
  }
})

// 加密原理解析
router.get('/secret', (req, res) => {
  let password = '123456'
  // 使用的加密算法
  let suanfa = crypto.createHash('md5')
  // 对字符串加密
  suanfa.update(password)
  // 加密的二进制数据已字符串显示
  let content = suanfa.digest('hex')
  res.send(content)
})

// 自己定义加密cookie
router.get('/appSecret', (req, res) => {
  let secretStr = jiami('true')
  res.cookie('register', secretStr)
  // 设置将加密的密文和明文内容放置保存在变量
  setSecretCookie('true', secretStr)
  res.send('cookie加密成功')
})

// 获取自己加密的cookie值
router.get('/getAppSecret', (req, res) => {
  // 获取加密后的密文
  let strSecret = req.cookies.register
  let content = getSecretCookie(strSecret)
  console.log('密码',content)
  res.send('密码'+content)
})

// 将加密密码和密码保存在改对象
let secretCookie = {}

function setSecretCookie(str, secretStr) {
  secretCookie[secretStr] = str
}

function getSecretCookie(secretStr) {
  return secretCookie[secretStr]
}

function jiami(str) {
  // 使用的加密算法
  let suanfa = crypto.createHash('md5')
  // 对字符串加密
  suanfa.update(str + 'cb')
  // 加密的二进制数据已字符串显示
  let content = suanfa.digest('hex')

  return content
}

module.exports = router;
