const axios = require('axios')
const fs = require('fs')

// 目标获取音乐
// 1、获取音乐相关信息，通过音乐相关信息获取mp3地址
// 2、如何获取音乐列表
// 3、通过音乐分类也，获取音乐列表

// 分页请求音乐信息
async function getPage(num) {
  let httpUrl = `http://1.staging-web.app-echo.com/api/recommend/sound-day?page=${num}`
  let res = await axios.get(httpUrl)
  // console.log(res.data.list)
  // 读取歌曲目录文件
  let mulu = await fsRead('./mp3/mulu.txt', 'utf8')
  res.data.list.forEach(async(item, i) => {
    let title = item.sound.name
    let id = item.id
    let mp3Url = item.sound.source
    // console.log(title, mp3Url, id)
    if (mulu) {
      // 判断歌曲是否录入过
      if (mulu.indexOf(id) == -1) await writeFile('./mp3/mulu.txt', `${id}.mp3：${title}\n`, 'a')
    } else {
      await writeFile('./mp3/mulu.txt', `${id}.mp3：${title}\n`, 'a')
    }
    download(mp3Url, title, id)
  })
}

// 下载音乐
async function download(mp3Url, title, id) {
  // 判断目录内是否已经下载过此图片
  fs.readdir(`./mp3`, async (err, files) => { // files 是目录中文件的名称的数组
    if (err) {
      console.log('目录打开失败')
    } else {
      if (files.includes(id+'.mp3')) {
        console.log(`本地已有歌曲：${id}.mp3，title`)
      } else {
        try {
          let res = await axios.get(mp3Url, {responseType: 'stream'})
          let ws = fs.createWriteStream(`./mp3/${id}.mp3`)
          res.data.pipe(ws)
          res.data.on('close', () => {
            ws.close()
          })
        } catch(err) {
          console.log(`${mp3Url}，${title}，404`)
        }
      }
    }
  })
  
}

getPage(1)

// 封装写入文件方法
function writeFile(path, content, flag = 'w') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, { flag: flag, encoding: 'utf8' }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 封装读取文件方法
function fsRead(path, encoding = null, flag = 'r') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding, flag }, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}