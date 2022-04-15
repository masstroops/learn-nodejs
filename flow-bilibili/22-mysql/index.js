let mysql = require('mysql')
let options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'cb123456',
  database: 'cbdb',
}
// 创建与数据库的连接对象
let con = mysql.createConnection(options)
// 建立连接
con.connect((err) => {
  // 如果建立连接失败
  if (err) {
    console.log(err)
  } else {
    console.log('连接成功')
  }
})

// 执行数据库语句
// 执行查询语句
let strSql = 'select * from student'
con.query(strSql, (err, results, fields) => {
  // console.log(err, results, fields)
})

// 删除表
let strSql2 = 'drop table student'
con.query(strSql2, (err, results) => {
  // console.log(err, results)
})

// 删除库
// let strSql3 = 'drop database cbdb'
// con.query(strSql3, (err, results) => {
//   // console.log(err, results)
// })

// 创建库
// let strSql4 = 'create database cbdb'
// con.query(strSql4, (err, results) => {
//   console.log(err, results)
// })

// 创建表
// let strSql5 = 'CREATE TABLE `user` (`id` int(0) NOT NULL AUTO_INCREMENT,`username` varchar(255) NULL,`password` varchar(255) NULL,`mail` varchar(255) NULL,PRIMARY KEY (`id`))'
// con.query(strSql5, (err, results) => {
//   console.log(err, results)
// })

// 插入数据
// let strSql6 = 'insert into user (id, username, password) values (3, "老陈3", "123456")'
// con.query(strSql6, (err, results) => {
//   console.log(err, results)
// })

// 插入数据，id可以忽略会自动递增，?占位符
let strSql7 = "insert into user (username, password, mail) values (?, ?, ?)"
con.query(strSql7, ['小红', '123', '123@qq.com'],(err, results) => {
  console.log(err, results)
})

// 查询book表内满足viewcount字段>3000和<20000的数据
// SELECT * FROM book WHERE viewcount > 3000 and viewcount < 20000;