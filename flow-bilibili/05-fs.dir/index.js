let fs = require('fs')
let { fsRead, fsWrite } = require('./cbfs')

fs.readdir('../04-文件写入', (err, files) => {
  if (err) {}
  else {
    console.log(files) // files 是目录中文件的名称的数组

    files.forEach(async (filename, i) => {
      let content = await fsRead('../04-文件写入/' + filename)
      await fsWrite('all.txt', content, 'a')
    })
  }
})