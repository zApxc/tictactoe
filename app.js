const blessed = require('blessed')
const { Game } = require('./game')

const screen = blessed.screen({
  smartCSR: true,
})

const commands = blessed.box({
  parent: screen,
  top: 'left',
  left: 'left',
  width: '200',
  height: '300',
  align: 'center',
  valign: 'middle',
  content:
    'Commands\n\n' +
    '{bold}q, ESC, Ctrl-C{/bold} - Quit\n' +
    '{bold}w, k, up (↑){/bold} - Move up\n' +
    '{bold}s, j, down (↓){/bold} - Move down\n' +
    '{bold}a, h, left (←){/bold} - Move left\n' +
    '{bold}d, l, right (→){/bold} - Move right\n' +
    '{bold}ENTER{/bold} - Place X/O\n',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    border: {
      fg: 'white',
    },
  },
})

const result = blessed.box({
  top: 'center',
  left: 'center',
  width: '240',
  height: '400',
  align: 'center',
  valign: 'middle',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    border: {
      fg: 'white',
    },
  },
})

const game = new Game({
  parent: screen,
  top: 'center',
  left: 'center',
  width: '300',
  height: '570',
  tags: true,
  style: {
    fg: 'white',
    border: {
      fg: 'white',
    },
    currCellBg: 'cyan',
  },
})

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0)
})

result.key('enter', () => {
  screen.remove(result)
  game.clear()
  game.focus()
  screen.render()
})

game.key(['w', 'k', 'up'], () => {
  game.moveUp()
  screen.render()
})

game.key(['s', 'j', 'down'], () => {
  game.moveDown()
  screen.render()
})

game.key(['a', 'h', 'left'], () => {
  game.moveLeft()
  screen.render()
})

game.key(['d', 'l', 'right'], () => {
  game.moveRight()
  screen.render()
})

let drawXNext = true
game.key('enter', () => {
  if (!game.canDraw()) return
  drawXNext ? game.drawX() : game.drawO()
  drawXNext = !drawXNext

  const winner = game.getWinner()
  let resultText
  if (winner != 'N') {
    if (winner == 'X') {
      resultText = '{red-fg}X WINS!'
      result.style.border.fg = 'red'
    } else if (winner == 'O') {
      resultText = '{green-fg}O WINS!'
      result.style.border.fg = 'green'
    } else if (winner == 'T') {
      resultText = '{blue-fg}TIE!'
      result.style.border.fg = 'blue'
    }
    result.setContent(`{bold}${resultText}{/}\n\n\nPress ENTER to restart`)
    screen.append(result)
    result.focus()
  }

  screen.render()
})

game.focus()

screen.render()
