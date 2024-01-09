import { FastifyPluginAsync } from "fastify"

interface Board {
  id: string;
  width: number;
  height: number;
  difficulty: number;
}

export const boards: Board[] = [
  {
    "id": "1",
    "width": 5,
    "height": 10,
    "difficulty": 1
  },
  {
    "id": "2",
    "width": 8,
    "height": 12,
    "difficulty": 2
  },
  {
    "id": "3",
    "width": 6,
    "height": 10,
    "difficulty": 3
  }
];

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/boards', async (request, reply) => {
    return boards;
  });

  fastify.post('/boards', async (request, reply) => {
    const board = request.body as Board;
    boards.push(board);
    return board;
  });
}

export default route;
