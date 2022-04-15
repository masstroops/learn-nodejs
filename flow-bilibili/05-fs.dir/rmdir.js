let fs = require('fs')

fs.rmdir('abc', (err) => {
  if (!err) {
    console.log('删除成功！')
  }
})