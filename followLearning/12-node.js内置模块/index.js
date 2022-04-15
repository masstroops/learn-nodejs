const geektime = require('./lib')

// 观察者模式， 事件监听 
geektime.addListener('newlesson', (res) => {
  if (res.price < 80) {
    console.log('buy!', res)
  }
})