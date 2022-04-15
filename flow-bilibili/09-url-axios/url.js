let url = require('url')

let httpUrl = 'https://www.bilibili.com/video/BV1i7411G7kW?p=9'
// 解析url
console.log(url.parse(httpUrl))

let targetUrl = 'https://www.bilibili.com'
let tURL = './cb/node/abc.html'
// 合成url
let newUrl = url.resolve(targetUrl, tURL)
console.log(newUrl)