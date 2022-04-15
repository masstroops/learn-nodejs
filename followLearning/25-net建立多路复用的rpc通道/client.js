const net = require('net') // net 模块，服务端和服务端之间建立通信的模块

const socket = new net.Socket({})

// 创建tcp服务器
socket.connect({ // 和服务端建立连接
  host: '127.0.0.1',
  port: 4000
})

// socket.write('good morning chenbing!')

const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

// 半双工通信实例
// let buffer = Buffer.alloc(4)
// let index = Math.floor(Math.random() * LESSON_IDS.length)
// buffer.writeInt32BE(
//   LESSON_IDS[index]
// )
// socket.write(buffer)

// socket.on('data', function(buffer) {
//   console.log(LESSON_IDS[index], buffer.toString())

//   buffer = Buffer.alloc(4)
//   index = Math.floor(Math.random() * LESSON_IDS.length)
//   buffer.writeInt32BE(
//     LESSON_IDS[index]
//   )
//   socket.write(buffer)
// })


// 全双工通信实例
let id = Math.floor(Math.random() * LESSON_IDS.length)

socket.on('data', function(buffer) {
  const seqBuffer = buffer.slice(0, 2)
  const titleBuffer = buffer.slice(2)

  console.log(seqBuffer.readInt16BE() ,titleBuffer.toString())
  
})

// 一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
// 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
let seq = 0
function encode(index) {
  // 正常情况下，这里应该是使用 protobuf 来encode一段代表业务数据的数据包
  // 为了不要混淆重点，这个例子比较简单，就直接把课程id转buffer发送

  const headBuffer = Buffer.alloc(2)
  headBuffer.writeInt16BE(
    seq
  )

  const bodyBuffer = Buffer.alloc(4)
  bodyBuffer.writeInt32BE(
    LESSON_IDS[index]
  )
  const buffer = Buffer.concat([headBuffer, bodyBuffer])
  console.log(seq, LESSON_IDS[index])
  seq++
  return buffer
}

setInterval(function() {
  id = Math.floor(Math.random() * LESSON_IDS.length)
  socket.write(encode(id))
},50)
socket.write(encode(id))

// for (var i = 0; i < 100; i++) { // 客户端同时发送100个包，服务端只会接收到一个包，因为tcp通信底层会把同时发送过来的包优化拼接成一个大包，俗称粘包，这种情况服务端就要对这个大包进行切割读取
//   id = Math.floor(Math.random() * LESSON_IDS.length)
//   socket.write(encode(id))
// }