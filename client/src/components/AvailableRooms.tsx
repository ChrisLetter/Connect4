import { useHistory } from 'react-router-dom';
import socket from '../services/socket-connection';
import { useState, useEffect } from 'react';
import { Flex, Heading, Box } from '@chakra-ui/react';

function AvailableRooms(props: { [key: string]: string }) {
  const history = useHistory();
  const userName = props.playerName;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.emit('getAvailableRooms');
    socket.on('availableRooms', (data) => {
      setRooms(data);
    });
    return () => {
      socket.off('availableRooms');
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
      width={['70vw', '70vw', '70vw', '25vw']}
      bg="teal.300"
      borderRadius="md"
      p="3vw"
      boxShadow="lg"
    >
      <Heading
        as="h2"
        size="lg"
        color="white"
        textAlign={'center'}
        pb={['2vh', '2vh', '2vh', '2vh']}
      >
        Join a Stranger
      </Heading>
      <Box
        bg="teal.50"
        width={['50vw', '50vw', '50vw', '20vw']}
        height="11.88vh"
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
            {room}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export default AvailableRooms;
