// 1、数组不能进行二进制数据操作
// 2、js数组不像java等语言效率高
// 3、buffer会在内存空间开辟固定大小内存

var str = 'hello world'
let buf = Buffer.from(str)
console.log(buf, buf.toString())


// 开辟一个空的buffer(缓存区)
let buf1 = Buffer.alloc(10)
buf1[0] = 10
console.log(buf1)

let buf2 = Buffer.allocUnsafe(10) // 不安全开辟空间，速度更快
console.log(buf2)