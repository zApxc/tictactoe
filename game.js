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

    // insert every cell (blessed.box) to the grid
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        this.grid.append(cell)
      })
    })
    // draw every line after the cells
    lines.forEach((line) => {
      this.grid.append(line)
    })

    this.setCurrentCell(1, 1)

    /**
     * Object that maps the grid to a matrix
     *
     * @param {string[][]} gridMatrix The game grid as a matrix
     * @param {number} cellsLeft The number of game cells left to draw
     */

    this.gridMatrix = {
      matrix: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      cellsLeft: 9,
      setCell(row, col, isX) {
        isX ? (this.matrix[row][col] = 'X') : (this.matrix[row][col] = 'O')
        // the cell has been drawn, decrement the number of cells left
        this.cellsLeft -= 1
      },
    }

    screen.render()
  }

  /**
   * Checks whether a cell can be drawn or not
   *
   * @returns {bool}
   */

  canDraw(row = this.currRow, col = this.currCol) {
    return this.gridMatrix.matrix[row][col] == ''
  }

  /**
   * Get the game winner, otherwise tie or game not finished (X/O, T/N)
   *
   * @returns {string}
   */

  getWinner() {
    const grid = this.gridMatrix
    const mtx = grid.matrix
    // check for game winner row by row
    for (let row = 0; row < mtx.length; row++) {
      if (
        mtx[row][0] == mtx[row][1] &&
        mtx[row][1] == mtx[row][2] &&
        mtx[row][0] != ''
      ) {
        return mtx[row][0]
      }
    }
    // check for game winner column by column
    for (let col = 0; col < mtx.length; col++) {
      if (
        mtx[0][col] == mtx[1][col] &&
        mtx[1][col] == mtx[2][col] &&
        mtx[0][col] != ''
      ) {
        return mtx[0][col]
      }
    }
    // check for the game winner diagonally
    if (mtx[0][0] == mtx[1][1] && mtx[1][1] == mtx[2][2] && mtx[0][0] != '')
      return mtx[0][0]
    if (mtx[0][2] == mtx[1][1] && mtx[1][1] == mtx[2][0] && mtx[0][2] != '')
      return mtx[0][2]
    // no game winner, return tie if there are no cells left, otherwise game not finished
    return grid.cellsLeft <= 0 ? 'T' : 'N'
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
    this.gridMatrix.setCell(row, col, true)
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
