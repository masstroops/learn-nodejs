class cbPromise {
  constructor(fn) {
    // 将成功的事件函数集成在successList数组中
    this.successList = []
    // 将所有失败的函数集成在failList中
    this.failList = []
    // pending, fullfilled, rejected
    this.state = 'pending'
    // 传入的函数对象，(异步操作的函数内容)
    fn(this.resolveFn.bind(this), this.rejectFn.bind(this))
  }

  then(successFn, failFn) {
    if (typeof successFn == 'function') {
      this.successList.push(successFn)
    }
    if (typeof failFn == 'function') {
      this.failList.push(failFn)
    }
  }

  catch(failFn) {
    if (typeof failFn == 'function') {
      this.failList.push(failFn)
    }
  }

  resolveFn(res) {
    this.state = 'fullfilled'
    this.successList.forEach(function(item, index) {
      // 将成功的事件循环调用
      item(res)
    })
  }

  rejectFn(res) {
    this.state = 'rejected'
    // 注册到的失败所有事件进行调用
    this.failList.forEach(function(item, index) {
      item(res)
    })
    throw Error(res)
  }
}

// 方法必须有两个成功和失败的参数，用来接收promise对象成功和失败方法。
let fn = function(resolve, reject) {
  setTimeout(function() {
    let random = Math.random()
    if (random > 0.5) {
      resolve(random)
    } else {
      reject(random)
    }
  }, 2333)
}
let p1 = new cbPromise(fn)

p1.then((res) => {
  console.log('成功：',res)
})
p1.catch(err => {
  console.log('失败：',err)
})