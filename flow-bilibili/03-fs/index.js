var fs = require('fs')
// 导入文件模块
// node，读写文件也有同步和异步的接口

// 同步
var fd = fs.openSync('hello.txt', 'r')
console.log(fd) // 3 返回的是文件在内存打开的标识

var buf = Buffer.alloc(40) // 在内存中开辟长度40的缓冲器
var content = fs.readSync(fd, buf, 0, 40)
console.log(content) // 返回读取的字节数





// 同步读取文件内容
// flag: 'r'读取文件， encoding: 'utf-8' 字符编码
var content2 = fs.readFileSync('hello.txt', { flag: 'r', encoding: 'utf-8' })

// 异步读取文件内容
fs.readFile('hello.txt', { encoding: 'utf8', flag: 'r' }, (err, data) => {
  if (!err) {
    console.log(data, '异步读取成功！')
  } else {
    console.log(err)
  }
})
console.log(content2) // 返回文件内容




// 封装readFile
function fsRead(path, encoding = null, flag = 'r') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding, flag }, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
async function readList() {
  var hello2 = await fsRead('hello.txt', 'utf8')
  var hello3 = await fsRead(hello2.split(' ')[hello2.split(' ').length - 1] + '.txt', 'utf8')
  var hello  = await fsRead(hello3.split(' ')[hello3.split(' ').length - 1] + '.txt', 'utf8')
  console.log(hello.split(' ')[hello.split(' ').length - 2])
}

readList()