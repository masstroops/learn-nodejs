const fs = require('fs')
const game = require('./game')
const koa = require('koa') // koa 是一个http服务框架，对比express更轻量，不绑定任何中间件，并且解决了express异步情况下洋葱模型失效问题
const mount = require('koa-mount') // koa-mount koa本身没有路由功能，引用路由中间件

var playerWon = 0,
    playerLastAction = null,
    sameCount = 0

const app = new koa()

app.use(
  mount('/favicon.ico', function(ctx) {
    // koa比express做了更极致的response处理函数
    // 因为koa使用异步函数作为中间件的实现方式
    // 所以koa可以在等待所有中间件执行完毕之后再统一处理返回值，因此可以用赋值运算符
    ctx.status = 200
  })
)

const gameKoa = new koa() // 创建koa实例用来挂中间件

app.use(
  mount(
    '/game',
    gameKoa // mount 只能挂一个普通函数，要把拆分的模块一起挂需要再创建一个新的koa实例
    )
)

gameKoa.use(
  async function(ctx, next) {
    if (playerWon >= 3) {
      ctx.status = 500
      ctx.body = '套你猴子的，我再也不和你玩了!'
    }

    // 使用await 关键字等待后续中间件执行完成
    await next();

    // 就能获得一个准确的洋葱模型效果
    if (ctx.playerWon) {
      playerWinCount++;
    }
  }
)

gameKoa.use(
  async function(ctx, next) {
    const query = ctx.query
    const playerAction = query.action

    if (playerLastAction && playerAction == playerLastAction) {
      sameCount++
    } else {
      sameCount = 0
    }

    if (sameCount >= 3) {
      ctx.status = 400
      ctx.body = '你作弊！'
    }
    playerLastAction = playerAction

    ctx.playerAction = playerAction
    await next() // 调用next函数，执行下面一个函数
  }
)

gameKoa.use(
  async function(ctx) {
    const gameResult = game(ctx.playerAction)
    console.log(gameResult)

    // 对于一定需要在请求主流程里完成的操作，一定要使用await进行等待
    // 否则koa就会在当前事件循环就把http response返回出去了
    await new Promise((resolve) => {
      setTimeout(()=> {
        ctx.status = 200
        if (gameResult == 0) {
          ctx.body = '平局！'
        } else if (gameResult == 1) {
          ctx.body = '你赢了！'
          ctx.playerWon = true
        } else {
          ctx.body = '你输了!'
        }
        resolve()
      }, 500)
    })
  }
)

app.use(
  mount('/', function(ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
  })
)

app.listen(3000)