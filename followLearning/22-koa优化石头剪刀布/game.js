module.exports = function (playerAction) {
  if (playerAction != 'rock' && playerAction != 'paper' && playerAction != 'scissor') {
    console.log('请输入rock或paper或scissor')

  } else {
    // 计算电脑出的东西
    var computerAction;
    var random = Math.random() * 3
    if (random < 1) {
      computerAction = 'rock'

    } else if (random > 2) {
      computerAction = 'scissor'

    } else {
      computerAction = 'paper'

    }

    if (computerAction == playerAction) {
      return 0
    } else if (
      (computerAction == 'rock' && playerAction == 'scissor') ||
      (computerAction == 'scissor' && playerAction == 'paper') ||
      (computerAction == 'paper' && playerAction == 'rock')
    ) {
      return -1
    } else {
      return 1
    }
  }
}