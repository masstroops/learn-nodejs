const querystring = require('querystring')
const http = require('http')
const url = require('url') // node.js url模块，可以操作输入的url
const fs = require('fs')
const game = require('./game')
const express = require('express') // express 是一个http服务框架

var playerWon = 0,
    playerLastAction = null,
    sameCount = 0

const app = express()

// 通过app.get设定 /favicon.ico 路径的路由
// .get 代表请求 method 是 get，所以这里可以用 post、delete 等。这个能力很适合用于创建 rest 服务
app.get('/favicon.ico', function(req, res) {
  // res.writeHead(200)
  // res.end()
  res.status(200)
  return
})

app.get('/', function(req, res) {
  // fs.createReadStream(__dirname + '/index.html').pipe(res)

  // send接口会判断你传入的值的类型，文本的话则会处理为text/html
  // Buffer的话则会处理为下载
  // express 会根据send里的内容自行判断返回给客户端的类型，除非自己指定，这里指定utf-8表示返回一个网页，不指定自动判断为一个文件并下载
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
})


app.get('/game',
  function(req, res, next) { // next 可以用在复杂的逻辑，把代码进行拆分，这是拆分出的第一个函数
    if (playerWon >= 3) {
      // res.writeHead(500)
      // res.end('套你猴子的，我再也不和你玩了!')
      // express 返回状态码和内容
      res.status(500)
      res.send('套你猴子的，我再也不和你玩了!')
    }

    next() // 调用next函数，执行下面的函数

    if (res.playerWon) {
      playerWon++
    }
  },

  function(req, res, next) { // 拆分出的第二个函数
    // const parsedUrl = url.parse(req.url)
    // const query = querystring.parse(parsedUrl.query)
    const query = req.query // express 获取请求的query只需要req.query省去使用url和querystring
    const playerAction = query.action

    if (playerLastAction && playerAction == playerLastAction) {
      sameCount++
    } else {
      sameCount = 0
    }

    if (sameCount >= 3) {
      res.status(400)
      res.send('你作弊！')
    }
    playerLastAction = playerAction

    res.playerAction = playerAction // playerAction挂到res上，以便在拆分的next函数里获取到
    next() // 调用next函数，执行下面一个函数
  },

  function(req, res) { // next 函数，这是后一个next函数
    const gameResult = game(res.playerAction)
    console.log(gameResult)
    res.status(200)

    // 如果这里执行setTimeout，会导致前面的洋葱模型失效
    // 因为playerWon不是在中间件执行流程所属的那个事件循环里赋值的
    // setTimeout(()=> {
    if (gameResult == 0) {
      res.send('平局！')
    } else if (gameResult == 1) {
      res.send('你赢了！')
      res.playerWon = true
    } else {
      res.send('你输了!')
    }
    // }, 500)
  }

)

app.listen(3000)