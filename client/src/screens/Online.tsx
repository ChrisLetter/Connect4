import { Heading, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import socket from './../services/socketConnection';
import { IRoom } from './../interfaces/interfaces';

function Online() {
  useEffect(() => {
    socket.on('joinedRoom', function (room: IRoom) {
      console.log('game', room);
    });
  }, []);

  return (
    <Flex align="center" justify="center" minH="85vh" bg="teal.400">
      <Heading
        as="h1"
        size="3xl"
        fontWeight="bold"
        color="teal.50"
        textAlign={['center', 'center', 'left', 'left']}
      >
        Work In Progress...
      </Heading>
    </Flex>
  );
}

export default Online;
