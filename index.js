const express = require('express');
const app = express();
const cors = require('cors');
const httpServer = require('http').createServer(app);


app.use(cors());

let coordinates = {
  x: 100,
  y: 100,
};

let game = false;

const players = [];

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

const generateRandomCoordinates = () => {
  const newX = Math.random() * 450;
  const newY = Math.random() * 450;
  coordinates.x = newX;
  coordinates.y = newY;
}

io.on('connection', (socket) => {
  console.log(`Usuário conectado com ID: ${socket.id}`);
  players.push({ id: socket.id, score: 0 });

  io.emit('gameStatus', game);
  io.emit('playerInfos', players);

  socket.on('toggleGame', () => {
    game = !game;
    io.emit('gameStatus', game);
  });

  socket.on('newCoordinates', () => {
    generateRandomCoordinates();
    io.emit('coordinates', coordinates);
  });

  socket.on('getCoordinates', () => {
    io.emit('coordinates', coordinates);
  });

});

app.get('/', (_req, res) => {
  res.status(200).send('Ola!')
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Online na porta: ${PORT}`);
});

