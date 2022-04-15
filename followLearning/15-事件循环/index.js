const eventloop = {
  queue: [],
  loop() {
    // this的最终指向的是那个调用它的对象，这里也就表示指向eventloop
    // console.log(this)
    while(this.queue.length) {
      var callback = this.queue.shift()
      callback()
    }
    setTimeout(this.loop.bind(this), 50); // 因为再setTimeout内的函数是一个新的调用栈，执行时this会指向Timeout，为了使this指向eventloop就需要使用bind(this)，bind绑定的参数只生效一次。
  },

  add(callback) {
    this.queue.push(callback)
  }
}

eventloop.loop()

setTimeout(() => {
  eventloop.add(function() {
    console.log(1)
  })
}, 500)

setTimeout(() => {
  eventloop.add(function() {
    console.log(2)
  })
}, 800)