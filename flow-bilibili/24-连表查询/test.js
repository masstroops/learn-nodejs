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

async function getBook(page) {
  let strSql = 'Select * from book limit ?,20'
  let offsetIndex = (page-1)*20
  let result = await sqlQuery(strSql, [offsetIndex])
  console.log(result)
}

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

getBook(1)