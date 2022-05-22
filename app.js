const blessed = require('blessed')
const { Game } = require('./game')

let screen = blessed.screen({
  smartCSR: true,
})

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

let commands = blessed.box({
  top: 'left',
  left: 'left',
  width: '200',
  height: '240',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: '#111111',
    border: {
      fg: 'white',
    },
  },
})

commands.setContent(
  '{center}Commands\n\n' +
    '{bold}q, ESC, Ctrl-C{/bold} - Quit\n' +
    '{bold}w, k, up (↑){/bold} - Move up\n' +
    '{bold}s, j, down (↓){/bold} - Move down\n' +
    '{bold}a, h, left (←){/bold} - Move left\n' +
    '{bold}d, l, right (→){/bold} - Move right\n' +
    '{bold}ENTER, Left click{/bold} - Place X/O\n' +
    '{/center}'
)

let game = new Game(screen)

screen.append(game.game)
screen.append(commands)

game.game.focus()

screen.render()

game.drawX(1)
game.drawO(2)
game.drawO(3)
