let express = require('express')
let app = express()

// 1、字符串路径
app.get('/', (req, res) => {
  res.send('这是首页')
})

// ab+cd b至少有一个，例如：abcd abbcd abbbcd
// ab*cd *表示可以是任何字符，例如：abcd ab4382cd abjfacd
// ab(cd)?e 例如：abe abcde
// 2、类字符串的正则模式
// 例如：匹配2个路径 abcd 或 acd
app.get('/ab?cd', (req, res) => {
  res.send('这是abcd或acd')
})

// 3、正则模式
// /a开头跟随10个及以上的数字
app.get(/\/a\d{10,}/, (req, res) => {
  res.send('新闻页面')
})

// 4、动态路由
app.get('/news/:newsid', (req, res) => {
  res.send('新闻'+req.params.newsid+'页面')
})

// 5、多回调函数处理请求，用于复杂的请求处理
app.get('/cb', (req, res, next) => {
  console.log(123)
  req.p1 = 123
  next()
},
(req, res) => {
  console.log(456)
  res.send('处理完毕：',req.p1)
}
)

app.listen(80)