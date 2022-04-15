const buffer1 = Buffer.from('chenbing') // 直接用字符串创建一个buffer数据
const buffer2 = Buffer.from([1,2,3,4,5,6])

const buffer3 = Buffer.alloc(20) // 创建一个限定buffer长度的数据
console.log(buffer1, buffer2, buffer3)

buffer2.writeInt8(12, 1) // 参一：要写入的值；参二：从左偏移的位数，这里表示偏移一位在第二位写入数据
console.log(buffer2)
buffer2.writeInt16BE(512, 2) // BE 高位 表示大值在前还是小值在前
console.log(buffer2)
buffer2.writeInt16LE(512, 2) // LE 低位

const fs = require('fs')
const protobuf = require('protocol-buffers') // protocol-buffers 是一个方便对buffer进行编码和解码的库
// 根据协议，编译出一个js逻辑对象，里面包含encode和decode函数
// 实际写web服务器的时候，注意这个操作可以直接在进程启动就做
// 否则在http处理过程里做的话，是一次不必要的性能消耗
const schema = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8')) // 读取写好的规定buffer格式的文件
console.log(schema)

const buffer = schema.Column.encode({ // 使用了 protocol-buffers 只需传入对象就能编码
  id: 1,
  name: 'node.js',
  price: 66.6
})

console.log(buffer)
console.log(
  schema.Column.decode(buffer)// buffer数据解码的方法
)
