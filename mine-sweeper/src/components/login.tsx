import { useContext, useState } from 'preact/hooks';
import { GameContext, PathProps } from '../util/types';

export const Login = (_: PathProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    setCurrentUser,
    allUsers,
  } = useContext(GameContext)

  const handleLogin = (event: Event) => {
    event.preventDefault();

    console.log(`Logging in user:${username} with password:${password}`)

    // Check if allUsers contains a user with the given username
    const user = allUsers.find((user) => user.username === username)

    if (user) {
      setCurrentUser(user)
    } else {
      alert("User not found")
    }
  }

  return (
    <form onSubmit={handleLogin}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onInput={(e) => setUsername(e.currentTarget.value)} />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)} />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
}
