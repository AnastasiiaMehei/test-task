import { handleAudioMessage } from './openaiService.js';

export const handleWebSocketConnection = (connection) => {
  const { socket } = connection;

  socket.on('message', async (data) => {
    try {
      const audioData = JSON.parse(data);
      const response = await handleAudioMessage(audioData);
      
      socket.send(JSON.stringify({
        type: "response.audio.delta",
        delta: response.audio
      }));
    } catch (error) {
      console.error('WebSocket Error:', error);
      socket.send(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });
};
