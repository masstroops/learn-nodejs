const http = require('http') // node.js内置http模块
const fs = require('fs') // 文件模块

http.createServer(function(req, res) { // 创建http服务，网页上每次请求和资源http服务都会在这个方法处理和响应
  if (req.url == '/favicon.ico') { // 判断当浏览器请求ico图标时
    console.log(req.url)
    res.writeHead(200) // 返回200
    res.end() // res.end('hello')
    return
  }
  debugger
  console.log(req.url)
  res.writeHead(200)

  fs.createReadStream(__dirname + '/index.html') // 创建文件模块读取当前目录下的html文件
    .pipe(res)
  fs.createReadStream(__dirname + '/css/bootstrap.css') // 创建文件模块读取当前目录下的html文件
}).listen(3000) // 监听本机3000端口