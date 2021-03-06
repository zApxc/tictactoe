const blessed = require('blessed')

class Game extends blessed.box {
  constructor(options) {
    super(options)

    // add various style properties to the game
    this.style.cellFg = options.style.cellFg
    this.style.cellBg = options.style.cellBg
    this.style.currCellFg = options.style.currCellFg
    this.style.currCellBg = options.style.currCellBg

    const genericCell = {
      width: '33%',
      height: '33%',
      align: 'center',
      valign: 'middle',
      tags: true,
      style: {
        fg: this.style.cellFg,
        bg: this.style.cellBg,
      },
    }

    this.cells = [
      [
        blessed.box(structuredClone(genericCell)),
        blessed.box({
          ...structuredClone(genericCell),
          left: 'center',
        }),
        blessed.box({
          ...structuredClone(genericCell),
          left: '66%',
        }),
      ],
      [
        blessed.box({
          ...structuredClone(genericCell),
          top: 'center',
        }),
        blessed.box({
          ...structuredClone(genericCell),
          left: 'center',
          top: 'center',
        }),
        blessed.box({
          ...structuredClone(genericCell),
          left: '66%',
          top: 'center',
        }),
      ],
      [
        blessed.box({
          ...structuredClone(genericCell),
          top: '66%',
        }),
        blessed.box({
          ...structuredClone(genericCell),
          left: 'center',
          top: '66%',
        }),
        blessed.box({
          ...structuredClone(genericCell),
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

    // insert each cell into the grid
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        this.append(cell)
      })
    })
    // draw every line after the cells
    lines.forEach((line) => {
      this.append(line)
    })

    // matrix that corresponds to the game grid
    this.matrix = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
    // number of cells that haven't been drawn yet
    this.cellsLeft = 9

    this.setCurrentCell(1, 1)
  }

  /**
   * Sets a cell and its position to current cell and position
   *
   * @param {number} row - The row where the cell is, defaults to current row
   * @param {number} col - The col where the cell is, defaults to current col
   */

  setCurrentCell(row, col) {
    if (this.currCell) {
      this.currCell.style.bg = this.style.cellBg
      this.currCell.style.fg = this.style.cellFg
    }
    this.currRow = row
    this.currCol = col
    this.currCell = this.cells[row][col]
    this.currCell.style.fg = this.style.currCellFg
    this.currCell.style.bg = this.style.currCellBg
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

  /**
   * Checks whether a cell can be drawn or not
   *
   * @param {number} row - The row where the cell is, defaults to current row
   * @param {number} col - The col where the cell is, defaults to current col
   * @returns {bool}
   */

  canDraw(row = this.currRow, col = this.currCol) {
    return this.cells[row][col].content == ''
  }

  /**
   * Draws an X in the specified cell
   *
   * @param {number} row - The row where the cell is, defaults to current row
   * @param {number} col - The col where the cell is, defaults to current col
   */

  drawX(row = this.currRow, col = this.currCol) {
    this.cells[row][col].content =
      '{bold}' +
      '???   ???\n' +
      ' ??? ??? \n' +
      '  ???  \n' +
      ' ??? ??? \n' +
      '???   ???' +
      '{/bold}'
    this.matrix[row][col] = 'X'
    this.cellsLeft -= 1
  }

  /**
   * Draws an O in the specified cell
   *
   * @param {number} row - The row where the cell is, defaults to current row
   * @param {number} col - The col where the cell is, defaults to current col
   */

  drawO(row = this.currRow, col = this.currCol) {
    this.cells[row][col].content =
      '{bold}' +
      ' ????????? \n' +
      '???   ???\n' +
      '???   ???\n' +
      '???   ???\n' +
      ' ????????? ' +
      '{/bold}'
    this.matrix[row][col] = 'O'
    this.cellsLeft -= 1
  }

  /**
   * Get the game winner, otherwise tie or game not finished (X/O, T/N)
   *
   * @returns {string}
   */

  getWinner() {
    const mtx = this.matrix
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
    return this.cellsLeft <= 0 ? 'T' : 'N'
  }

  clear() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.cells[row][col].setContent('')
        this.matrix[row][col] = ''
      }
    }
    this.cellsLeft = 9
  }
}

exports.Game = Game
