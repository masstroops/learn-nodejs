var promise = new Promise(function(resolve, reject) { // new 的时候就执行
  setTimeout(() => {
    resolve(3)
    // reject(new Error(3))
  }, 500)
})

promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

console.log(promise)

setTimeout(() => {
  console.log(promise)
}, 800)