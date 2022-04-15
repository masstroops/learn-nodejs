const fs = require("fs");
const puppeteer = require("puppeteer")
const url = require('url')
const axios = require('axios')
const { fsRead, fsWrite } = require('./cbfs')

;(async function() {
  let options = {
    headless: false,
    slowMo: 255,
    timeout: 60000,
    defaultViewport: {
      width: 1366,
      height: 768
    }
  }
  let browser = await puppeteer.launch(options)

  async function parseTxt() {
    // 读取文本
    let textContent = await fsRead('./book.txt')
    // 正则匹配json字符串对象
    let reg = /(\{.*?\})---/igs
    let tempRes = null, bookArr = []
    while (tempRes = reg.exec(textContent)) {
      // 获取匹配结果
      let jsonStr = tempRes[1]
      // 将字符串解析成对象
      let jsonObj = JSON.parse(jsonStr)
      // 获取链接
      // let bookHref = jsonObj.href
      bookArr.push(jsonObj)
    }
    return bookArr
  }

  let bookArr = await parseTxt()
  let index = 0
  console.log(bookArr)

  async function downloadBook() {
    // 判断是否全部下载完成
    if (index == bookArr.length) return '完成'
    // 根据索引值下载
    let bookObj = bookArr[index]
    index++
    // 打开新页面下载
    let page = await browser.newPage()
    await page.goto(bookObj.href)
    // 获取a链接，因为a链接是请求渲染出来的，需要等待渲染完成再获取
    // 城通网盘
    await page.waitForSelector('#table_files tbody .odd td:nth-child(2) a')
    let elementA = await page.$('#table_files tbody .odd td:nth-child(2) a')
    let elementAHref = await elementA.getProperty('href')
    elementAHref = elementAHref._remoteObject.value
    
    await bookLinkPage(elementAHref, bookObj.title)

    // 兰凑网盘
    // await page.waitForSelector('#infos #ready #name a')
    // let elementA = await page.$('#infos #ready #name a')
    // elementA.click()
    // 点击的方式跳转，通过获取所有打开的页面，实现对刚刚点击打开页面的控制
    // let pages = await browser.pages()
    // console.log(pages)
  }

  downloadBook()

  async function bookLinkPage(linkUrl, title) {
    let page = await browser.newPage()
    await page.setRequestInterception(true)
    // 监听请求事件，并对请求进行拦截
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      // 
      if (urlObj.hostname.indexOf('ch1-cucc-aa.tv002.com') > -1) {
        console.log('截获地址'+urlObj.href)
        interceptedRequest.abort()
        let ws = fs.createWriteStream('./book/'+title+'.zip')
        axios.get(urlObj.href, { responseType: 'stream' }).then(res => {
          res.data.pipe(ws)
          ws.on('close', () => {
            console.log('下载已完成：'+title)
            // 递归下载
            downloadBook()
            page.close()
          })
        })
      } else {
        interceptedRequest.continue()
      }
    })
    await page.goto(linkUrl)
    await page.waitForSelector('.btn.btn-outline-secondary.fs--1')
    let btn = await page.$('.btn.btn-outline-secondary.fs--1')
    btn.click()

    

    // 判断请求完成
    // page.on('requestfinished', (req) => {
    //   console.log('下载已完成：'+req.url())
    // })

  }
})()

// 拦截中断谷歌请求方法
async function abortGoogle(page) {
  // 截取谷歌请求
  await page.setRequestInterception(true)
  // 监听请求事件，并对请求进行拦截
  page.on('request', interceptedRequest => {
    let urlObj = url.parse(interceptedRequest.url())
    // 判断域名为谷歌则中断请求
    if (urlObj.hostname.indexOf('google') > -1) {
      interceptedRequest.abort()
    } else {
      interceptedRequest.continue()
    }
  })
}

// 延迟函数
function cbWait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功执行延迟函数，延迟：' + time)
    }, time)
  })
}