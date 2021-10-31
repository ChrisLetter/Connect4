import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Stack, Button } from '@chakra-ui/react';

function LandingPage() {
  const history = useHistory();
  function clickLocal() {
    history.push('/select-players-local');
  }
  function clickOnline() {
    history.push('/online');
  }

  return (
    <Flex
      align="center"
      justify="center"
      minH="85vh"
      bg="teal.400"
      color="white"
    >
      <Stack spacing={5} direction="column" align="center">
        <Button
          colorScheme="blackAlpha"
          size="lg"
          color="white"
          boxShadow="lg"
          onClick={() => clickLocal()}
        >
          Play Locally
        </Button>
        <Button
          colorScheme="blackAlpha"
          size="lg"
          color="white"
          boxShadow="lg"
          onClick={() => clickOnline()}
        >
          Play Online
        </Button>
      </Stack>
    </Flex>
  );
}

export default LandingPage;
