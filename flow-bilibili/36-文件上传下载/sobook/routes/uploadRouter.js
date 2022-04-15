var express = require('express');
var fs = require('fs')
var router = express.Router();
// 引入文件上传模块
let multer = require('multer');
const app = require('../app');
// 配置上传对象
let upload = multer({dest: './public/upload'})
// let upload = multer({dest: './public/upload', limits: {fileSize: 1024*1024*20, files: 5}}) 设置的大小不能超过20M，限制上传5

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('uploadimg.ejs')
});

// 处理上传的post请求
// 如果上传单个文件，可调用upload.single()方法，并且将表单文件的name值传入
router.post('/', upload.single('imgfile'), function(req, res) {
  console.log(req.file);
  // 因为直接上传的文件为随之名称，我们想要重新命名
  let oldPath = req.file.destination+'/'+req.file.filename
  let newPath = req.file.destination+'/'+req.file.filename+req.file.originalname
  fs.rename(oldPath,newPath,() => {
    console.log('改名成功');
  })
  res.send('<h1>上传成功</h1><img src="/upload/'+req.file.filename+req.file.originalname+'" />')
})

router.post('/ajax', upload.single('imgfile'), function(req, res) {
  console.log(req.file);
  // 因为直接上传的文件为随之名称，我们想要重新命名
  let oldPath = req.file.destination+'/'+req.file.filename
  let newPath = req.file.destination+'/'+req.file.filename+req.file.originalname
  fs.rename(oldPath,newPath,() => {
    console.log('改名成功');
  })
  res.json({
    state: 'ok',
    imgUrl: '/upload/'+req.file.filename+req.file.originalname
  })
})

router.post('/multiple', upload.array('imgfiles', 5), function(req, res) {
  console.log(req.files)
  req.files.forEach((ele, i) => {
    let oldPath = ele.destination+'/'+ele.filename
    let newPath = ele.destination+'/'+ele.filename+ele.originalname
    fs.rename(oldPath,newPath,() => {
      console.log('改名成功');
    })
  })
  res.send('<h1>上传成功</h1><img src="/upload/'+req.files[0].filename+req.files[0].originalname+'" /><img src="/upload/'+req.files[1].filename+req.files[1].originalname+'" />')
})



module.exports = router;
