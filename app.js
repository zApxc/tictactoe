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

const game = new Game(
  {
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
    },
  },
  screen
)

game.key(['w', 'k', 'up'], () => {
  game.moveUp()
})

game.key(['s', 'j', 'down'], () => {
  game.moveDown()
})

game.key(['a', 'h', 'left'], () => {
  game.moveLeft()
})

game.key(['d', 'l', 'right'], () => {
  game.moveRight()
})

let drawXNext = true
game.key('enter', () => {
  if (!game.canDraw()) return
  drawXNext ? game.drawX() : game.drawO()
  drawXNext = !drawXNext

  let winner = game.getWinner()
  if (winner == 'X') {
    console.log("X's won!")
  } else if (winner == 'O') {
    console.log("O's won!")
  } else if (winner == 'T') {
    console.log("It's a tie")
  }
})

screen.append(game)
screen.append(commands)

game.focus()

screen.render()

// TODO:
// screen result as a box
