let path = require('path')
let fs = require('fs')

let strPath = 'http://nodejs.cn/api/os.html'
// 获取路径信息的扩展名
let info = path.extname(strPath)
console.log(info) // .html

let arr = ['/demo', 'node', '08-path']
let info1 = path.resolve(...arr)
console.log(info1) // E:\demo\node\08-path

// 获取当前执行目录所在的完整路径
console.log(__dirname)

// 拼接返回目录
let info2 = path.join(__dirname, '/demo', 'node')
console.log(info2) // E:\桌面文件\Deomtest\learn-node.js\flow-bilibili\08-path-os\demo\node

// 
let str = 'http://www.demo.com/xinwen/guonei.html'
// 解析出请求目录
let arrParse = str.split('/')
console.log(arrParse)
arr = arrParse.slice(arrParse.length - 2, arrParse.length)
console.log(arr)

let filePath = path.join(__dirname, ...arr)
console.log(filePath)
fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})