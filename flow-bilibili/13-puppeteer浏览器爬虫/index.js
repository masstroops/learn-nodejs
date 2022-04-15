let puppeteer = require('puppeteer')

async function test() {
  // puppeteer.launch()实例化开启浏览器，可以传入一个options对象，可以配置为无界面或有界面浏览器
  // 无界面性能高，有界面用于开发调试
  let options = {
    defaultViewport: {
      width: 1366,
      height: 768,
    },
    // 设置为有界面
    headless: false
  }
  let browser = await puppeteer.launch(options)

  // 打开页面
  let page = await browser.newPage()
  // 访问页面
  await page.goto('https://www.dytt8.net/index.htm')
  // 页面截图
  await page.screenshot({ path: 'screenshot.png' })
  // 获取页面内容，返回导航链接和名称
  // $$eval函数使得，我们的回调函数可以运行在浏览器，结果会输出在浏览器控制台
  let eles = await page.$$eval('#menu li a', elements => {
    // console.log(elements)
    let eles = []
    elements.forEach((item, i) => {
      if (item.getAttribute('href') == '#') return

      // 输出在打开的浏览器的控制台里
      console.log(item.innerText)
      
      let eleObj = {
        href: item.getAttribute('href'),
        text: item.innerText
      }
      eles.push(eleObj)
      // console.log(eleObj)
    })
    return eles
  })
  // console.log(eles)
  // 打开国内电影
  let gnPage = await browser.newPage()
  await gnPage.goto(eles[2].href)

  // 监听浏览器里的console事件，最后输出在node.js命令行
  // page.on('console', (eventMsg) => {
  //   console.log(eventMsg.text())
  // })
}

test()