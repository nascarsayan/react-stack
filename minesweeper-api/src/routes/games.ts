import { FastifyPluginAsync } from "fastify"

// DTO = Data Transfer Object
// DTOs are used to define the shape of the data that is sent over the network
interface CreateGameDto {
  boardWidth: number;
  boardHeight: number;
  difficulty: number;

  userId: number;
  durationSeconds: number;
  startedAt: string;
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/games', async (request, reply) => {
    const games = await fastify.prisma.game.findMany();
    return games;
  });

  fastify.post('/games', async (request, reply) => {
    const game = request.body as CreateGameDto;
    
    const board = {
      width: game.boardWidth,
      height: game.boardHeight,
      difficulty: game.difficulty,
    }

    try {
      // check if board exsists
      let dbBoard = await fastify.prisma.board.findFirst({
        where: board
      });

      if (!dbBoard) {
        dbBoard = await fastify.prisma.board.create({
          data: board
        });
      }

      const newGame = await fastify.prisma.game.create({
        data: {
          durationSeconds: game.durationSeconds,
          startedAt: game.startedAt,
          user: {
            connect: {
              id: game.userId
            }
          },
          board: {
            connect: {
              id: dbBoard.id
            }
          }
        }
      });

      return newGame;

    } catch (error) {
      reply.status(500);
      console.error(error);
    }
  });
}

export default route;