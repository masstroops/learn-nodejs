console.log('start require')
var lib = require('./lib.js')
console.log(lib)
console.log('end require')

lib.additional = 'test' // 测试 lib 输出的对象在require到这里，是不是同一个引用，结果：是