import { useState, useEffect } from 'preact/hooks';

import './app.css'

type Cell = {
  isMine: boolean
  mineCount?: number
  isRevealed: boolean
}

export function App() {

  const [board, setBoard] = useState<Array<Array<Cell>>>([])

  const [isGameOver, setIsGameOver] = useState<boolean>(false)

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
        currRow.push({
          isMine,
          isRevealed: false
        })
      }

      newBoard.push(currRow)
    }

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (newBoard[i][j].isMine) {
          continue
        }

        let mineCount = 0
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            let [newI, newJ] = [i + di, j + dj]
            if (
              newI < 0 || newI >= numRows ||
              newJ < 0 || newJ >= numCols
            ) {
              continue
            }
            
            if (newBoard[newI][newJ].isMine) {
              mineCount++
            }
          }
        }

        newBoard[i][j].mineCount = mineCount
      }
    }

    setBoard(newBoard)
  }

  // Flood fill algorithm
  function revealRecursive(i: number, j: number, board: Cell[][]) {
    if (i < 0 || j < 0 || i >= numRows || j >= numCols) return;
    if (board[i][j].isMine) return;
    if (board[i][j].isRevealed) return;

    board[i][j].isRevealed = true;
    if (board[i][j].mineCount != 0) return;

    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        // Below condition not required
        // if (di == 0 && dj == 0) continue;
        revealRecursive(i+di, j+dj, board)
      }
    }
  }

  function handleCellClick(i: number, j: number) {

    if (isGameOver) return;

    let newBoard = [...board]

    if (newBoard[i][j].isMine) {
      alert("Game over!")

      // Method 1
      // for (let i = 0; i < numRows; i++) {
      //   for (let j = 0; j < numCols; j++) {
      //     newBoard[i][j].isRevealed = true
      //   }
      // }

      setIsGameOver(true);      
    } else {
      if (newBoard[i][j].mineCount == 0) {
        revealRecursive(i, j, newBoard)
      }
    }

    newBoard[i][j].isRevealed = true

    setBoard(newBoard)
  }

  function display(cell: Cell) {
    // if (!cell.isRevealed) return "";

    // method 2: use isGameOver
    if (!isGameOver && !cell.isRevealed) return "";
    if (cell.isMine) return "💣";
    return cell.mineCount || 0;
  }

  return (
    <div id="app">
      {
        board.map(
          (row, i) => (
            <div className="row">
              {
                row.map(
                  (cell, j) => (
                    <div
                      className="cell"
                      style={{
                        cursor: (cell.isRevealed || isGameOver)
                          ? "default"
                          : "pointer",

                        backgroundColor: (cell.isRevealed || isGameOver)
                          ? "#fff"
                          : "#0ba"
                      }}
                      onClick={
                        () => handleCellClick(i, j)
                      }
                      >
                      { display(cell) }
                    </div>
                  )
                )
              }
            </div>
          )
        )
      }
    </div>
  )
}
