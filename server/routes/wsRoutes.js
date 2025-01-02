import { handleWebSocketConnection } from '../services/websocketService.js';

export const registerWebSocketRoutes = (fastify) => {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    handleWebSocketConnection(connection);
  });
};

