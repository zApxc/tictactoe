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

    this.cells = [
      [
        blessed.box({ ...genericCell }),
        blessed.box({
          ...genericCell,
          left: 'center',
        }),
        blessed.box({
          ...genericCell,
          left: '66%',
        }),
      ],
      [
        blessed.box({
          ...genericCell,
          top: 'center',
        }),
        blessed.box({
          ...genericCell,
          left: 'center',
          top: 'center',
        }),
        blessed.box({
          ...genericCell,
          left: '66%',
          top: 'center',
        }),
      ],
      [
        blessed.box({
          ...genericCell,
          top: '66%',
        }),
        blessed.box({
          ...genericCell,
          left: 'center',
          top: '66%',
        }),
        blessed.box({
          ...genericCell,
          left: '66%',
          top: '66%',
        }),
      ],
    ]

    this.cells.forEach((row) => {
      row.forEach((cell) => {
        this.grid.append(cell)
      })
    })

    lines.forEach((line) => {
      this.grid.append(line)
    })

    this.setCurrentCell(1, 1)

    // object that maps to the grid
    this.gridMatrix = {
      matrix: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      cellsLeft: 9,
      setCell(row, col, isX) {
        /*
         * sets a matrix cell's content to X or O
         * and decrease the number of cells left
         */
        isX ? (this.matrix[row][col] = 'X') : (this.matrix[row][col] = 'O')
        this.cellsLeft -= 1
      },
    }

    screen.render()
  }

  setCurrentCell(row, col) {
    if (this.currCell) {
      this.currCell.style.bg = ''
    }
    this.currRow = row
    this.currCol = col
    this.currCell = this.cells[row][col]
    this.currCell.style.bg = 'cyan'
    this.screen.render()
  }

  moveUp() {
    if (this.currRow - 1 == -1) {
      this.currRow = 3
    }
    this.setCurrentCell(this.currRow - 1, this.currCol)
  }

  moveDown() {
    this.setCurrentCell((this.currRow + 1) % 3, this.currCol)
  }

  moveLeft() {
    if (this.currCol - 1 == -1) {
      this.currCol = 3
    }
    this.setCurrentCell(this.currRow, this.currCol - 1)
  }

  moveRight() {
    this.setCurrentCell(this.currRow, (this.currCol + 1) % 3)
  }

  drawX(row = this.currRow, col = this.currCol) {
    this.cells[row][col].content =
      '{bold}' +
      '█   █\n' +
      ' █ █ \n' +
      '  █  \n' +
      ' █ █ \n' +
      '█   █' +
      '{/bold}'
    this.gridMatrix.setCell(row, col, false)
    this.screen.render()
  }

  drawO(row = this.currRow, col = this.currCol) {
    this.cells[row][col].content =
      '{bold}' +
      ' ███ \n' +
      '█   █\n' +
      '█   █\n' +
      '█   █\n' +
      ' ███ ' +
      '{/bold}'
    this.gridMatrix.setCell(row, col, false)
    this.screen.render()
  }
}

exports.Game = Game

// TODO:
// implement grid resizing
