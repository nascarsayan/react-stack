import { useContext, useEffect, useState } from "preact/hooks"
import { BackendUrl, Cell, Difficulty, GameContext, PathProps } from "../util/types"
import { useTimer } from "../util/timer"

// MineSweeper is a JSX component
export function MineSweeper(_: PathProps) {
  const [board, setBoard] = useState<Array<Array<Cell>>>([])

  const [isGameDone, setIsGameDone] = useState<boolean>(false)

  const [timer, resetTimer, pauseTimer] = useTimer()

  const { rows: numRows, cols: numCols, difficulty, currentUser } = useContext(GameContext)

  useEffect(() => {
    createBoard()
  }, [numCols, numRows, difficulty])


  function getMineCells() {

    let mineRatio = 1;
    switch (difficulty) {
      case Difficulty.easy:
        mineRatio = 0.1;
        break;
      case Difficulty.medium:
        mineRatio = 0.2;
        break;
      case Difficulty.hard:
        mineRatio = 0.3;
        break;
      default:
        break;
    }

    let totalMines = Math.ceil((numRows * numCols) * mineRatio);

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

    setIsGameDone(false)

    let mineCells = getMineCells()

    let newBoard: Array<Array<Cell>> = []
    for (let i = 0; i < numRows; i++) {

      let currRow: Array<Cell> = []
      for (let j = 0; j < numCols; j++) {
        let isMine = mineCells.includes(i * numCols + j)
        currRow.push({
          isMine,
          isRevealed: false,
          isFlagged: false
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
    resetTimer()
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
        revealRecursive(i + di, j + dj, board)
      }
    }
  }

  function isGameWon(board: Cell[][]) {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (board[i][j].isRevealed) continue
        if (!board[i][j].isMine) return false
      }
    }
    return true
  }

  async function handleCellClick(event: MouseEvent, i: number, j: number) {
    event.preventDefault();

    if (event.button == 2) {
      // right click event
      let newBoard = [...board]
      newBoard[i][j].isFlagged = !newBoard[i][j].isFlagged
      setBoard(newBoard)
      return
    }

    // left click event
    if (board[i][j].isFlagged) return

    if (isGameDone) return;

    let newBoard = [...board]

    if (newBoard[i][j].isMine) {
      alert("Game over!")

      // Method 1
      // for (let i = 0; i < numRows; i++) {
      //   for (let j = 0; j < numCols; j++) {
      //     newBoard[i][j].isRevealed = true
      //   }
      // }

      setIsGameDone(true);
      pauseTimer();
    } else {
      if (newBoard[i][j].mineCount == 0) {
        revealRecursive(i, j, newBoard)
      }

    }

    newBoard[i][j].isRevealed = true

    let difficultyToInt = (difficulty: Difficulty) => {
      switch (difficulty) {
        case Difficulty.easy:
          return 1;
        case Difficulty.medium:
          return 2;
        case Difficulty.hard:
          return 3;
        default:
          return -1;
      }
    }

    let hasWon = isGameWon(newBoard)
    if (hasWon) {
      alert(`You've won! 🎉 in ${timer} seconds`)
      setIsGameDone(true)
      pauseTimer()

      if (!currentUser) {
        alert('Please login to save your score')
        return
      }

      const getStartTimeFromDuration = (durationSecs: number) => {
        const date = new Date();
        // reduce the duration from the current date
        date.setSeconds(date.getSeconds() - durationSecs);
        return date.toISOString();
      }

      try {
      // save the scores to the backend
        const response = await fetch(
          `${BackendUrl}/api/games`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            boardWidth: numCols,
            boardHeight: numRows,
            difficulty: difficultyToInt(difficulty),
            userId: currentUser.id,
            durationSeconds: timer,
            startedAt: getStartTimeFromDuration(timer)
          })
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.dir(error);
      }
    }

    setBoard(newBoard)
  }

  function display(cell: Cell) {
    // if (!cell.isRevealed) return "";

    // method 2: use isGameOver
    if (!isGameDone && !cell.isRevealed) {
      if (cell.isFlagged) return "🚩";
      return "";
    }
    if (cell.isMine) return "💣";
    if (cell.mineCount == 0) return ""
    return cell.mineCount;
  }

  function getBgColor(cell: Cell) {
    if (cell.isRevealed || isGameDone) {

      if (cell.isMine) {
        return "#fe1100"
      }

      return "#DEB887"

    }
    return "#0ba"
  }

  return (
    <>
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
                        cursor: (cell.isRevealed || isGameDone)
                          ? "default"
                          : "pointer",

                        backgroundColor: getBgColor(cell)
                      }}
                      onContextMenu={
                        (event) => handleCellClick(event, i, j)
                      }
                      onClick={
                        (event) => handleCellClick(event, i, j)
                      }
                    >
                      {display(cell)}
                    </div>
                  )
                )
              }
            </div>
          )
        )
      }
      <div className="timer">
        {timer}
      </div>
      <button onClick={createBoard}>Reset</button>
      <button>
        <a href="/">Home</a>
      </button>
    </>
  )
}
