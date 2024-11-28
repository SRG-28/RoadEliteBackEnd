"use strict";

require('dotenv').config(); // Carga las variables del archivo .env
const { createClient } = require('redis');

// Configura el cliente de Redis
const client = createClient({
  password: process.env.REDIS_PSW,  // Usar la contraseña de .env
  socket: {
    host: process.env.REDIS_HOST,  // Usar el host de .env
    port: process.env.REDIS_PORT,  // Usar el puerto de .env
  },
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

// Manejo de errores
client.on('error', (err) => {
  console.log('Redis connection error:', err);
});

module.exports = client;
