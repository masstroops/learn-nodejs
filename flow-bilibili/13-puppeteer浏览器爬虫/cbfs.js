let fs = require('fs')

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

function fsWrite(path, content, flag = 'w') {
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

module.exports = {
  fsRead,
  fsWrite
}