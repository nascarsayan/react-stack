import { useContext, useState } from 'preact/hooks';
import { BackendUrl, GameContext, PathProps } from '../util/types';

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
      // send GET request to localhost:3000/api/users/username/:username

      const response = await fetch(
        `${BackendUrl}/api/users/username/${username}`, {
        method: 'GET'
      });

      const data = await response.json();
      console.log(data);

      type UserDto = {
        id: number;
        name: string;
        username: string;
      }

      const user = data as UserDto;
      setCurrentUser(user);

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
