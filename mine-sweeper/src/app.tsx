import { useState, useEffect } from 'preact/hooks';

import './app.css'

type Cell = {
  isMine: boolean
}

export function App() {

  const [board, setBoard] = useState<Array<Array<Cell>>>([])

  useEffect(() => {
    createBoard()
  }, [])

  let numRows = 8
  let numCols = 10

  function getMineCells() {
    let totalMines = 8 // (numRows * numCols) / 6

    let allCells = (new Array(numRows * numCols)).fill(0).map(
      (_, i) => i
    )

    // shuffle the cells

    for (let i = allCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
    }

    let mineCells = allCells.slice(0, totalMines)

    return mineCells
  }

  function createBoard() {
    let mineCells = getMineCells()

    let newBoard: Array<Array<Cell>> = []
    for (let i = 0; i < numRows; i++) {

      let currRow: Array<Cell> = []
      for (let j = 0; j < numCols; j++) {
        let isMine = mineCells.includes(i * numCols + j)
        currRow.push({ isMine })
      }

      newBoard.push(currRow)
    }

    setBoard(newBoard)
  }

  return (
    <div id="app">
      {
        board.map(
          row => (
            <div className="row">
              {
                row.map(
                  cell => <div className="cell">
                    {cell.isMine ? '💣' : '_'}
                  </div>
                )
              }
            </div>
          )
        )
      }
    </div>
  )
}
