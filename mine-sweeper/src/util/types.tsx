import { createContext } from "preact"


export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard"
}

export type PathProps = {
  path: string
}

export type Cell = {
  isMine: boolean
  mineCount?: number
  isRevealed: boolean
  isFlagged: boolean
}

export type GameContextType = {
  rows: number
  setRows: (rows: number) => void
  cols: number
  setCols: (cols: number) => void
  difficulty: Difficulty
  setDifficulty: (difficulty: Difficulty) => void
  userName: string
  setUserName: (userName: string) => void
}

export const GameContext = createContext<GameContextType>({
  rows: 0,
  setRows: (_: number) => { },
  cols: 0,
  setCols: (_: number) => { },
  difficulty: Difficulty.easy,
  setDifficulty: (_: Difficulty) => { },
  userName: "",
  setUserName: (_: string) => { }
})

