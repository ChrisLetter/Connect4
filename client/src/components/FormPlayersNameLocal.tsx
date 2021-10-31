import {
  Box,
  FormControl,
  Button,
  Input,
  Select,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';

function FormPlayersNameLocal() {
  const [PlayerOneName, setPlayerOneName] = useState('');
  const [PlayerOneColour, setPlayerOneColour] = useState('');
  const [PlayerTwoName, setPlayerTwoName] = useState('');
  const [PlayerTwoColour, setPlayerTwoColour] = useState('');

  function onSubmit() {
    console.log('PlayerOneName', PlayerOneName);
    console.log('PlayerOneColour', PlayerOneColour);
    console.log('PlayerTwoName', PlayerTwoName);
    console.log('PlayerTwoColour', PlayerTwoColour);
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
              value={PlayerOneName}
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
            value={PlayerOneColour}
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
              value={PlayerTwoName}
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
            value={PlayerTwoColour}
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
      <Button
        colorScheme="blackAlpha"
        color="white"
        boxShadow="lg"
        mt={4}
        width="10vw"
        type="submit"
        onClick={onSubmit}
      >
        Play
      </Button>
    </Flex>
  );
}

export default FormPlayersNameLocal;
