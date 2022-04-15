let fs = require('fs')

// 创建读取流
let rs = fs.createReadStream('hello.txt', { encoding: 'utf8', flags: 'r' })
let rw = fs.createWriteStream('copyHello2.txt')
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

// 把读取到的流放入输入流，更简单的方法实现拷贝
rs.pipe(rw)