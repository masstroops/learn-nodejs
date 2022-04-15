let fs = require('fs')
fs.unlink('cb.html', (err) => {
  console.log('删除成功!')
})