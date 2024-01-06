import { useState } from 'preact/hooks';

import './app.css'
import Router from 'preact-router';
import { Difficulty, GameContext } from './util/types';
import { Home } from './components/home';
import { MineSweeper } from './components/minesweeper';

export function App() {

  const [rows, setRows] = useState<number>(4)
  const [cols, setCols] = useState<number>(6)
  const [userName, setUserName] = useState<string>("")

  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.easy)

  const contextValue = {
    rows, setRows, cols, setCols, difficulty, setDifficulty, userName, setUserName
  }

  return (
    <div id="app">
      <GameContext.Provider value={contextValue}>
        <Router>
          <Home path="/" />
          <MineSweeper path="/game" />
        </Router>
      </GameContext.Provider>
    </div>
  )
}
