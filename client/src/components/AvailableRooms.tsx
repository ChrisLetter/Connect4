import { useHistory } from 'react-router-dom';
import socket from '../services/socketConnection';
import { useState, useEffect } from 'react';
import {
  FormControl,
  Button,
  Input,
  Flex,
  Heading,
  useToast,
  Box,
} from '@chakra-ui/react';

function AvailableRooms(props: { [key: string]: string }) {
  const history = useHistory();
  const userName = props.playerName;
  const [rooms, setRooms] = useState(['']);

  useEffect(() => {
    socket.emit('getAvailableRooms');
    socket.on('availableRooms', (data) => {
      setRooms(data);
    });
    return () => {
      socket.off('roomList');
    };
  }, []);

  const joinRoom = (room: string) => {
    socket.emit('setUsername', userName);
    socket.emit('joinRoom', room);
    history.push('/online');
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      width="25vw"
      bg="teal.300"
      borderRadius="md"
      p="3vw"
      boxShadow="lg"
    >
      <Heading
        as="h2"
        size="lg"
        color="white"
        textAlign={['center', 'center', 'left', 'left']}
        pb="3vh"
      >
        Join a Stranger
      </Heading>
      <Box
        bg="teal.50"
        width="20vw"
        height="12vh"
        borderRadius="md"
        boxShadow="md"
        color="gray.600"
        align="center"
        overflowY="auto"
      >
        {rooms.map((room) => (
          <Box
            borderBottom="1px"
            py="0.5vh"
            borderColor="gray.400"
            onClick={() => joinRoom(room)}
          >
            {' '}
            {room}{' '}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export default AvailableRooms;
