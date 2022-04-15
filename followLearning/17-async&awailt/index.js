console.log(async function() { // async 是Promise的语法糖封装
  return 233
}())

console.log(function() {
  return new Promise((resolve, reject) => {
    resolve(233)
  })
}())

const result = async function() { // async
  try { // try catch 使用 await 之后可以捕捉到setTimeout另一个调用栈抛出的错误
    var content = await new Promise((resolve, reject) => { // await 同步暂停，遇到必须要等待resolve或reject结果才会继续往下执行
      setTimeout(() => {
        // resolve(6)
        reject(new Error('6'))
      }, 500)
    })message)
  }
  

  console.log(content)
  return 4
  } catch(e) {
    console.log('error', e.
}()

setTimeout(() => {
  console.log(result)
}, 800)

// 同步面试
var interviewAsync = async function() {
  try {
    await interview(1)
    await interview(2)
    await interview(3)
  } catch(err) {
    console.log('cry at ' + err.round)
  }
  console.log('Yeah!')
}()

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        console.log('smail at ' + round)
        resolve('success') 
      } else {
        var error = new Error('fail')
        error.round = round
        reject(error) 
      }
    }, 500)
  })
}