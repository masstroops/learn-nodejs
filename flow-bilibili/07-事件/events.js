let events = require('events')
let fs = require('fs')

let ee = new events.EventEmitter()

ee.on('helloSuccess', function(data) {
  console.log('1、吃夜宵', data)
})
ee.on('helloSuccess', function() {
  console.log('2、唱歌')
})
ee.on('helloSuccess', function() {
  console.log('3、啪啪')
})

fs.readFile('hello.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log('读取错误')
  } else {
    console.log(data)
    ee.emit('helloSuccess', data)
  }
})

function cbRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        console.log('读取错误')
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

cbRead('hello.txt').then(data => {
  ee.emit('helloSuccess', data)
})