const blessed = require('blessed')

function drawX(box, screen) {
  box.content =
    '{bold}\n' +
    '\t  █   █\n' +
    '\t   █ █\n' +
    '\t    █\n' +
    '\t   █ █\n' +
    '\t  █   █' +
    '{/bold}'
}

function drawO(box, screen) {
  box.content =
    '{bold}\n' +
    '\t  ███\n' +
    '\t █   █\n' +
    '\t █   █\n' +
    '\t █   █\n' +
    '\t  ███' +
    '{/bold}'
}

const createGame = () => {
  const bg = 'none'
  const fg = 'white'

  let game = blessed.box({
    top: 'center',
    left: 'center',
    width: '300',
    height: '500',
    tags: true,
    style: {
      fg: 'white',
      border: {
        fg: 'green',
      },
      hover: {
        bg: 'red',
      },
    },
  })

  const lines = [
    blessed.line({
      orientation: 'vertical',
      left: '33%',
    }),
    blessed.line({
      orientation: 'vertical',
      left: '66%',
    }),
    blessed.line({
      orientation: 'horizontal',
      top: '33%',
    }),
    blessed.line({
      orientation: 'horizontal',
      top: '66%',
    }),
  ]

  const cells = [
    blessed.box({
      width: '33%',
      height: '33%',
      content: '',
      fg: fg,
      bg: bg,
      tags: true,
      focus: {
        bg: 'red',
      },
      hover: {
        bg: 'red',
      },
    }),
    blessed.box({
      width: '33%',
      height: '33%',
      left: 'center',
      fg: fg,
      bg: bg,
      tags: true,
      focus: {
        bg: 'red',
      },
      hover: {
        bg: 'red',
      },
    }),
  ]

  cells.forEach((cell) => {
    game.append(cell)
  })

  lines.forEach((line) => {
    game.append(line)
  })

  // implement focus events for all the cells

  return [game, cells]
}

exports.createGame = createGame
exports.drawX = drawX
exports.drawO = drawO
