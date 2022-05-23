const blessed = require('blessed')
const { Game } = require('./game')

const screen = blessed.screen({
  smartCSR: true,
})

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0)
})

let commands = blessed.box({
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
    '{bold}ENTER, Left click{/bold} - Place X/O\n',
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

let game = new Game(screen)

screen.append(game.grid)
screen.append(commands)

screen.render()

game.drawX(1)
game.drawO(2)
game.drawO(3)
game.drawX(4)
game.drawO(5)
game.drawO(6)
game.drawX(7)
game.drawO(8)
game.drawX(9)
