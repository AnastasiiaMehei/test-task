import { handleWebSocketConnection } from '../services/websocketService.ts';

export const registerWebSocketRoutes = (fastify) => {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    handleWebSocketConnection(connection);
  });
};

