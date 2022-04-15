let cbApp = require('./cbApp')

let app = new cbApp()
// 设置静态目录
app.staticDir = '/cb'

app.on('/', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('这是首页<img src="./cb/a.png">')
})

app.on('/gnxw', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  if (req.pathObj.base == 'index') { // 访问路由 /gnxw/index
    res.end('这是国内新闻首页')
  } else {
    res.end('这是国内新闻其他页面')
  }
})

app.on('/movies', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  let movies = [
    {
      name: '花木兰',
      brief: '影片讲述了一位无所畏惧的年轻女子义无反顾为家国而战，成为中国史上最著名的伟大勇士之一。当皇帝下令境内每个家庭必须有一位男丁应召出征，抵御北方来犯者入侵，出身军戎之家的长女花木兰，挺身而出，替病痛缠身的父亲应征入伍。她女扮男装化名“花军”，一路历经磨练，驾驭自己内心的力量，激发真正的潜能。通过这段传奇历程，她将成为一名光荣的勇士，不仅赢得国家的认可，更博得父亲的骄傲。',
      author: '刘亦菲/甄子丹/巩俐/李连杰/李截',
      stars: ['刘亦菲', '甄子丹', '巩俐', '李连杰', '李截']
    },
    {
      name: '网络谜踪',
      brief: '工程师大卫·金一直引以为傲的16岁乖女玛戈特突然失踪。前来调查此案的警探怀疑女儿离家出走。不满这一结论的父亲为了寻找真相，独自展开调查。他打开了女儿的笔记本电脑，用社交软件开始寻找破案线索。大卫必须在女儿消失之前，沿着她在虚拟世界的足迹找到她……',
      author: '约翰·赵',
      stars: [{
          name:'约翰·赵',
          gender: '男'
        }, {
          name:'甄子丹',
          gender: '男'
        }, {
          name: '巩俐',
          gender: '女'
        }, {
          name:'李连杰',
          gender: '男'
        }, {
          name:'李截',
          gender: '男'
        }]
    },
  ]
  let index = req.pathObj.base
  // res.end(movies[index].name)
  if (index == 0) res.render(movies[index], './template/index0.html')
  else res.render(movies[index], './template/index1.html')
})

app.run(80, () => {
  console.log('服务启动：', 'http://127.0.0.1')
})


