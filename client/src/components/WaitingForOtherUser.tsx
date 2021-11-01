import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

function WaitingForOtherUser(props: { [key: string]: string }) {
  const roomName = props.roomName;

  return (
    <Heading
      as="h1"
      size="2xl"
      fontWeight="bold"
      color="teal.50"
      textAlign={['center', 'center', 'center', 'center']}
    >
      Waiting for other user to connect... <br />
      Tell your friend to join you at room "{roomName}"
    </Heading>
  );
}

export default WaitingForOtherUser;
