import { useState } from 'preact/hooks';

import './app.css'
import Router from 'preact-router';
import { Difficulty, GameContext, User } from './util/types';
import { Home } from './components/home';
import { MineSweeper } from './components/minesweeper';
import { Register } from './components/register';
import { Login } from './components/login';

export function App() {

  const [rows, setRows] = useState<number>(4)
  const [cols, setCols] = useState<number>(6)
  const [userName, setUserName] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [allUsers, setAllUsers] = useState<User[]>([])

  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.easy)

  const contextValue = {
    rows, setRows,
    cols, setCols,
    difficulty, setDifficulty,
    userName, setUserName,
    currentUser, setCurrentUser,
    allUsers, setAllUsers
  }

  return (
    <div id="app">
      <GameContext.Provider value={contextValue}>
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Register path="/register" />
          <MineSweeper path="/game" />
        </Router>
      </GameContext.Provider>
    </div>
  )
}
