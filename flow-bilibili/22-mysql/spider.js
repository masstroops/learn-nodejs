let mysql = require('mysql')
let axios = require('axios')
let cheerio = require('cheerio')

let options = {
  host: 'localhost',
  user: 'root',
  password: 'cb123456',
  database: 'book',
}
let page = 1
let count = 1
let con = mysql.createConnection(options)
con.connect()

// 获取第N个页面所有书籍的链接
async function getPageUrl(num) {
  let httpUrl = 'https://sobooks.cc/page/' + num
  let res = await axios.get(httpUrl)
  // console.log(res.data)

  let $ = cheerio.load(res.data)
  $('#cardslist .card-item .thumb-img>a').each((i, ele) => {
    let href = $(ele).attr('href')
    // console.log(href)

    // 根据地址访问书籍详细页面

  })
}

async function getBookInfo(href) {
  let res = await axios.get(href)
  let $ = cheerio.load(res.data)
  // 书籍图片链接
  let bookimg = $('.article-content .bookpic img').attr('src')
  // 书籍名称
  let bookname = $('.article-content .bookinfo li:nth-child(1)').text().substring(3, this.length)
  // console.log(imgUrl, bookname)
  // 书籍作者
  let author = $('.article-content .bookinfo li:nth-child(2)').text().substring(3, this.length)
  // 标签
  let tag = $('.article-content .bookinfo li:nth-child(4)').text().substring(3, this.length)
  // 发布时间
  let pubtime = $('.article-content .bookinfo li:nth-child(5)').text().substring(3, this.length)
  // 评分
  let score = $('.article-content .bookinfo li:nth-child(6) b').attr('class')
  score = score[score.length-1]
  // 分类
  let category = $('#mute-category > a').text().trim()
  // 内容简介
  let brief = $('.article-content').html()
  // 书籍链接
  let bookurl = href
  // 下载地址
  let download = $('body > section > div.content-wrap > div > article > div.e-secret > b > a:nth-child(1)').attr('href')
  let arr = [bookimg, bookname, author, tag, pubtime, score, category, brief, bookurl, download]
  // console.log(arr)

  // 插入数据库
  let strSql = "insert into book (bookimg, bookname, author, tag, pubtime, score, category, brief, bookurl, download) values (?,?,?,?,?,?,?,?,?,?)"
  con.query(strSql, arr, (err, results) => {
    console.log(err, results)
  })
}

// getPageUrl(page)
getBookInfo('https://sobooks.cc/books/17552.html')