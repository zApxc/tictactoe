const blessed = require('blessed')

class Game {
  constructor(screen) {
    this.screen = screen
    this.grid = blessed.box({
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

    const genericCell = {
      width: '33%',
      height: '33%',
      align: 'center',
      valign: 'middle',
      tags: true,
    }

    this.cells = {
      1: blessed.box({ ...genericCell }),
      2: blessed.box({
        ...genericCell,
        left: 'center',
      }),
      3: blessed.box({
        ...genericCell,
        left: '66%',
      }),
      4: blessed.box({
        ...genericCell,
        top: 'center',
      }),
      5: blessed.box({
        ...genericCell,
        left: 'center',
        top: 'center',
      }),
      6: blessed.box({
        ...genericCell,
        left: '66%',
        top: 'center',
      }),
      7: blessed.box({
        ...genericCell,
        top: '66%',
      }),
      8: blessed.box({
        ...genericCell,
        left: 'center',
        top: '66%',
      }),
      9: blessed.box({
        ...genericCell,
        left: '66%',
        top: '66%',
      }),
    }

    for (const key in this.cells) {
      this.grid.append(this.cells[key])
    }

    lines.forEach((line) => {
      this.grid.append(line)
    })

    screen.render()
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
