import { useState, useEffect } from 'react';
import {
  FormControl,
  Button,
  Input,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import socket from '../services/socketConnection';
import { useHistory } from 'react-router-dom';
import CreateRoom from ',/,,/components/CreateRoom';

function WaitingRoomOnline() {
  const toast = useToast();
  const [userName, setUserName] = useState('');

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="85vh"
      bg="teal.400"
    >
      {!userName ? (
        <Flex direction="column" alignItems="center" width="15vw">
          <FormControl id="first-name" colorScheme="teal" isRequired pb="3vh">
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              boxShadow="lg"
              placeholder="Enter Your Name"
              color="gray.600"
              bg="teal.50"
            />
          </FormControl>
        </Flex>
      ) : (
        <CreateRoom playerName="userName" />
      )}
    </Flex>
  );
}

export default WaitingRoomOnline;
