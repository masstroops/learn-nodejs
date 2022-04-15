const axios = require('axios')

let httpUrl = 'https://www.fabiaoqing.com/bqb/lists/type/hot/page/3.html'
let options = {
  proxy: {
    host: '36.248.129.236',
    port: 9999
  }
}
axios.get(httpUrl, options).then(res => {
  console.log(res.data)
})