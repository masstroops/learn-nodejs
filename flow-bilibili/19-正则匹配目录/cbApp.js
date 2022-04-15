let http = require('http')
let path = require('path')
let url = require('url')
let fs = require('fs')
class cbApp {
  constructor() {
    this.server = http.createServer()
    // 存放监听的路由
    this.reqEvent = {}
    // 静态目录
    this.staticDir = '/static'
    this.server.on('request', (req, res) => {
      let resState = false
      // 解析路径
      let pathObj = path.parse(req.url)
      req.pathObj = pathObj
      res.render = render
      console.log(pathObj)

      // 循环匹配正则路径
      for(let key in this.reqEvent) {
        let regStr = key
        let reg = new RegExp(regStr, 'igs') // 正则对象, igs表示忽略大小写
        if (reg.test(req.url)) {
          this.reqEvent[key](req, res)
          resState = true
          break
        }
      }
      if (!resState) {
        try {
          if (pathObj.dir == this.staticDir) { // 判断访问静态资源 
            res.setHeader('content-type', this.getContentType(pathObj.ext))
            let rs = fs.createReadStream('./static/'+pathObj.base)
            rs.pipe(res)
          } else {
            res.setHeader('content-type', 'text/html;charset=utf-8')
            res.end('<h1>404!页面找不到</h1>')
          }
        } catch (err) {
          console.log(err)
          res.end(`<h1>500!${err}</h1>`)
        }
      }
    })
  }

  on(url, fn) {
    this.reqEvent[url] = fn
  }

  run(port, callback) {
    this.server.listen(port, callback)
  }

  getContentType(extName) {
    switch(extName) {
      case '.jpg':
        return 'image/jpeg'
      case '.png':
        return 'image/png'
      case '.html':
        return 'text/html;charset=utf-8'
      case '.js':
        return 'text/javascript;charset=utf-8'
      case '.json':
        return 'text/json;charset=utf-8'
      case '.gif':
        return 'image/gif'
      case '.css':
        return 'text/css'
    }
  }
}

module.exports = cbApp

// 渲染html
function render(options, path) {
  fs.readFile(path, {encoding: 'utf-8', flag: 'r'}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      try {
        data = replaceArr(data, options)
        data = replaceVar(data, options)
      } catch(err) {
        console.log(err)
      }

      // this指向res
      this.end(data)
    }
  })
}

// 匹配普通的变量并且替换
function replaceVar(data, options) {
  let reg = /\{\{(.*?)\}\}/igs
  let result
  while (result = reg.exec(data)) {
    let strKey = result[1].trim()
    // let strValue = options[strKey] //item，item.name
    let strValue = eval('options.'+strKey) // eval()方法可以将字符串以js方式执行
    data = data.replace(result[0], strValue)
  }

  return data
}

// 匹配循环的变量，并且循环替换
function replaceArr(data, options) {
  let reg = /\{%for \{(.*?)\} %\}(.*?)\{%endfor%\}/igs
  while (result = reg.exec(data)) {
    let strKey = result[1].trim()
    // 通过Key获取数组内容
    let strValueArr = options[strKey]
    let listStr = ''
    strValueArr.forEach((item, i) => {
      // 替换每一项内容里的变量
      listStr += replaceVar(result[2], {item, index: i})
    })
    data = data.replace(result[0], listStr)
  }
  return data
}