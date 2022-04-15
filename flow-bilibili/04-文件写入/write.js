let fs = require('fs')

fs.writeFile('test.txt', '腐乳\n', { flag: 'a', encoding: 'utf8' }, (err) => {
  if (err) {
    console.log('写入失败！')
  } else {
    console.log('写入成功！')
  }
})

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
async function writeList() {
  await writeFile('cb.html', '<h1>1、今天吃烧烤\n</h1>', 'a')
  await writeFile('cb.html', '<h1>2、今天吃烧烤\n</h1>', 'a')
  await writeFile('cb.html', '<h1>3、今天吃烧烤\n</h1>', 'a')
  await writeFile('cb.html', '<h1>4、今天吃烧烤\n</h1>', 'a')
}
writeList()