let { write, read, readdir } = require('cbfs')

readdir('../').then(function(files) {
  console.log(files)
})

async function test() {
  let files = await readdir('../../')
  console.log(files)
}

test()