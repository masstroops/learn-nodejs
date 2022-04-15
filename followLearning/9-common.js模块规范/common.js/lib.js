console.log('hello cb')

// exports 输出
exports.hello = 'world'

exports.add = function(a, b) {
  return a + b
}

// module.exports 输出
module.exports = function(a, b) { // module.exports 会覆盖所有的 exports
  return a - b
}

setTimeout(function() {
  console.log(exports)
}, 2000)