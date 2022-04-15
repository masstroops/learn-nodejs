let mysql = require('mysql')
let options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'cb123456',
  database: 'book'
}
// 创建与数据库的连接对象
let con = mysql.createConnection(options)
con.connect((err) => {
  if (err) console.log(err)
  else console.log('数据库链接成功')
})

function sqlQuery(strSql, arr) {
  return new Promise((resolve, reject) => {
    con.query(strSql, arr, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}



module.exports = sqlQuery