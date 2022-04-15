const express = require('express')
const router = express.Router()

router.get('/setSession', (req, res) => {
  // 登录之后，要获取user的名称，vip等级，是否登录
  req.session.isLogin = true
  req.session.username = '小美'
  req.session.vip = 5
  // req.session.cookie.maxAge = 10000 // 重置cookie过期时间
  res.send('登录状态设置到session中')
})

router.get('/getSession', (req, res) => {
  console.log(req.session)
  if (req.session.isLogin) {
    res.send('欢迎等级为'+req.session.vip+'的'+req.session.username+'<a href="/session/exitSession">退出登录</a>')
  } else {
    res.send('尚未登录')
  }
})

// 销毁
router.get('/exitSession', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      console.log('session销毁成功')
      res.send('退出登录成功')
    } else {
      res.send('退出登录失败')
    }
  })
})

module.exports = router