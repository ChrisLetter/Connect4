import {
  FormControl,
  Button,
  Input,
  Select,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IPlayersInfo } from './../interfaces/interfaces';

function FormPlayersNameLocal() {
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerOneColour, setPlayerOneColour] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [playerTwoColour, setPlayerTwoColour] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  function PlayButton() {
    const toast = useToast();
    return (
      <Button
        colorScheme="blackAlpha"
        color="white"
        boxShadow="lg"
        mt={4}
        width="10vw"
        type="submit"
        onClick={() => {
          if (
            !playerOneName ||
            !playerTwoName ||
            !playerOneColour ||
            !playerTwoColour
          ) {
            toast({
              title: 'Error',
              description: 'Please fill all the inputs',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            const userChoices: IPlayersInfo = {
              playerOneName,
              playerOneColour,
              playerTwoName,
              playerTwoColour,
            };
            dispatch({ type: 'PLAYERSINFO', payload: { ...userChoices } });
            history.push('/local');
          }
        }}
      >
        Play
      </Button>
    );
  }

  return (
    <Flex direction="column" mt="-15vh" alignItems="center">
      <Flex direction="row" pb="8vh">
        <Flex direction="column" alignItems="center" width="15vw" mr="10vh">
          <Heading
            as="h2"
            size="lg"
            color="teal.50"
            textAlign={['center', 'center', 'left', 'left']}
            pb="3vh"
          >
            Player 1
          </Heading>
          <FormControl id="first-name" colorScheme="teal" isRequired pb="3vh">
            <Input
              value={playerOneName}
              onChange={(e) => setPlayerOneName(e.target.value)}
              boxShadow="lg"
              placeholder="Name Player 1"
              color="gray.600"
              bg="teal.50"
            />
          </FormControl>
          <Select
            bg="teal.50"
            boxShadow="lg"
            borderColor="gray.200"
            color="gray.600"
            placeholder="Select a Colour"
            value={playerOneColour}
            onChange={(e) => setPlayerOneColour(e.target.value)}
          >
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
          </Select>
        </Flex>
        <Flex direction="column" alignItems="center" width="15vw">
          <Heading
            as="h2"
            size="lg"
            color="teal.50"
            textAlign={['center', 'center', 'left', 'left']}
            pb="3vh"
          >
            Player 2
          </Heading>
          <FormControl id="first-name" colorScheme="teal" isRequired pb="3vh">
            <Input
              value={playerTwoName}
              onChange={(e) => setPlayerTwoName(e.target.value)}
              placeholder="Name Player 2"
              color="gray.600"
              colorScheme="teal"
              boxShadow="lg"
              bg="teal.50"
            />
          </FormControl>
          <Select
            bg="teal.50"
            boxShadow="lg"
            borderColor="gray.200"
            color="gray.600"
            placeholder="Select a Colour"
            value={playerTwoColour}
            onChange={(e) => setPlayerTwoColour(e.target.value)}
          >
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
          </Select>
        </Flex>
      </Flex>
      <PlayButton />
    </Flex>
  );
}

export default FormPlayersNameLocal;
