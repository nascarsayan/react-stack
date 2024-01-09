import { FastifyPluginAsync } from "fastify"

interface User {
  id: string;
  username: string;
  name: string;
}

let users: User[] = [
  {
    "id": "1",
    "username": "bob",
    "name": "Bob Smith"
  },
  {
    "id": "2",
    "username": "jane",
    "name": "Jane Doe"
  },
  {
    "id": "3",
    "username": "alice",
    "name": "Alice Jones"
  }
];

interface CreateUserDto {
  username: string;
  name: string;
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/users', async (request, reply) => {
    return users;
  });

  fastify.post('/users', async (request, reply) => {
    const userBody = request.body as CreateUserDto;
    const user: User = {
      id: (users.length + 1).toString(),
      ...userBody
    };
    users.push(user);
    return user;
  });
}

export default route;
