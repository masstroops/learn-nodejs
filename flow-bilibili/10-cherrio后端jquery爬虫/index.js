// 操作html，跟jquery一样
const cheerio = require('cheerio')
const axios = require('axios')
const url = require('url')
const path = require('path')
const fs = require('fs')

let fetch = axios.create({
  headers: {
    // ':authority': 'wx4.sinaimg.cn',
    // ':method': 'GET',
    // ':path': '/bmiddle/006qir4ogy1gjx00cps1pj30fa0dxwg3.jpg',
    // ':scheme': 'https',
    'accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    'sec-fetch-dest': 'image',
    'sec-fetch-mode': 'no-cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36'
  }
})

let httpUrl = 'https://www.fabiaoqing.com/bqb/lists/type/hot/page/1.html'

getAllBqb()

// 获取页面总数
async function getNum() {
  let res = await fetch.get(httpUrl)
  let $ = cheerio.load(res.data)
  let btnLength = $('.pagination .item').length
  let pageNum = $('.pagination .item').eq(btnLength - 3).text()
  return Number(pageNum)
}

// 翻页请求获取表情包
async function getAllBqb() {
  let pageNum = await getNum()
  console.log(pageNum)
  for(let i = 1; i <= 5; i++) {
    // 循环固定增加下一页等待时间，避免同时发送分页请求
    await cbWait(5000 * i)
    getBQB(i)
  }
}

function getBQB(pageNum) {
  let httpUrl = `https://www.fabiaoqing.com/bqb/lists/type/hot/page/${pageNum}.html`
  axios.get(httpUrl).then(res => {
    // console.log(res.data)
    let $ = cheerio.load(res.data)
    // 获取当前页面所有表情页面链接
    $('#bqblist .bqba').each(async (i, element) => {
      // console.log(element)
      // console.log($(element).attr('href'))
      let pageUrl = $(element).attr('href')
      let pageTitle = $(element).attr('title')
      // let b = await parsePage(url.resolve('https://www.fabiaoqing.com', pageUrl), pageTitle)
      // console.log(b)
      pageTitle = pageTitle.replace(/\//g, ',')
      pageTitle = pageTitle.replace(/|/g, ',')
      fs.mkdir('./img/'+pageTitle, { recursive: true } , (err => {
        if (err) {
          console.log('文件夹创建失败：' + pageTitle)
        }
      }))
      eventloop.add({ link: url.resolve('https://www.fabiaoqing.com', pageUrl), name: pageTitle })
    })
    eventloop.loop()
  })
}


function parsePage(url, pageTitle) {
  return new Promise(async (resolve) => {
    try {
      let res = await fetch.get(url)
      if (res.status == 200) {
        // console.log(res.data)
        let $ = cheerio.load(res.data), arr = []
        $('.pic-content>.pic_swiper>.swiper-wrapper>.swiper-slide>a>.bqppdiv1>img').each((i, element) => {
          let imgUrl = $(element).attr('data-original')
          // console.log(imgUrl)
          arr.push(imgUrl)
        })
        resolve(arr)
      } else {
        console.log(res)
        resolve(res)
      }
    } catch(err) {
      console.log(err.message, pageTitle)
      resolve(err.message)
    }
  })
}

// 事件循环，调用方法实现按顺序执行队列里的请求任务，避免同时发送请求任务造成爬虫的网站崩溃
const eventloop = {
  queue: [], // 存储表情分类链接的队列
  flag: false, // 判断当前执行的请求任务是否结束
  async loop() {
    while(this.queue.length && !this.flag) {
      this.flag = true
      let obj = this.queue.shift()
      let res = await parsePage(obj.link, obj.name)
      // console.log(res)
      if (!(res instanceof Array)) {
        console.log('连接超时！')
        this.flag = false
        return
      }
      res.forEach((img, i) => {
        let extName = path.extname(img)
        // 图片写入的路径和名字
        let urlpath = `./img/${obj.name}/${obj.name}-${i}${extName}`

        // 判断目录内是否已经下载过此图片
        fs.readdir(`./img/${obj.name}/`, (err, files) => { // files 是目录中文件的名称的数组
          if (err) {
            console.log(`目录打开失败！：${obj.name}`)
          } else {
            if (files.includes(`${obj.name}-${i}${extName}`)) {
              console.log('本地已有此图！' + urlpath)
            } else {
              // 创建写入图片流
              let ws = fs.createWriteStream(urlpath)
              fetch.get(img, { responseType: 'stream' }).then(res2 => {
                res2.data.pipe(ws)
                console.log('图片下载完成：'+urlpath)
                // 完成写入流
                res2.data.on('close', () => {
                  ws.close()
                })
              })
            }
          }
        })
        
      })
      // 请求失败res为undefined
      if (res) this.flag = false
    }
    if (this.queue.length === 0) {
      // console.log('当前任务队列为空')
    }
    setTimeout(this.loop.bind(this), 66) // 每66毫秒调用方法检查队列
  },
  add(obj) {
    this.queue.push(obj)
  }
}

// 延迟函数
function cbWait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功执行延迟函数，延迟：' + time)
    }, time)
  })
}