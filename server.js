const Fastify = require('fastify');
const fastifyWebsocket = require('@fastify/websocket');
const WebSocket = require('ws');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fastify = Fastify();
fastify.register(fastifyWebsocket);
fastify.get('/', (request, reply) => {
  return { message: 'Hello from the server!' };
});
fastify.get('/ws', { websocket: true }, (connection, req) => {
  connection.socket.on('message', async (message) => {
    // Assume message is audio data
    try {
      const response = await axios.post('https://api.openai.com/v1/audio', message, {
        headers: {
          'Authorization': `Bearer OPENAI_API_KEY`,
          'Content-Type': 'audio/wav'
        }
      });
      connection.socket.send(response.data.text);
    } catch (error) {
      console.error('Error processing audio:', error);
      connection.socket.send('Error processing audio');
    }
  });
});
fastify.post('/register', async (request, reply) => {
  try {
    const { email, password } = request.body;

    // Валідація
    if (!email || !password) {
      reply.code(400).send({ error: 'Email та пароль обов\'язкові' });
      return;
    }

    // Перевірка існуючого користувача
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      reply.code(409).send({ error: 'Користувач вже існує' });
      return;
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення користувача
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    reply.code(201).send({
      success: true,
      message: 'Реєстрація успішна'
    });

  } catch (error) {
    console.error('Registration error:', error);
    reply.code(500).send({ error: 'Помилка сервера' });
  }
});

// // Додавання підтримки CORS
// fastify.register(require('@fastify/cors'), {
//   origin: true, // Дозволити всі джерела (в продакшені налаштуйте конкретні домени)
//   methods: ['POST']
// });

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
