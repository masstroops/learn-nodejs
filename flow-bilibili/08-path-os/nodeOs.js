let os = require('os')

// 返回一个对象数组，其中包含有关每个逻辑 CPU 内核的信息。
console.log(os.cpus())

// 操作系统
console.log(os.platform())

// 以整数的形式返回系统的内存总量（以字节为单位）。
console.log(os.totalmem())

// 返回为其编译 Node.js 二进制文件的操作系统的 CPU 架构
console.log(os.arch())

// 以整数的形式返回空闲的系统内存量（以字节为单位）。
console.log(os.freemem())