import { Heading, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import socket from './../services/socketConnection';
import { IRoom } from './../interfaces/interfaces';
import WaitingForOtherUser from './../components/WaitingForOtherUser';

function Online() {
  const [roomName, setRoomName] = useState('');
  const [gameState, setGameState] = useState('');

  useEffect(() => {
    socket.on('joinedRoom', function (room: IRoom) {
      setRoomName(room.id);
      setGameState('waiting-for-other-user');
      console.log('game', room);
      socket.emit('ready');
    });

    socket.on('playGame', function (room: IRoom) {
      setGameState('users-connected');

      console.log('game2', room);
    });
  }, []);

  return (
    <Flex align="center" justify="center" minH="85vh" bg="teal.400">
      {gameState === 'waiting-for-other-user' ? (
        <WaitingForOtherUser roomName={roomName} />
      ) : (
        <Heading
          as="h1"
          size="3xl"
          fontWeight="bold"
          color="teal.50"
          textAlign={['center', 'center', 'left', 'left']}
        >
          Work In Progress...
        </Heading>
      )}
    </Flex>
  );
}

export default Online;
