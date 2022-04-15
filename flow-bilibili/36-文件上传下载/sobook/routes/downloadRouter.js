var express = require('express');
var router = express.Router();
var sqlQuery = require('../cbSql')

/* GET users listing. */
router.get('/dl/:bookid', async function(req, res, next) {
  let bookid = req.params.bookid
  // 通过bookid查询数据库，获取本地的文件下载路径
  let result = await sqlQuery('select localdownload from book where id = ?', [bookid])
  let localPath = result[0].localdownload ? result[0].localdownload : './public/downloadbook/楚辞（果麦经典）.zip'
  res.download(localPath)
});

module.exports = router;
