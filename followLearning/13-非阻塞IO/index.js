const glob = require('glob') // 可以使用路径通配符匹配来进行路径匹配

var result = null
console.time('sync')
result = glob.sync(__dirname + '/**/*') // 以阻塞的方式递归获取目录下所有文件
console.timeEnd('sync')
// console.log(result)

console.time('async')
glob(__dirname + '/**/*', function(err, res) { // 以非阻塞的方式递归获取目录下所有文件
  result = res
  // console.log(result)
  console.log('got result')
})
console.timeEnd('async')
// IO完成之前还可以做别的事
console.log(1 + 1)