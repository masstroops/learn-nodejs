let path = require('path')

// 获取当前的执行文件
console.log(__filename)

// 解析路径，可以将路径信息直接解析，根目录、目录、文件、扩展名、文件名
console.log(path.parse(__filename))