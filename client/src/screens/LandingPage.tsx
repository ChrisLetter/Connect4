import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Stack, Button, Box, Heading } from '@chakra-ui/react';

function LandingPage() {
  const history = useHistory();
  function clickLocal() {
    history.push('/select-players-local');
  }
  function clickOnline() {
    history.push('/waiting-room');
  }

  return (
    <Flex
      align="center"
      justifyContent="space-evenly"
      height="85vh"
      bg="teal.400"
      color="white"
      direction={['column', 'column', 'column', 'row']}
    >
      <Flex
        direction="column"
        justifyContent="space-evenly"
        bg="teal.50"
        width={['85vw', '70vw', '50vw', '30vw']}
        height="20vh"
        borderRadius="md"
        boxShadow="md"
        align="center"
      >
        <Heading as="h2" size="lg" color="black" textAlign="center">
          Play Locally
        </Heading>
        <Box color="black" width="20ww">
          Play 1 vs 1 on the same computer
        </Box>
        <Button
          colorScheme="teal"
          color="white"
          boxShadow="lg"
          onClick={() => clickLocal()}
        >
          Play
        </Button>
      </Flex>
      <Flex
        direction="column"
        justifyContent="space-evenly"
        bg="teal.50"
        width={['85vw', '70vw', '50vw', '30vw']}
        height="20vh"
        borderRadius="md"
        boxShadow="md"
        align="center"
      >
        <Heading as="h2" size="lg" color="black" textAlign="center">
          Play Online
        </Heading>
        <Box color="black" width="20ww">
          Play online, with friends or strangers
        </Box>
        <Button
          colorScheme="teal"
          color="white"
          boxShadow="lg"
          onClick={() => clickOnline()}
        >
          Play
        </Button>
      </Flex>
    </Flex>
  );
}

export default LandingPage;
