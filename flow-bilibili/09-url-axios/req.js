let axios = require('axios')
let url = require('url')

const request = axios.create({
  headers: {
    "upgrade-insecure-requests": 1,
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3775.400 QQBrowser/10.6.4209.400"
  }
})

let httpUrl = 'https://vip.1905.com/list/p1o6.shtml'

// 获取起始页的所有分类地址
function getClassUrl() {
  request.get(httpUrl).then((res) => {
    if (res.status == 200) {
      // console.log(res.data)
      // 解析html
      // 正则匹配
      let reg = /<div class="fl clr6 label">按类型<\/div><div class="f_song con clearfix_smile">(.*?)<\/div><\/li>/igs
      let result = reg.exec(res.data)[1]
      // console.log(result)

      let reg1 = /<a .*?href="(.*?)".*?>(.*?)<\/a>/igs
      let arr = [], result1
      // 循环正则匹配提取
      while(result1 = reg1.exec(result)) {
        if (result1[2] !== '全部') {
          let obj = {
            className: result1[2],
            url: result1[1]
          }
          arr.push(obj)
          getMovies(url.resolve('https://vip.1905.com', result1[1]), result1[2])
          
          fsDir('./movies/' + type)
        }
      }
      // console.log(arr)
    }
  })
}

// 通过分类，获取页面中的电影链接
function getMovies(url, type) {
  request.get(url).then(res => {
    if (res.status == 200) {
      let reg = /<li class="borderBox"><a class="img" href="(.*?)" target="_blank".*?><img/igs
      let result, arr = []
      while (result = reg.exec(res.data)) {
        parsePage('https:'+result[1], type)
        arr.push(result[1])
        // 翻页爬取数据，未实现
      }
      // arr保存了各种类型的电影链接
      // console.log(arr)
      console.log(bigObj)
    }
  })
}

// 通过电影链接，获取电影详情介绍
function parsePage(url, type) {
  request.get(url).then(res => {
    if (res.status == 200) {
      // let reg = /<div class="sb-mod-movie hidden"><h1 class="movie-title">刺夜</h1><dl class="movie-info"><dd>评分：<span class="movie-score score-7"></span></dd><dd>年份：2013</dd><dd>导演：任鹏远/彭际航</dd><dd>主演：蒲巴甲/何杜娟/王子子</dd></dl><h4>剧情介绍：</h4><p class="movie-description">影片大背景为1907年清末时期故事。讲述的是清朝末年，许骥远通过买官进入清政府内部，并成功当上巡警学堂会办，并利用自己的职位进行暗杀、刺杀及带领学生军暴动革命的故事……/
      let reg = /<div class="sb-mod-movie hidden"><h1 class="movie-title">(.*?)<\/h1><dl class="movie-info"><dd>评分：.*?<dd>年份：(.*?)<\/dd><dd>导演：(.*?)<\/dd><dd>主演：(.*?)<\/dd><\/dl><h4>剧情介绍：<\/h4><p class="movie-description">(.*?)<a class="clr0"/
      let result = reg.exec(res.data)
      // console.log(result[1], result[2], result[3], result[4], result[5])
      let obj = {
        name: result[1],
        year: result[2],
        director: result[3],
        starring: result[4],
        details: result[5],
        url: url,
      }
      bigObj[type].push(obj)
      console.log(obj)
    }
  })
}

const bigObj = {}
getClassUrl()
// parsePage('https://vip.1905.com/play/679347.shtml')

// 封装创建目录方法
function fsDir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err, res) => {
      if (err) {
        reject('创建目录失败')
      } else {
        resolve()
      }
    })
  })
}