let { fsWrite } = require('./cbfs')
// 导入readline模块
let readline = require('readline')

// 实例化接口对象
let r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 提问事件
// r1.question('今晚吃啥？', (answer) => {
//   console.log('回答：', answer)
//   r1.close()
// })

r1.on('close', () => {
  process.exit(0)
})

function cbQuestion(title) {
  return new Promise((resolve, reject) => {
    r1.question(title, (answer) => {
      resolve(answer)
    })    
  })
}

async function createPackage() {
  let name = await cbQuestion('您的程序叫什么？')
  let description = await cbQuestion('您的程序描述？')
  let main = await cbQuestion('您的程序主程序入口文件？')
  let author = await cbQuestion('您的程序作者是谁？')

  let content = `{
    "name": "${name}",
    "version": "1.0.0",
    "description": "${description}",
    "main": "${main}",
    "scripts": {
      "test": "echo Error: no test specified && exit 1"
    },
    "author": "${author}",
    "license": "ISC"
  }
  `
  await fsWrite('package.json', content, 'w')
  // 关闭输入进程
  r1.close()
}

createPackage()