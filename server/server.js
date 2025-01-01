// const Fastify = require('fastify');
// const fastifyWebsocket = require('@fastify/websocket');
// const WebSocket = require('ws');
// const axios = require('axios');

// const fastify = Fastify();
// fastify.register(fastifyWebsocket);

// fastify.get('/ws', { websocket: true }, (connection, req) => {
//   connection.socket.on('message', async (message) => {
//     // Assume message is audio data
//     try {
//       const response = await axios.post('https://api.openai.com/v1/audio', message, {
//         headers: {
//           'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
//           'Content-Type': 'audio/wav'
//         }
//       });
//       connection.socket.send(response.data.text);
//     } catch (error) {
//       console.error('Error processing audio:', error);
//       connection.socket.send('Error processing audio');
//     }
//   });
// });

// fastify.listen(3000, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });
