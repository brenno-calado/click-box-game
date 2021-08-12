import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import NavBar from './components/NavBar';
import Square from './components/Square';

const socket = io.connect('http://localhost:3001/')

function App() {
  const [coordinate, setCoordinate] = useState({x: 100, y: 100});
  const [gameStatus, setGameStatus] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({});
  
  console.log('coordenada do app', coordinate);

  function newCoordinates() {
    socket.emit('newCoordinates');
    socket.on('coordinates', (coordinates) => {
      setCoordinate(coordinates);
    });
  }

  function getCoordinates() {
    socket.emit('getCoordinates');
    socket.on('coordinates', (coordinates) => {
      setCoordinate(coordinates);
    });
  };

  const getGameInfos = () => {
    socket.on('gameStatus', ( game ) => {
      setGameStatus(game);
    })
  };

  const toggleGame = () => {
    socket.emit('toggleGame');
    getGameInfos();
  };

  const getPlayersInfos = () => {
    socket.on('playerInfos', (players) => {
      setPlayerInfo(players.slice(-1)[0]);
      setPlayerInfo(players.slice(indexOf(socket.id)))
    });
  };
  
  useEffect(() => {
    getCoordinates();
    getGameInfos();
    getPlayersInfos();
  }, []);
  console.log(playerInfo)
  return (
    <div>
      <NavBar toggleGame={toggleGame} gameStatus={gameStatus} />
      { gameStatus && <Square
        coordinate={coordinate}
        newCoordinates={newCoordinates}
      />}
    </div>
  );
};

export default App;
