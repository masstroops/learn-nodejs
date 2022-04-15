let fs = require('fs')

// 1、创建写入流 -- fs.createReadStream(文件路径，【可选配置操作】)
let ws = fs.createWriteStream('hello.txt', { flags: 'r+', encoding: 'utf-8' })
// console.log(ws)
// 监听文件打开事件
ws.on('open', () => {
  console.log('文件打开')
})
ws.on('ready', () => {
  console.log('文件写入准备')
})
ws.on('close', () => {
  console.log('文件写入完成，关闭')
})

// 文件流式写入
ws.write('hello world1!', (err) => {
  if (err) console.log(err)
  else console.log('内容1流入完成')
})
ws.write('hello world2!', (err) => {
  if (err) console.log(err)
  else console.log('内容2流入完成')
})
ws.write('hello world3!', (err) => {
  if (err) console.log(err)
  else console.log('内容3流入完成')
})
ws.write('hello world4!', (err) => {
  if (err) console.log(err)
  else console.log('内容4流入完成')
})

// 文件写入完成
ws.end(() => {
  console.log('文件写入关闭')
})