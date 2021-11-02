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
} from '@chakra-ui/react';

function JoinRoom(props: { [key: string]: string }) {
  const history = useHistory();
  const toast = useToast();
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState(['']);
  const userName = props.playerName;

  useEffect(() => {
    socket.emit('getRooms');
    socket.on('roomList', (data) => {
      setRooms(data);
    });
    return () => {
      socket.off('roomList');
    };
  }, [roomName]);

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
        Join a Friend
      </Heading>
      <FormControl
        id="first-name"
        colorScheme="teal"
        isRequired
        pb={['1vh', '1vh', '1vh', '2vh']}
        width={['50vw', '50vw', '50vw', '20vw']}
      >
        <Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          boxShadow="lg"
          placeholder="Room Name"
          color="gray.600"
          bg="teal.50"
        />
      </FormControl>
      <Button
        colorScheme="blackAlpha"
        color="white"
        boxShadow="lg"
        mt={['1vh', '1vh', '1vh', '2vh']}
        width={['20vw', '20vw', '20vw', '10vw']}
        type="submit"
        onClick={() => {
          if (!roomName) {
            toast({
              title: 'Error',
              description: 'Please enter a name',
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
          } else if (!rooms.includes(roomName)) {
            toast({
              title: 'Error',
              description: 'Apparently there are no rooms with this name',
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
          } else {
            joinRoom(roomName);
          }
        }}
      >
        Join
      </Button>
    </Flex>
  );
}

export default JoinRoom;
