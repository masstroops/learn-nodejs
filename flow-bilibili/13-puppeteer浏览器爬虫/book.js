const fs = require("fs");
let puppeteer = require("puppeteer")
const url = require('url')

// 注意自调用函数前加分号
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
  
  // 目标：获取https://sobooks.cc/，所有书名和电子书链接
  // 进入网站，获取整个网站列表页的页数
  try {
    let httpUrl = 'https://sobooks.cc/'
    // 获取整个网站列表页的页数方法
    async function getNum() {
      let page = await browser.newPage()
      // 监听中断谷歌请求
      abortGoogle(page)
      await page.goto(httpUrl)
      // 设置选择器，获取总页数
      let pageNum = await page.$eval('.pagination li:last-child span', (element) => {
        let text = element.innerHTML
        text = text.substring(1, text.length-2).trim()
        return text
      })

      page.close()
      return pageNum
    }
    
    // let pageNum = await getNum()
    // console.log(pageNum)

    // 获取具体分页内所有书籍的地址和信息方法
    async function pageList(num) {
      let pageListUrl = 'https://sobooks.cc/page/'+num
      let page = await browser.newPage()
      abortGoogle(page)
      // 访问列表页地址
      await page.goto(pageListUrl)
      let arrPage = await page.$$eval('.card .card-item .thumb-img>a', (elements) => {
        let arr = []
        elements.forEach((ele, i) => {
          let obj = {
            href: ele.getAttribute('href'),
            title: ele.getAttribute('title')
          }
          arr.push(obj)
        })
        // console.log(arr)
        return arr
      })
      page.close()
      // 通过获取的数组的地址和标题去请求书籍的详情页
      arrPage.forEach(async (pageObj, i) => {
        // await cbWait(4000 * i)
        eventloop.add(() => { return getPageInfo(pageObj) })
        // getPageInfo(pageObj)
      })
      eventloop.loop()
    }
    
    await pageList(1)

    // 获取具体书籍方法
    async function getPageInfo(pageObj) {
      let page = await browser.newPage()
      abortGoogle(page)
      await page.goto(pageObj.href)
      // 输入暗号查看网盘链接
      // 通过表单输入进行搜索
      let inputEle = await page.$('.e-secret form input[type="text"]')
      // 让光标进入到输入框
      await inputEle.focus()
      // 往输入框输入内容
      await page.keyboard.type('991968')
      // 点击按钮搜索
      let btnEle = await page.$('.e-secret form input[type="Submit"]')
      // await btnEle.click()
      // 因为点击表单提交会刷新页面，设定等待刷新10秒
      // await page.waitFor(10000)

      // 此方法在页面跳转到一个新地址或重新加载时解析，如果你的代码会间接引起页面跳转
      await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        btnEle.click(), // 点击该链接将间接导致导航(跳转)
      ])
      // 
      let eleA = await page.$('.article-content .e-secret b a:nth-child(3)')
      let aHref = await eleA.getProperty('href')
      // console.log(aHref)
      aHref = aHref._remoteObject.value
      aHref = aHref.split('?url=')[1]
      let content = `{"title": "${pageObj.title}", "href": "${aHref}"}---\n`
      fs.writeFile('book.txt', content, {flag: 'a'}, function() {
        console.log('写入成功：'+pageObj.title)
        page.close()
      })
      console.log(aHref)
      return aHref
    }
    // getPageInfo({href: 'https://sobooks.cc/books/17222.html', title: 'cb'})
  } catch (error) {
    console.log(error)
  }
})()

// 事件循环，调用方法实现按顺序执行队列里的请求任务，避免同时发送请求任务造成爬虫的网站崩溃
const eventloop = {
  queue: [], // 存储表情分类链接的队列
  flag: false, // 判断当前执行的请求任务是否结束
  async loop() {
    while(this.queue.length && !this.flag) {
      this.flag = true
      let callback = this.queue.shift()
      let res = await callback()
      console.log(res)
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

// 获取列表页的所有链接

// 进入每个电子书的详情页获取下载电子书的网盘地址

// 将获取的数据保存到book.txt