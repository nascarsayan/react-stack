import { FastifyPluginAsync } from "fastify"

import { boards } from "./boards";

interface Game {
  id: string;
  boardId: string;
  userId: string;
  startedAt: string;
  durationSeconds: number;
}

const games: Game[] = [
  {
    "id": "1",
    "boardId": "1",
    "userId": "1",
    "startedAt": "2021-01-01T00:00:00.000Z",
    "durationSeconds": 123
  },
  {
    "id": "2",
    "boardId": "2",
    "userId": "2",
    "startedAt": "2021-02-02T00:00:00.000Z",
    "durationSeconds": 456
  },
  {
    "id": "3",
    "boardId": "3",
    "userId": "3",
    "startedAt": "2021-03-03T00:00:00.000Z",
    "durationSeconds": 789
  }
];


// DTO = Data Transfer Object
// DTOs are used to define the shape of the data that is sent over the network
interface CreateGameDto {
  boardWidth: number;
  boardHeight: number;
  difficulty: number;

  userId: string;
  durationSeconds: number;
  startedAt: string;
}

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/games', async (request, reply) => {
    return games;
  });

  fastify.post('/games', async (request, reply) => {
    const gameWithBoard = request.body as CreateGameDto;
  
    const gameBoard = {
      width: gameWithBoard.boardWidth,
      height: gameWithBoard.boardHeight,
      difficulty: gameWithBoard.difficulty
    };

    let board = boards.find(
      (board) => board.width === gameBoard.width &&
        board.height === gameBoard.height &&
        board.difficulty === gameBoard.difficulty
    );
    if (typeof board === 'undefined') {
      board = {
        ...gameBoard,
        id: `${boards.length + 1}`
      };
      boards.push(board);
    }

    const game = {
      id: `${games.length + 1}`,
      boardId: board.id,
      userId: gameWithBoard.userId,
      startedAt: gameWithBoard.startedAt,
      durationSeconds: gameWithBoard.durationSeconds
    };

    games.push(game);
    reply.status(201);
    return game;
  });
}

export default route;