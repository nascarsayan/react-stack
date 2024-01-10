import { FastifyPluginAsync } from "fastify"

interface CreateBoardDto {
  width: number;
  height: number;
  difficulty: number;
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/boards', async (request, reply) => {
    const boards = await fastify.prisma.board.findMany();
    return boards;
  });

  fastify.post<{ Body: CreateBoardDto }>('/boards', async (request, reply) => {
    const board = request.body;
    const newBoard = await fastify.prisma.board.create({ data: board });
    return newBoard;
  });
}

export default route;
