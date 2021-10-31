import React from 'react';
import { Flex, FormControl, Input, Select } from '@chakra-ui/react';
import { useState } from 'react';

function FormPlayerNameOnline() {
  const [userName, setUserName] = useState('');
  const [userColour, setUserColour] = useState('');

  return (
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
      <Select
        bg="teal.50"
        boxShadow="lg"
        borderColor="gray.200"
        color="gray.600"
        placeholder="Select a Colour"
        value={userColour}
        onChange={(e) => setUserColour(e.target.value)}
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
  );
}

export default FormPlayerNameOnline;
