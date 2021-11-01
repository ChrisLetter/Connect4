import React from 'react';
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

function CreateRoom(props: { [key: string]: string }) {
  const history = useHistory();
  const toast = useToast();
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState(['']);
  const userName = props.playerName;

  function createRoom(nameRoom: string, nameUser: string) {
    socket.emit('setUsername', userName);
    socket.emit('createRoom', roomName);
    history.push('/online');
  }

  useEffect(() => {
    socket.emit('getRooms');
    socket.on('roomList', (data) => {
      setRooms(data);
      console.log('roomList', data);
    });
    return () => {
      socket.off('roomList');
    };
  }, [roomName]);
  // I included roomName in the dependency array, so I can retrieve all the rooms name from the server
  // once the user has chosen the name for his own room. Then, if a room with that name already exist,
  // I won't allow the user to create the room. For the implementation of this game we will suppose that
  // in the time between the last key stroke pressed for the choice of the room name the clicking of the
  // button "create room", other users won't create a room with the same name.

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
        Create a Room
      </Heading>
      <FormControl id="first-name" colorScheme="teal" isRequired pb="3vh">
        <Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          boxShadow="lg"
          placeholder="Enter The Room Name"
          color="gray.600"
          bg="teal.50"
        />
      </FormControl>
      <Button
        colorScheme="blackAlpha"
        color="white"
        boxShadow="lg"
        mt={4}
        width="10vw"
        type="submit"
        onClick={() => {
          if (!roomName) {
            toast({
              title: 'Error',
              description: 'Enter your username and choose a name for the room',
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
          } else if (rooms.includes(roomName)) {
            toast({
              title: 'Error',
              description:
                'The room name is not available, please choose another name',
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
          } else {
            createRoom(roomName, userName);
          }
        }}
      >
        Create Room
      </Button>
    </Flex>
  );
}

export default CreateRoom;
