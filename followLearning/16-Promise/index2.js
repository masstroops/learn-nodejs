var promise = interview()
var primise2 = promise.then(res => { // .then最后返回给promise2的是一个新的Promise状态
  // console.log(res)
  return 'accept' // 如果回掉最后是return，返回Promise resolve状态
  // throw new Error('refuse') // 如果回掉最后是throw，返回Promise reject状态
}).catch(err => { // .catch最后返回给promise2的是一个新的Promise状态
  // console.log(err)
  return 'accept'
  // throw new Error('refuse')
})

// Promise链式调用
interview(1).then(() => {
  return interview(2)
}).then(() => {
  return interview(3)
}).then(() => {
  console.log('smail')
}).catch((err) => {
  console.log('cry at ' + err.round)
})

// Promise同时调用，全部reject才进then回掉
Promise.all([
  interview('yiguanyun').catch(() => {console.log('忽略翼管云的')}),
  interview('tencent'),
  interview('alibaba')
]).then(() => {
  console.log('Yeal !')
}).catch(err => {
  console.log('cry at ' + err.round)
})

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve('success') 
      } else {
        var error = new Error('fail')
        error.round = round
        reject(error) 
      }
    }, 500)
  })
}
