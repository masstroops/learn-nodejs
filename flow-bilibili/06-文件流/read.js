let fs = require('fs')

// 创建读取流
let rs = fs.createReadStream('hello.txt', { encoding: 'utf8', flags: 'r' })
let rw = fs.createWriteStream('copyHello.txt')
// console.log(rs)
// 打开事件
rs.on('open', () => {
  console.log('读取文件打开')
})
// 
rs.on('close', () => {
  console.log('读取流关闭')
  rw.end()
})
// 监听每一次数据流入
rs.on('data', (chunk) => {
  console.log('单批数据流入：', chunk.length)
  console.log(chunk)
  rw.write(chunk, () => {
    console.log('单批数据流入')
  })
})