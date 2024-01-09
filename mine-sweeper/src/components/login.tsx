import { useContext, useState } from 'preact/hooks';
import { GameContext, PathProps } from '../util/types';

export const Login = (_: PathProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    setCurrentUser,
  } = useContext(GameContext)

  const handleLogin = async (event: Event) => {
    event.preventDefault();

    console.log(`Logging in user:${username} with password:${password}`)

    try {
      // send GET request to localhost:3000/users to get all the users.

      const response = await fetch(
        'http://localhost:3000/users', {
        method: 'GET'
      });

      const data = await response.json();
      console.log(data);

      type UserDto = {
        id: string;
        name: string;
        username: string;
      }

      const users = data as UserDto[];

      const currentUser = users.find(
        user => user.username === username);

      if (!currentUser) {
        alert('User not found');
        return;
      }

      setCurrentUser(currentUser);

    } catch (error) {
      console.dir(error);
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
