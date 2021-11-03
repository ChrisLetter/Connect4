import React from 'react';
import { Heading, Flex, Spinner } from '@chakra-ui/react';

function WaitingForOtherUser(props: { [key: string]: string }) {
  const roomName = props.roomName;

  return (
    <Flex direction="column" alignItems="center">
      <Spinner
        thickness="5px"
        speed="1.65s"
        emptyColor="teal.50"
        color="teal.800"
        size="xl"
        mt="-20vh"
        mb="5vh"
      />
      <Heading
        as="h1"
        size="2xl"
        fontWeight="bold"
        color="teal.50"
        textAlign="center"
        pb="4vh"
      >
        Waiting for other users to connect...
      </Heading>
      <Heading
        as="h1"
        size="2xl"
        fontWeight="bold"
        color="teal.50"
        textAlign="center"
      >
        Tell your friends to join you at room "{roomName}"
      </Heading>
    </Flex>
  );
}

export default WaitingForOtherUser;
