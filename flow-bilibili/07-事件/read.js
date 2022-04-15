let fs = require('fs')

// node事件底层实现代码思路
let cbEvent = {
  event: {
    // fileSuccess: [fn, fn]
  },
  on: function(eventName, eventFn) {
    if (this.event[eventName]) {
      this.event[eventName].push(eventFn)
    } else {
      this.event[eventName] = [eventFn]
    }
  },
  emit: function(evnetName, data) {
    this.event[evnetName].forEach(itemFn => {
      itemFn(data)
    })
  }
}

fs.readFile('hello.txt', { flag: 'r', encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log('读取出错')
  } else {
    console.log(data)
    cbEvent.emit('fileSuccess', data)
    // 1、数据库查看所有的用户详细信息
    // 2、统计年龄比例
  }
})

cbEvent.on('fileSuccess', (data) => {
  console.log('1、数据库查看所有的用户详细信息')
})
cbEvent.on('fileSuccess', (data) => {
  console.log('2、统计年龄比例')
})

