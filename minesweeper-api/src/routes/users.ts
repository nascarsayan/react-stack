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

  // TODO: Add findUserById

  interface GetUserParams {
    id: string;
  }
  fastify.get<{ Params: GetUserParams }>('/users/:id', async (request, reply) => {
    const { id } = request.params;
    const user = await fastify.prisma.user.findUnique({
      where: { id: Number(id) }
    });
    return user;
  });

  fastify.post<{ Body: CreateUserDto }>('/users', async (request, reply) => {
    const user = request.body;
    const newUser = await fastify.prisma.user.create({ data: user });

    return newUser;
  });
}

export default route;
