import { useContext } from "preact/hooks"
import { Difficulty, GameContext, PathProps } from "../util/types"

export function Home(_: PathProps) {

  const {
    rows,
    setRows,
    cols,
    setCols,
    difficulty,
    setDifficulty,
  } = useContext(GameContext)

  return (
    <form class="board-form">
      <input type="number" value={rows} id="user-rows" onChange={
        (event) => setRows(parseInt(event.currentTarget.value))
      } />
      <label for="user-rows">Rows</label>
      <input type="number" value={cols} id="user-cols" onChange={
        (event) => setCols(parseInt(event.currentTarget.value))
      } />
      <label for="user-cols">Columns</label>

      <select
        id="user-difficulty"
        value={difficulty}
        onChange={
          (event) => setDifficulty(event.currentTarget.value as Difficulty)
        }
      >
        <option value="easy" >Easy</option>
        <option value="medium" >Medium</option>
        <option value="hard" >Hard</option>
      </select>

      <a href="/game">Start Game</a>

    </form>
  )
}