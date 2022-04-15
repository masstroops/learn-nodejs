// try {
  intrerview(function(res) { // node.js官方约定俗成规范，函数第一个参数用来判断是否报错，如果第一个参数不为null则是失败
    if (res) {
    // if (res instanceof Error) { // instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上
      return console.log('cry')
    }
    console.log('smile')
  })
// } catch(e) {
//   console.log('cry', e)
// }

function intrerview(callback) {
  setTimeout(() => { // setTimeout 内的函数是在一个新的事件循环，不会被catch到
    if (Math.random() < 0.8) {
      callback(null, 'success') // 成功！第一个参数传null
    } else {
      callback(new Error('fail')) // 失败！第一个参数Error
    }
  }, 500)
}
