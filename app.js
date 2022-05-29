const blessed = require('blessed')
const { Game } = require('./game')

const screen = blessed.screen({
  smartCSR: true,
})

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0)
})

const commands = blessed.box({
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

const game = new Game(screen)

game.grid.key(['w', 'k', 'up'], () => {
  game.moveUp()
})

game.grid.key(['s', 'j', 'down'], () => {
  game.moveDown()
})

game.grid.key(['a', 'h', 'left'], () => {
  game.moveLeft()
})

game.grid.key(['d', 'l', 'right'], () => {
  game.moveRight()
})

let drawXNext = true
game.grid.key('enter', () => {
  if (game.currCell.content == '') {
    drawXNext ? game.drawX() : game.drawO()
    drawXNext = !drawXNext
  }
})

screen.append(game.grid)
screen.append(commands)

game.grid.focus()

screen.render()
