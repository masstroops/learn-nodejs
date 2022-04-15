const querystring = require('querystring')
const http = require('http')
const url = require('url') // node.js url模块，可以操作输入的url
const fs = require('fs')

const game = require('./game')

var playerWon = 0,
    playerLastAction = null,
    sameCount = 0


http.createServer(function(req, res) {
  const parsedUrl = url.parse(req.url)

  if (parsedUrl.pathname == 'favicon.ico') {
    res.writeHead(200)
    res.end()
    return
  }

  if (parsedUrl.pathname == '/game') {
    const query = querystring.parse(parsedUrl.query)
    const playerAction = query.action

    const gameResult = game(playerAction)

    if (playerWon >= 3) {
      res.writeHead(500)
      res.end('套你猴子的，我再也不和你玩了!')
      // return
    }

    if (playerLastAction && playerAction == playerLastAction) {
      sameCount++
    } else {
      sameCount = 0
    }

    if (sameCount >= 3) {
      res.writeHead(400)
      res.end('你作弊！')
    }
    playerLastAction = playerAction

    console.log(gameResult)
    res.writeHead(200)
    if (gameResult == 0) {
      res.end('平局！')
    } else if (gameResult == 1) {
      res.end('你赢了！')
      playerWon++
    } else {
      res.end('你输了！')
    }
  }

  if (parsedUrl.pathname == '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  }
}).listen(3000)