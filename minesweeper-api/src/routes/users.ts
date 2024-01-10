import { FastifyPluginAsync } from "fastify"

interface CreateUserDto {
  username: string;
  name: string;
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/users', async (request, reply) => {
    const users = await fastify.prisma.user.findMany();
    return users;
  });

  interface GetUserParams {
    id: string;
  }
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as GetUserParams;
    const user = await fastify.prisma.user.findUnique({
      where: { id: Number(id) }
    });
    return user;
  });

  fastify.post('/users', async (request, reply) => {
    const user = request.body as CreateUserDto;
    const newUser = await fastify.prisma.user.create({ data: user });

    return newUser;
  });
}

export default route;
