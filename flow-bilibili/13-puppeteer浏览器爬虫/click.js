let puppeteer = require('puppeteer')

async function test() {
  let options = {
    defaultViewport: {
      width: 1366,
      height: 768,
    },
    // 设置为有界面
    headless: false,
    // 设置放慢每个操作毫秒数
    slowMo: 233
  }
  let browser = await puppeteer.launch(options)

  // 打开页面
  let page = await browser.newPage()
  // 访问页面
  await page.goto('https://www.dytt8.net/index.htm')
  
  // 获取页面对象，点击页面跳转
  // let elementHandles = await page.$$('#menu li a')
  // elementHandles[2].click()

  // 通过表单输入进行搜索
  let inputEle = await page.$('.searchl .formhue')
  // 让光标进入到输入框
  await inputEle.focus()
  // 往输入框输入内容
  await page.keyboard.type('姜子牙')

  // 等待指定的选择器匹配的元素出现在页面中
  await page.waitForSelector('.searchr input[name="Submit"]').then(() => console.log('按钮渲染'))

  // 获取表单，监听点击事件取消冒泡，避免点击广告
  await page.$eval('.bd3rl > .search', (element) => {
    console.log(element)
    element.addEventListener('click', function(event) {
      event.stopPropagation()
      event.cancelBubble = true
    })
  })
  // 点击按钮搜索
  let btnEle = await page.$('.searchr input[name="Submit"]')
  await btnEle.click()

  
}

test()