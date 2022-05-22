const blessed = require('blessed')

class Game {
  constructor(screen) {
    this.screen = screen
    this.game = blessed.box({
      top: 'center',
      left: 'center',
      width: '300',
      height: '500',
      tags: true,
      style: {
        fg: 'white',
        border: {
          fg: 'white',
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

    this.cells = {
      1: blessed.box({
        width: '33%',
        height: '33%',
        align: 'center',
        valign: 'middle',
        tags: true,
        focus: {
          bg: 'red',
        },
        hover: {
          bg: 'red',
        },
      }),

      2: blessed.box({
        width: '33%',
        height: '33%',
        left: 'center',
        align: 'center',
        valign: 'middle',
        tags: true,
        focus: {
          bg: 'red',
        },
        hover: {
          bg: 'red',
        },
      }),

      3: blessed.box({
        width: '33%',
        height: '33%',
        left: 'center',
        align: 'center',
        valign: 'middle',
        tags: true,
        focus: {
          bg: 'red',
        },
        hover: {
          bg: 'red',
        },
      }),
    }

    for (const key in this.cells) {
      this.game.append(this.cells[key])
    }

    lines.forEach((line) => {
      this.game.append(line)
    })
  }

  drawX(cellNumber) {
    this.cells[cellNumber].content =
      '{bold}' +
      '█   █\n' +
      ' █ █ \n' +
      '  █  \n' +
      ' █ █ \n' +
      '█   █' +
      '{/bold}'
    this.screen.render()
  }

  drawO(cellNumber) {
    this.cells[cellNumber].content =
      '{bold}' +
      ' ███ \n' +
      '█   █\n' +
      '█   █\n' +
      '█   █\n' +
      ' ███ ' +
      '{/bold}'
    this.screen.render()
  }
}

exports.Game = Game
