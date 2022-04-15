var playerAction = process.argv[2]

const game = require('./game.js')
// game(playerAction)

let count = 0
process.stdin.on('data', e => { // 获取进程输入
  const playerAction = e.toString().trim()
  // console.log(playerAction)

  const result = game(playerAction)
  console.log(result)

  if (result == 1) { // 判断电脑输3次的情况
    count++
  }
  if (count == 3) {
    console.log('你太帅了，我不玩了')
    process.exit()
  }
})