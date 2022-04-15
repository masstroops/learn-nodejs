let http = require('http')
// http为内置模块
// 创建server服务器对象
let server = http.createServer()
// 监听当前服务器对象的请求
server.on('request', function(req, res) {
  // 当服务器被请求时，会触发请求事件，并传入请求对象和响应对象
  // res.end('helloworld')
  // console.log(req.url, req.headers)
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  // 根据路径信息，显示不同的页面内容
  if (req.url == '/') {
    res.end('<h1>首页</h1><img src="https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png">')
  } else if (req.url == '/gnxw') {
    res.end('国内新闻')
  } else if (req.url == '/ylxw') {
    res.end('娱乐新闻')
  } else {
    res.end('404')
  }
})

// 服务器监听端口号
server.listen(80, function() {
  // 启动监听端口号成功时
  console.log('服务器启动成功!')
})